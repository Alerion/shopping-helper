import os
import sys

#QUESTION: is there any other way to import settins.py from module
from django.conf import settings
from django.test.client import RequestFactory

#sys.path.append(os.path.abspath(os.pardir))

#import settings
#this here is some magic fix. Why we need setup_environ

#from django.core.management import setup_environ
#setup_environ(settings)

from django.test.client import Client
from src.history import views

from django.test import TestCase
from src.accounts.models import User

class ViewErrorTest(TestCase):
    fixtures = [
    'staging_accounts_user.json','staging_main_category.json',
    'staging_main_dashboard.json',
    'staging_main_location.json',
    'staging_main_product.json',
    'staging_main_shoppinglist.json']

    def setUp(self):
        self.factory = RequestFactory()
        self.c = Client()
        self.c.post('/login/', {'username': 'admin', 'password': 'admin'})

    def test_prices(self):
        request = self.factory.get('/history/prices/')
        response = views.prices(request)
        self.assertEqual(response.status_code, 200)

    def test_previous_settings(self):
        response = self.c.get('/history/previous_settings/')
        print response
        self.assertEqual(response.status_code, 200)

    def test_index(self):
        response = self.c.get('/history/')
        self.assertEqual(response.status_code, 200)

    def test_error(self):
        response = self.c.get('/history/error/')
        self.assertEqual(response.status_code, 200)

    def test_old(self):
        response = self.c.get('/history/old/')
        self.assertEqual(response.status_code, 200)

    def test_information_id(self):
        response = self.c.get('/history/information/',{'id':1})
        self.assertEqual(response.status_code, 200)

    def test_add_to_list(self):
        response = self.c.get('/history/add_to_list/')
        self.assertEqual(response.status_code, 200)

    def test_list_id_correct(self):
        response = self.c.get('/history/add_to_list/',{'id':1})
        self.assertEqual(response.status_code, 200)

    def test_list_id_incorrect(self):
        response = self.c.get('/history/add_to_list/',{'id':-1})
        self.assertEqual(response.status_code, 200)

    def test_add_to_list_correct(self):
        
        request = self.factory.get('/history/add_to_list/', {'id': 1})
        request.user = User.objects.get(username= 'admin')

        dash = request.user.get_dashboard()

       
        curr_buylist = dash.get_or_create_shopping_list()
   
        products_in = curr_buylist.products.all()

        for pr in products_in:
              curr_buylist.del_product(pr.id)
      
        curr_buylist.save()

        response = self.c.get('/history/add_to_list/',{'id':1})
        self.assertEqual(response.status_code, 200)

        product = dash.product_set.filter(pk=(1))[0]
        curr_buylist.add_product(product.id)
        curr_buylist.save()

        response = self.c.get('/history/add_to_list/',{'id':1})
        self.assertEqual(response.status_code, 200)

    
    def test_informationd(self):
        response = self.c.get('/history/information/')
        self.assertEqual(response.status_code, 200)

    def test_work_with_map(self):
        response = self.c.get('/history/work_with_map/')
        self.assertEqual(response.status_code, 200)

    def test_map_id_correct(self):
        response = self.c.get('/history/work_with_map/',{'id':1})
        self.assertEqual(response.status_code, 200)

    def test_map_id_incorrect(self):
        response = self.c.get('/history/work_with_map/',{'id':-1})
        self.assertEqual(response.status_code, 200)

