import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'shopping-list',
        children: [
          {
            path: '',
            loadChildren: '../shopping-list/shopping-list.module#ShoppingListPageModule'
          }
        ]
      },
      {
        path: 'recipes',
        children: [
          {
            path: '',
            loadChildren: '../recipes/recipes.module#RecipesPageModule'
          },
          {
            path: 'edit-recipe',
            loadChildren: '../edit-recipe/edit-recipe.module#EditRecipePageModule'
          },
          {
            path: 'recipe',
            children: [
              {
                path: '',
                loadChildren: '../recipe/recipe.module#RecipePageModule'
              },
              {
                path: 'edit-recipe',
                loadChildren: '../edit-recipe/edit-recipe.module#EditRecipePageModule'
              }
            ]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/shopping-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/shopping-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
