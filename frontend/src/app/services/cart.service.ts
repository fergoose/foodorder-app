import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/cart';
import { CartItem } from '../shared/models/cartItem';
import { Food } from '../shared/models/food';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = this.getCartFromLocalStorage();
  //special type of subject - will emit to all subcribers and store last emitted value. New subscribers are auto emitted the stored value
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor(foodService:FoodService) {

  }

  addToCart(food:Food):void{
    let cartItem =
    //search through items array within cart and check whether item being added is equal to an item in cart already(duplicate item - quantity will need increased instead)
    this.cart.items.find(
      //function checks if both id's equal
      item => item.food.id === food.id
    );

    //if cartItem exists, duplicate item trying to be added and method wont continue any further
    if(cartItem)
      return;

    //adds item to cart
    this.cart.items.push(new CartItem(food))
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId:string):void{
    //replaces array with new filtered array
    this.cart.items = this.cart.items
    //filters out any items matching foodId
    .filter(item => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId:string, quantity:number){
    //finds item by matching foodId
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    //if none then return
    if(!cartItem) return;

    //set quantity from param
    cartItem.quantity = quantity;
    //set price by calculation
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  //creates new cart in place of current
  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  //method to get the subject observable. returns as normal observable - converted because subjects could potentially be accessed outside this service
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  //stores cart data to local storage
  private setCartToLocalStorage():void{
    //reduce will be called as many number of times as there is items
    this.cart.totalPrice = this.cart.items
    //prevSum is 0 initially
    //function then adds both prevSum and price and stores in prevSum
    //currentItem is the item reduce is currently working on
    .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);

    //similar to above
    this.cart.totalCount = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    //converts cart into JSON and stores as k/v pair
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    //will emit current cart to all subscribers whenever cart is changed
    this.cartSubject.next(this.cart);
  }

  //attempt to get cart from local storage, otherwise create new Cart
  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson): new Cart();
  }

}
