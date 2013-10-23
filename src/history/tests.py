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
        #self.c.login(username='admin', password='admin')
        self.c.post('/login/', {'username': 'admin', 'password': 'admin'})

    def testView(self):
        response = self.c.post('/login/', {'username': 'admin', 'password': 'admin'})
        print response.status_code
        #response = self.c.get('/history/prices/')
        #print response.content
        #response = self.c.post('/history/old/')
        #print response.content
        #response = self.c.get('/history/work_with_map/', {'id': 1})
        #print response
        #print self.c.get('/history/work_with_map/?id =1')
        #self.assertEqual(self.c.get('/history/work_with_map/', {'id': 1}).loc_names, ["Home Shop", "Magnus", "Arsen", "Colobock"])

    def test_prices(self):
        #response = self.c.get('/history/prices/')
        #print response.content

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


#class TestMainViews(TestCase):
    #urls = 'history'
    #def setUp(self):
        #self.c = Client()
    #def testIndexPageView(self):
        # Here you'd test your view using ``Client``.
        #call_some_test_code()