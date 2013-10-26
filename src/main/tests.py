from django.core.management import setup_environ
from src import settings
setup_environ(settings)

from models import ShoppingList, Category, Dashboard, Product, Location
from src.accounts.models import User
from datetime import datetime

from django.test import TestCase
import unittest

class ViewErrorTest(TestCase):
    fixtures = [
    'staging_accounts_user.json','staging_main_category.json',
    'staging_main_dashboard.json',
    'staging_main_location.json',
    'staging_main_product.json',
    'staging_main_shoppinglist.json']

class ProductTest(TestCase):
    def setUp(self):
       self.product = Product()

    def test_product(self):
        assert isinstance(self.product, Product)

    def test_name_product(self):
        assert isinstance(str(self.product), str)
  
class ShoppingListTest(TestCase):
    fixtures = [
    'staging_main_category.json',
    'staging_main_dashboard.json',
    'staging_main_product.json',
    'staging_main_shoppinglist.json']
    def setUp(self):
       self.shoppingList = ShoppingList()

    def test_shopping_list(self):
        assert isinstance(self.shoppingList, ShoppingList)

    def test_unicode(self):

        sl = ShoppingList()
        sl.dashboard = Dashboard.objects.get(pk = 1)
        assert isinstance(str(sl), str)

        sl.date = datetime.now()
        assert isinstance(str(sl), str)

    def test_delate_product(self):
        dash = Dashboard.objects.get(pk = 1)
        sl = dash.get_or_create_shopping_list()

        prod = Product.objects.get(pk = 1)

        sl.add_product(prod)
        sl.del_product(prod)



class CategoryTest(TestCase):
    def setUp(self):
        self.category = Category()

    def test_category(self):
        assert isinstance(self.category, Category)

    def test_name_category(self):
        assert isinstance(str(self.category), str)

    def test_get_default(self):
        self.assertEqual(self.category.get_default(),None)

class DashboardTest(TestCase):
    fixtures = [
    'staging_main_category.json',
    'staging_main_dashboard.json',
    'staging_main_location.json',
    'staging_main_product.json',
    'staging_main_shoppinglist.json']

    def setUp(self):
        self.dashboard = Dashboard()
        self.shoppingList = ShoppingList()

    def test_dashboard(self):
        assert isinstance(self.dashboard, Dashboard)

    def test_name_dashboard(self):
        assert isinstance(str(self.dashboard), str)

    def test_get_create_list(self):

        dash = Dashboard.objects.get(pk = 1)
       
        curr_buylist = dash.get_or_create_shopping_list()

        assert isinstance(curr_buylist, ShoppingList)

        ShoppingList.objects.filter(date=None).delete()
        curr_buylist = dash.get_or_create_shopping_list()

        assert isinstance(curr_buylist, ShoppingList)

class LocationTest(TestCase):
    def setUp(self):
        self.location = Location()
        self.location.coordinate = "54;34" 
    def test_location(self):
        assert isinstance(self.location.getLocation(), list) 
    

        