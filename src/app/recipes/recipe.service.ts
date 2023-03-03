import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { Subject } from "rxjs";

import { Ingredient } from "../shared/Ingredient.model";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from '../store/app.reducer';

import { Recipe } from "./recipe.model";

@Injectable({ providedIn: 'root' })

export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();

	// private recipes: Recipe[] = [
	// 	new Recipe(
	// 		'A Test Recipe',
	// 		'This is simply a test',
	// 		'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/british_shakshuka_26737_16x9.jpg',
	// 		[
	// 			new Ingredient('Meat', 1),
	// 			new Ingredient('French Fries', 20)
	// 		]),
	// 	new Recipe(
	// 		'Another Test Recipe',
	// 		'This is simply a test',
	// 		'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/british_shakshuka_26737_16x9.jpg',
	// 		[
	// 			new Ingredient('Buns', 2),
	// 			new Ingredient('Meat', 1)
	// 		]),
	// 	new Recipe(
	// 		'Third Test Recipe',
	// 		'This is simply a test',
	// 		'https://assets2.razerzone.com/images/pnx.assets/618c0b65424070a1017a7168ea1b6337/razer-wallpapers-page-hero-mobile.jpg',
	// 		[
	// 			new Ingredient('Carrot', 5),
	// 			new Ingredient('Cabbage', 3)
	// 		]),
	// ];

	private recipes: Recipe[] = [];

	constructor(
		private store: Store<fromApp.AppState>
	) { }

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipe(index: number) {
		return this.recipes[index];
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		// this.shoppingListService.addIngredients(ingredients);
		this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		this.recipes[index] = newRecipe;
		this.recipesChanged.next(this.recipes.slice());
	}

	deleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.recipesChanged.next(this.recipes.slice());
	}
}