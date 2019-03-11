import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListPageModule' },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesPageModule' },
  { path: 'recipe', loadChildren: './recipe/recipe.module#RecipePageModule' },
  { path: 'edit-recipe', loadChildren: './edit-recipe/edit-recipe.module#EditRecipePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
