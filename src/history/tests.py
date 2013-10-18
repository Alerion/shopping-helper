from django.core.management import setup_environ
from src import settings
setup_environ(settings)
from django.test.client import Client
from src.history import views

from django.test import TestCase
import unittest
class ViewErrorTest(unittest.TestCase):
    def setUp(self):
        self.c = Client()
        self.c.login(username='admin', password='admin')

    #def testView(self):
        #response = self.c.post('/login/', {'username': 'admin', 'password': 'admin'})
        #print response.status_code
        #response = self.c.get('/history/prices/')
        #print response.content
        #response = self.c.post('/history/old/')
        #print response.content
        #response = self.c.get('/history/work_with_map/', {'id': 1})
        #print response
        #print self.c.get('/history/work_with_map/?id =1')
        #self.assertEqual(self.c.get('/history/work_with_map/', {'id': 1}).loc_names, ["Home Shop", "Magnus", "Arsen", "Colobock"])

    def test_prices(self):
        response = self.c.get('/history/prices/')
        self.assertEqual(response.status_code, 200)

    def test_previous_settings(self):
        #self.c.post('/login/', {'username': 'admin', 'password': 'admin'})
        response = self.c.get('/history/previous_settings/')
        print response
        self.assertEqual(response.status_code, 200)

#class TestMainViews(TestCase):
    #urls = 'history'
    #def setUp(self):
        #self.c = Client()
    #def testIndexPageView(self):
        # Here you'd test your view using ``Client``.
        #call_some_test_code()