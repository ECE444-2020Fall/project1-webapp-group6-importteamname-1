#Unit test written by Mohamed Abdelhamid
import unittest
from CalorieTracker.py import CalorieTracker

class calorieTrackerTest(unittest.TestCast)
    def setUp(self):
        App.app.testing = True
        self.app = App.app.test_client()

        # Since the backend for this feature is still not set up, I am adding placeholder
        # values for now. Will replace these placeholder values with calls to the actual
        # function variables once that is set up.
        def test_Calories(self):
            result = self.app.get('/CalorieTracker')
            actualRecipeCalories = [549, 138, 121]
            displayedRecipeCalories = [549, 138, 121]
            self.assertEqual (actualRecipeCalories, displayedRecipeCalories)

        def test_Proteins(self):
            result = self.app.get(self):
            actualRecipeProteins = [14, 35, 12]
            displayedRecipeProteins = [12, 14, 22]
            self.assertEqual (actualRecipeProteins, displayedRecipeProteins)