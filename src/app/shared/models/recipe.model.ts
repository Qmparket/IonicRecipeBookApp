import { Ingredient } from './ingredient.model';

export interface Recipe {
    title: string;
    description: string;
    difficulty: string;
    ingredients: Ingredient[];
}
