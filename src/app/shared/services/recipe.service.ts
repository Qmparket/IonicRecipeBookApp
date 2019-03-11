import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesArr: Recipe[] = [];
  private _recipes = new BehaviorSubject<Recipe[]>([{title: 'Pizza', description: 'tasty', difficulty: 'hard',
                                                    ingredients: [{name: 'Cheese', amount: 2}, {name: 'Meat', amount: 5}]}]);
  recipes = this._recipes.asObservable();
  constructor() { }

  addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    const recipe = {title, description, difficulty, ingredients};
    this.recipesArr.push(recipe);
    this._recipes.next(this.recipesArr);
    console.table(this.recipesArr);
  }

  updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipesArr[index] = {title, description, difficulty, ingredients};
    this._recipes.next(this.recipesArr);
  }

  removeRecipe(index: number) {
    this.recipesArr.splice(index, 1);
    this._recipes.next(this.recipesArr);
  }
}
