import { NumberValueAccessor } from "@angular/forms";

export class Food{
  //! is required, ? is optional
  id!:string;
  name!:string;
  price!:number;
  tags?:string[];
  favorite!:boolean;
  stars!:number;
  imageUrl!:string;
  origins!:string[];
  cookTime!:string;
}
