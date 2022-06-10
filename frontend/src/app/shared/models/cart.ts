import { CartItem } from "./cartItem";

export class Cart{
  //Cart holds array of items
  items:CartItem[] = [];
  totalPrice:number = 0;
  totalCount:number = 0;
}
