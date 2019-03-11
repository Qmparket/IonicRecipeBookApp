import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private _ingredients = new BehaviorSubject<Ingredient[]>([]);
  ingredients = this._ingredients.asObservable();
  private ingredientsArray: Ingredient[];
  constructor() {
    this.ingredients.subscribe((items) => {
      this.ingredientsArray = Object.assign(items);
    });
  }

  addItem(name: string, amount: number) {
    const ingredient: Ingredient = {name: name, amount: amount};
    this.ingredientsArray.push(ingredient);
    this._ingredients.next(this.ingredientsArray);
   // this.ingredients.push(ingredient);
  }

  addItems(items: Ingredient[]) {
   // this.ingredients.push(...items);
   this.ingredientsArray.push(...items);
   this._ingredients.next(this.ingredientsArray);
  }

  removeItem(index: number) {
    this.ingredientsArray.splice(index, 1);
   this._ingredients.next(this.ingredientsArray);
  }
}
