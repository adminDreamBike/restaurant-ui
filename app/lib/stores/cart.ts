import { create } from "zustand";
import { Product } from "./types";
import { persist } from "zustand/middleware";

interface State {
  cart: Product[];
  totalItems: number;
  totalPrice: number;
}

interface Actions {
  addToCart: (Item: Product) => void;
  removeFromCart: (Item: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (item: Product) => void;
  getProduct: (id: number) => Product | null;
}

const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + Number(product.price),
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + Number(product.price),
          }));
        }
      },
      removeFromCart: (product: Product) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
          totalItems: state.totalItems - product.quantity,
          totalPrice:
            state.totalPrice - Number(product.price) * product.quantity,
        }));
      },
      increaseQuantity: (productId: number) => {
        const cart = get().cart;
        const itemExists = cart.find((item) => item.id === productId);

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }

          set({ cart: [...cart] });
        }
      },
      decreaseQuantity: (product: Product) => {
        const cart = get().cart;
        const itemExists = cart.find((item) => item.id === product.id);

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            if (itemExists.quantity === 1) {
              const updatedCartItems = cart.filter(
                (item) => item.id !== product.id
              );
              set((state) => ({
                cart: updatedCartItems,
                // totalItems: state.totalItems - 1,
                // totalPrice: state.totalPrice - Number(product.price),
              }));
            } else {
              itemExists.quantity--;
              set((state) => ({
                cart: [...get().cart,],
                totalItems: state.totalItems - 1,
                totalPrice: state.totalPrice - Number(product.price),
              }));
            }
          }
        }
      },
      getProduct: (productId: number) => {
        const cart = get().cart;
        const product = cart.find((item) => item.id === productId);
        if (product) {
          return product;
        } else {
          return null;
        }
      },
    }),
    { name: "cart-storage" }
  )
);
