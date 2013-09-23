from rest_framework import viewsets, routers, serializers

from .models import Category, Product, ShoppingList, Dashboard


class DashboardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dashboard


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product


class CategoryProductsSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Category


class ShoppingListSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = ShoppingList


class DashboardViewSet(viewsets.ModelViewSet):
    serializer_class = DashboardSerializer
    model = Dashboard

    def get_queryset(self):
        qs = super(DashboardViewSet, self).get_queryset()
        return qs.filter(users=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategoryProductsSerializer
    model = Category

    def get_queryset(self):
        qs = super(CategoryViewSet, self).get_queryset()
        return qs.filter(products__dashboard__users=self.request.user).distinct()


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    model = Product
    filter_fields = ('name', 'category')
    def get_queryset(self):
        qs = super(ProductViewSet, self).get_queryset()
        return qs.filter(dashboard__users=self.request.user)


class ShoppingListViewSet(viewsets.ModelViewSet):
    serializer_class = ShoppingListSerializer
    model = ShoppingList


router = routers.DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'shopping_lists', ShoppingListViewSet)
router.register(r'dashboards', DashboardViewSet)
