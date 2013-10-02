   $.Helper = $.Helper || {} 


    $.Helper.Products = Backbone.Collection.extend({

        model: $.Helper.Product,
        url : '/api/products/'
        
    })

    $.Helper.Categories = Backbone.Collection.extend({
        
        model: $.Helper.Category,
        url : '/api/categories/',
        comparator: 'id'
    })

    $.Helper.TimeLine = Backbone.Collection.extend({

        model: $.Helper.ShoppingList,
        url : '/api/shopping_lists/',
        comparator: 'date'  
    })

