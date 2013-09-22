$.collections = $.collections || {};

$.collections.CategoryList = Backbone.Collection.extend({
    url: '/api/categories',
    model: $.models.Category
});