import { Food } from "./food";

export class CartItem{

  //auto injection and declaration of variable food - accessible outwith class as public
  constructor(public food:Food){

  }

  //class vars
  quantity:number = 1;
  price:number = this.food.price;

}
