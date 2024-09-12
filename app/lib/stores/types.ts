export interface Rating {
  reviews: string;
  score: number;
}
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: Rating;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  image: string;
  quantity?: number;
  ingredients?: Array<string>;
}
