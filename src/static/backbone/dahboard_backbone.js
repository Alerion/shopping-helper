    $(function(){
        var ProductItemsModel = Backbone.Model.extend({
            defaults: {
                product_id_CurrProducts: $(".choose-item").data('product-id'),
                product_icon_CurrProducts: $(".choose-item").data('item-icon')
                }
            });

        var CurrProducts = Backbone.View.extend({
            tagName: 'a',

		    className: 'buy-products',

            events: {
                "click .buy-products": 'buyProducts'
                //"click .remove-product": 'removeProduct'
            },

            buyProducts: function() {
                console.log("working1");

            },

            render: function() {
                //this.$el.html(this.template(this.model.defaults));
                return this;
            }
        });

        var SuggestedProducts = Backbone.View.extend({
            events: {

            }

        })

        var ChooseList = Backbone.View.extend({
            events: {
                "onmouseover .listprod-item": 'tooltipShow',
                "onclick .listprod-item": 'addToCurrentList'
            }

        })

        var test = new CurrProducts();
        test.events.render()
        //test.buyProducts();

});

