import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ShoppingListService } from '../shared/services/shopping-list.service';
import { Ingredient } from '../shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {

  ingredientName: string;
  ingredientAmount: number;
  shoppingList: Ingredient[];
  constructor(private toestController: ToastController,
              private shoppingService: ShoppingListService) {
    this.shoppingService.ingredients.subscribe((ingredients) => {
      this.shoppingList = ingredients;
    });
  }

  ngOnInit() {
  }

  onIngredientAdd() {
    if (this.ingredientAmount && this.ingredientName) {
      this.shoppingService.addItem(this.ingredientName, this.ingredientAmount);
      this.ingredientAmount = null;
      this.ingredientName = null;
    } else {
      this.presentToast('Please add an ingredient');
    }
  }

  removeItem(index: number) {
    this.shoppingService.removeItem(index);
  }

  async presentToast(message: string) {
    const toast = await this.toestController.create({
      message: message,
      duration: 1500,
      color: 'primary'
    });
    toast.present();
  }
}
