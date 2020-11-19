 # FileName: models.py
 #
 # Description: This file is used to import all model schemas.
 #
 # Author(s): Yanisa Kham
 # Date: November 17, 2020 

from app.model_schemas import * 

models_map = {
    "user_rating": UserRating,
    "user_notes": UserNotes,
    "recipe_cart": RecipeCart,
    "favourites_list": UserFavourites,
    "pantry_list": PantryList,
    "shopping_list": ShoppingList
}