import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods:Food[] = [];
  //variable is declared within constructor param
  constructor(private foodService:FoodService, public activatedRoute:ActivatedRoute) {
    //subscribe listens and dynamically changes the page if searched or tag clicked
    activatedRoute.params.subscribe((params) => {
      console.log(params.searchTerm);
      console.log(params.tag);
      if(params.searchTerm)
      this.foods = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if(params.tag)
      this.foods = this.foodService.getAllFoodsByTag(params.tag);
      else
      this.foods = foodService.getAll();
    })
   }

  ngOnInit(): void {

  }

}
