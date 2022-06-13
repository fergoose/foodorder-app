import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Cart } from 'src/app/shared/models/cart';
import { CartItem } from 'src/app/shared/models/cartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cart!:Cart;

  constructor(private cartService:CartService) {
    //subscribes to cart observable - will update cart whenever it changes
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  ngOnInit(): void {
  }

  //get cartItem from list then work on within method
  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    //converted from string to int
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
    console.log("quantity changed to " + quantity);
  }
}
