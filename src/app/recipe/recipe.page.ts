import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../shared/services/recipe.service';
import { Recipe } from '../shared/models/recipe.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

  recipeIndex: number;
  recipe: Recipe;
  constructor(private activatedRouter: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService) {
    this.recipeIndex = activatedRouter.snapshot.params['index'];
    recipeService.recipes.subscribe((recipes) => {
      this.recipe = recipes[this.recipeIndex];
    });
  }

  ngOnInit() {
  }

  onBackClicked() {
    this.router.navigateByUrl('tabs/recipes');
  }

  onRecipeEdit() {
    this.router.navigate(['tabs/recipes/edit-recipe', {index: this.recipeIndex, mode: 'Edit'}]);
  }

  onRecipeDelete() {
    this.recipeService.removeRecipe(this.recipeIndex);
    this.router.navigateByUrl('tabs/recipes');
  }

  onAddIngredients() {
    this.shoppingListService.addItems(this.recipe.ingredients);
    this.router.navigateByUrl('tabs/shopping-list');
  }

}
