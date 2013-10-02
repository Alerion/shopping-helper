from django.contrib import admin

from .models import Category, Dashboard, Product, ShoppingList, Location


class CategoryAdmin(admin.ModelAdmin):
    pass

class DashboardAdmin(admin.ModelAdmin):
    pass

class LocationAdmin(admin.ModelAdmin):
    pass

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'dashboard', 'last_buy', 'price', 'buy_period')


class ShoppingListAdmin(admin.ModelAdmin):
    pass

admin.site.register(Category, CategoryAdmin)
admin.site.register(Dashboard, DashboardAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ShoppingList, ShoppingListAdmin)
admin.site.register(Location, LocationAdmin)

