from django.core.management import setup_environ
from src import settings
setup_environ(settings)

from models import ShoppingList, Category, Dashboard, Product

from django.test import TestCase
import unittest

class ProductTest(unittest.TestCase):
    def setUp(self):
       self.product = Product()

    def testProduct(self):
        assert isinstance(self.product, Product)

    def testNameProduct(self):
        assert isinstance(str(self.product), str)
  
class ShoppingListTest(unittest.TestCase):
    def setUp(self):
       self.shoppingList = ShoppingList()

    def testShoppingList(self):
        assert isinstance(self.shoppingList, ShoppingList)

class CategoryTest(unittest.TestCase):
    def setUp(self):
        self.category = Category()

    def testCategory(self):
        assert isinstance(self.category, Category)

    def testNameCategory(self):
        assert isinstance(str(self.category), str)

class DashboardTest(unittest.TestCase):
    def setUp(self):
        self.dashboard = Dashboard()
        self.shoppingList = ShoppingList()

    def testDashboard(self):
        assert isinstance(self.dashboard, Dashboard)

    def testNameDashboard(self):
        assert isinstance(str(self.dashboard), str)
  
    def testCrSh(self):
        assert isinstance(self.dashboard.get_or_create_shopping_list(), ShoppingList)

class LocationTest(unittest.TestCase):
    def setUp(self):
        self.location = Location()
        assert isinstance(self.location.getLocation(), list)
 

        