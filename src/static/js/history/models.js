

    
    Helper.Product = Backbone.RelationalModel.extend({

        urlRoot: '/api/products/?format=jsonрполло',
        idAttribute: 'id'
    });

    
    Helper.Category = Backbone.RelationalModel.extend({
        urlRoot: '/api/categories',
        idAttribute: 'id',
        relations: [{
            type: Backbone.HasMany,
            key: 'products',
            relatedModel: 'Helper.Product',
            reverseRelation: {
                key: 'category',
                includeInJSON: 'id',
            },

        }]
    });

Helper.ShoppingList = Backbone.RelationalModel.extend({
         
        urlRoot : '/api/shopping_lists/',
        idAttribute: 'id',
        relations: [{
            type: Backbone.HasMany,
            key: 'products',
            relatedModel: 'Helper.Product'
        }]
    });