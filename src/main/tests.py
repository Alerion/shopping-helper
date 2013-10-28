from datetime import datetime
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.test import RequestFactory, Client, TestCase
from models import Dashboard, Location, Product, Category, ShoppingList
from src.accounts.models import User
from .views import (AddForm, change_item, adding_from_all_products,
    buy_all_products, remove_shopping, index)
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


class TestChange_item(TestCase):
    fixtures = ['staging_accounts_user.json',
    'staging_main_category.json',
    'staging_main_dashboard.json',
    'staging_main_location.json',
    'staging_main_product.json',
    'staging_main_shoppinglist.json']


    def setUp(self):
        self.factory = RequestFactory()
        self.c = Client()
        self.c.login(username='admin', password='admin')

    def test_change_item(self):
        request = self.factory.post('main/change_item', {'name_change': 'somename',
                                                         'cost_change': 1000,
                                                         'category_change': 'Other',
                                                         'product_id': 1})
        request.user = User.objects.get(username= 'admin')
        response = change_item(request)
        self.assertEqual(response.status_code, 200)



class TestFromAllAdd(TestCase):
    fixtures = ['staging_accounts_user.json',
        'staging_main_category.json',
        'staging_main_dashboard.json',
        'staging_main_location.json',
        'staging_main_product.json',
        'staging_main_shoppinglist.json']

    def setUp(self):
        self.factory = RequestFactory()
        self.c = Client()
        self.c.login(username='admin', password='admin')

    def test_from_all_products_html404(self):
        request = self.factory.post('main/adding_from_all_products', {'product_id': ''})
        request.user = User.objects.get(username= 'admin')
        response = adding_from_all_products(request)
        self.assertEqual(response.status_code, 404)

    def test_from_all_products(self):
        request = self.factory.post('main/adding_from_all_products', {'product_id': 1})
        request.user = User.objects.get(username= 'admin')
        response = adding_from_all_products(request)
        self.assertEqual(response.status_code, 200)


class BuyAllItems_test(TestCase):
    fixtures = ['staging_accounts_user.json',
        'staging_main_category.json',
        'staging_main_dashboard.json',
        'staging_main_location.json',
        'staging_main_product.json',
        'staging_main_shoppinglist.json']

    def setUp(self):
        self.factory = RequestFactory()
        self.c = Client()
        self.c.login(username='admin', password='admin')

    def test_buy_all_products(self):
        request = self.factory.post('main/buy_all_products')
        request.user = User.objects.get(username= 'admin')
        curr_dashboard = request.user.get_dashboard()
        curr_buylist = curr_dashboard.get_or_create_shopping_list()
        product_id = 1
        product = get_object_or_404(Product, id=product_id, dashboard=curr_dashboard)
        curr_buylist.products.add(product)
        response = buy_all_products(request)
        self.assertEqual(response.status_code, 200)


class RemoveItem_test(TestCase):
    fixtures = ['staging_accounts_user.json',
        'staging_main_category.json',
        'staging_main_dashboard.json',
        'staging_main_location.json',
        'staging_main_product.json',
        'staging_main_shoppinglist.json']

    def setUp(self):
        self.factory = RequestFactory()
        self.c = Client()
        self.c.login(username='admin', password='admin')

    def test_remove_item(self):
        request = self.factory.post('main/remove_shopping', {'product_id': 5})
        request.user = User.objects.get(username = 'admin')
        response = remove_shopping(request)
        self.assertEqual(response.status_code, 200)

    def test_remove_item_html404(self):
        request = self.factory.post('main/remove_shopping', {'product_id': ''})
        request.user = User.objects.get(username= 'admin')
        response = remove_shopping(request)
        self.assertEqual(response.status_code, 404)


class Index_test(TestCase):
    fixtures = ['staging_accounts_user.json',
        'staging_main_category.json',
        'staging_main_dashboard.json',
        'staging_main_location.json',
        'staging_main_product.json',
        'staging_main_shoppinglist.json']

    def setUp(self):
        self.factory = RequestFactory()
        self.c = Client()
        self.c.login(username='admin', password='admin')

    def test_index(self):
        request = self.factory.post('main/index')
        request.user = User.objects.get(username= 'admin')
        response = index(request)
        self.assertEqual(response.status_code, 200)

    def test_model_form(self):
        product = Product(name="SomeProduct")
        product_form = AddForm({'name': 'sothingtest', 'price': 100, 'category': 1}, instance= product)
        self.assertEquals(product_form.is_valid(), True)
