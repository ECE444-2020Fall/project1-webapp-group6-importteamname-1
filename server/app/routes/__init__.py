from app import db
from utils.ingredient_controller import IngredientController
from utils.inventory_manager import InventoryManager
from utils.recipe_controller import RecipeController

inventory_manager = InventoryManager(db)
recipe_controller = RecipeController(db)
ingredient_controller = IngredientController(db)
