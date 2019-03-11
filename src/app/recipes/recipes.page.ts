import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../shared/models/recipe.model';
import { RecipeService } from '../shared/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  recipes: Recipe[];
  constructor(private router: Router,
              private recipeService: RecipeService) {
    recipeService.recipes.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  ngOnInit() {
  }

  onNewRecipe() {
    this.router.navigate(['tabs/recipes/edit-recipe', {mode: 'New'}]);
  }

  OnRecipeClicked(index: number) {
    this.router.navigate(['tabs/recipes/recipe', {index}]);
  }

}
