import { useCartStore } from "@/app/lib/stores/cart";
import { UnorderedList, Text, Flex, Container, Icon } from "@chakra-ui/react";
import { CartItem } from "../CartItem/CartItem";
import { FaShoppingCart } from "react-icons/fa";
import { Product } from "@/app/lib/stores/types";

export const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const totalItems = useCartStore((state) => state.totalItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = totalPrice + 5;

  const handleRemoveItem = (product: Product) => {
    removeFromCart(product)
  }
  return (
    <Container padding="0 0 70px 0">
      <Text fontWeight="bold" fontSize="3xl" textAlign="center">
        Shopping Cart 🛒
      </Text>
      <UnorderedList
        display="flex"
        gap="12px"
        flexDirection="column"
        marginTop="20px"
        marginRight="20px"
      >
        {
          (totalItems === 0 && (
            <Flex justifyContent='center'>
              <Icon as={FaShoppingCart} boxSize={6} color='lightgray' />{" "}
              <Text color='lightred'>Your Shopping Cart is empty 😔</Text>
            </Flex>
          ))
        }
        {cart.map((product) => (
          <CartItem key={product.id} product={product} onRemoveProduct={handleRemoveItem} />
        ))}
      </UnorderedList>
      <Flex flexDirection="column" margin="20px 20px">
        <Flex justifyContent="space-between">
          <Text>SubTotal:</Text>
          <Text fontWeight="bold">${totalPrice}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Shipping</Text>
          <Text fontWeight="bold">$5</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Total</Text>
          <Text fontWeight="bold">${total}</Text>
        </Flex>
      </Flex>
    </Container>
  );
};
