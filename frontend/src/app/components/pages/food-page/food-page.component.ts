import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {

  food!: Food;

  constructor(activatedRoute:ActivatedRoute, foodService:FoodService, private cartService:CartService, private router:Router) {
    //subscribe listens for url changes
    activatedRoute.params.subscribe((params) => {
      //if exists
      console.log('The id of this route is: ', params.id);
      if(params.id)
      this.food = foodService.getFoodById(params.id)
      else
      console.log('no food by that search');
    })
   }

  ngOnInit(): void {
  }

  //button logic
  addToCart(){
    this.cartService.addToCart(this.food);
    //able to navigate to route using Router
    this.router.navigateByUrl('/cart-page');
  }

}
