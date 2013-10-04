   $.Helper = $.Helper || {} 


    $.Helper.Products = Backbone.Collection.extend({

        model: $.Helper.Product,
        url : '/api/products/'
        
    })

    $.Helper.Locations = Backbone.Collection.extend({

        model: $.Helper.Location_,
        url : '/api/locations/'
        
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
        /*comparator: function(shoppingList){
           date = new Date(shoppingList.get('date'));
           date.getTime();
            return date;

        }*/
    })

   


