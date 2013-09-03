from rest_framework import viewsets, routers

from .models import Category, Product, ShoppingList, Dashboard


class DashboardViewSet(viewsets.ModelViewSet):
    model = Dashboard


class CategoryViewSet(viewsets.ModelViewSet):
    model = Category


class ProductViewSet(viewsets.ModelViewSet):
    model = Product


class ShoppingListViewSet(viewsets.ModelViewSet):
    model = ShoppingList


router = routers.DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'shopping_lists', ShoppingListViewSet)
router.register(r'dashboards', DashboardViewSet)
