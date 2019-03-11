import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Ingredient } from '../shared/models/ingredient.model';
import { RecipeService } from '../shared/services/recipe.service';
import { Recipe } from '../shared/models/recipe.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {

  difficultyArr = ['Easy', 'Medium', 'Hard'];
  mode: any;
  index: number;
  title: string;
  description: string;
  difficulty: string;
  ingredients: Ingredient[] = [];
  recipe: Recipe;
  constructor(private activatedRouter: ActivatedRoute,
              private router: Router,
              private actionSheetController: ActionSheetController,
              private alertController: AlertController,
              private toastController: ToastController,
              private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.mode = this.activatedRouter.snapshot.params['mode'];
    if (this.mode === 'Edit') {
      this.index = this.activatedRouter.snapshot.params['index'];
      this.recipeService.recipes.subscribe((recipes) => {
        this.recipe = recipes[this.index];
        this.title = this.recipe.title;
        this.description = this.recipe.description;
        this.ingredients = this.recipe.ingredients;
        this.difficulty = this.recipe.difficulty;
      });
    }
    console.log(this.mode);
  }

  onBackClicked() {
    this.router.navigateByUrl('tabs/recipes');
  }

  onSaveRecipe() {
    if (this.mode === 'New') {
      this.recipeService.addRecipe(this.title, this.description, this.difficulty, this.ingredients);
      this.router.navigateByUrl('tabs/recipes');
    } else {
      this.recipeService.updateRecipe(this.index, this.title, this.description, this.difficulty, this.ingredients);
      this.router.navigate(['tabs/recipes/recipe', {index: this.index}]);
    }
  }

  async onManageIngredients() {
    const actionSheet = await this.actionSheetController.create({
      header: 'What do you want to do?',
      mode: 'ios',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            if (this.ingredients.length > 0) {
              this.ingredients = [];
              this.presentToast('All Ingredients were deleted');
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

private async createNewIngredientAlert() {
    const newIngredientAlert = await this.alertController.create({
      header: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
        },
        {
          name: 'amount',
          type: 'number',
          placeholder: 'Amount',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() === '' || data.name === null || data.amount === null || data.amount.trim() === '') {
              this.presentToast('Add a valid Ingredient');
              return;
            }
            this.ingredients.push({name: data.name, amount: data.amount});
          }
        }
      ]
    });
    newIngredientAlert.present();
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      color: 'primary'
    });
    toast.present();
  }

}
