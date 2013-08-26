from django.db import models
from django.utils.translation import ugettext_lazy as _


class Category(models.Model):
    name = models.CharField(_(u'name'), max_length=255, unique=True)

    class Meta:
        verbose_name = _(u'category')
        verbose_name_plural = _(u'categories')

    def __unicode__(self):
        return self.name

    @classmethod
    def get_default(cls):
        return


class Dashboard(models.Model):
    name = models.CharField(_(u'name'), max_length=255)
    users = models.ManyToManyField('accounts.User', verbose_name=_(u'users'))

    class Meta:
        verbose_name = _(u'dashboard')
        verbose_name_plural = _(u'dashboards')

    def __unicode__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(_(u'name'), max_length=255)
    category = models.ForeignKey(Category, verbose_name=_(u'category'))
    dashboard = models.ForeignKey(Dashboard, verbose_name=_(u'dashboard'))
    last_buy = models.DateField(_(u'last buy'), null=True, blank=True)
    price = models.DecimalField(_(u'price'), max_digits=6, decimal_places=2, default=0)
    buy_period = models.PositiveIntegerField(_(u'buy period'), default=7, help_text=_(u'in days'))

    class Meta:
        verbose_name = _(u'product')
        verbose_name_plural = _(u'products')

    def __unicode__(self):
        return self.name


class ShoppingList(models.Model):
    date = models.DateField(_(u'date'), blank=True, null=True)
    products = models.ManyToManyField(Product, verbose_name=_(u'products'))
    dashboard = models.ForeignKey(Dashboard, verbose_name=_(u'dashboard'))

    class Meta:
        verbose_name = _(u'shopping list')
        verbose_name_plural = _(u'shopping lists')

    def __unicode__(self):
        if self.date:
            return u'Buy list: %s(%s)' % (self.dashboard, self.date)
        else:
            return u'Buy list: %s' % (self.dashboard,)

    def add_product(self, prod):
        self.products.add(prod)

    def del_product(self, prod):
        self.products.remove(prod)
