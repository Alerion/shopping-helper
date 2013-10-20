from django.test import RequestFactory
from django.test import TestCase
from views import change_item, adding_from_all_products
from src.accounts.models import User
from django.test.client import Client
import coverage



class ViewErrorTest(TestCase):
    fixtures = ['staging_accounts_user.json',
    'staging_main_category.json',
    'staging_main_dashboard.json',
    'staging_main_location.json',
    'staging_main_product.json',
    'staging_main_shoppinglist.json']

    def setUp(self):
        self.c = Client()
        self.c.login(username='admin', password='admin')


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


    def change_item_test(self):
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

    def from_all_products_test(self):
        request = self.factory.post('main/adding_from_all_products', {'product_id': 1})
        request.user = User.objects.get(username= 'admin')
        response = adding_from_all_products(request)
        self.assertEqual(response.status_code, 200)