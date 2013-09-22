var CategoryList = Backbone.Collection.extend({
    url: '/api/categories/',
    model: Category
});