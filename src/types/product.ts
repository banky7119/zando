export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  imageUrl: string;
  brand: string;
  rating: number;
  reviewsCount: number;
  category: string; // Add this line
}
export interface CartItem extends Product {
  quantity: number;
}