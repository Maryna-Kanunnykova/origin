export type CartItemType = {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  count: number;
  price: number;
  size: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}
