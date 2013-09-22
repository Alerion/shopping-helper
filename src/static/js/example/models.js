$.models = $.models || {};

$.models.Product = Backbone.RelationalModel.extend({
    urlRoot: '/api/products',
    idAttribute: 'id'
});

$.models.Category = Backbone.RelationalModel.extend({
    urlRoot: '/api/categories',
    idAttribute: 'id',
    relations: [{
        type: Backbone.HasMany,
        key: 'products',
        relatedModel: '$.models.Product',
        reverseRelation: {
            key: 'category',
            includeInJSON: 'id',
        },
    }]
});