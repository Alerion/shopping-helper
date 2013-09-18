    $(function(){
        var ProductItemsModel = Backbone.Model.extend({
            defaults: {
                product_id_CurrProducts: $(".choose-item").data('product-id'),
                product_icon_CurrProducts: $(".choose-item").data('item-icon')
                
                //var product_id = $this.data('product-id');

                }
            });

        var CurrProducts = Backbone.View.extend({
            events: {
                "click .buy-products": buyProducts,
                "click .remove-product": removeProduct
            }
        })

        var SuggestedProducts = Backbone.View.extend({
            events: {

            }

        })

        var ChooseList = Backbone.View.extend({
            events: {
                "onmouseover .listprod-item": tooltipShow,
                "onclick .listprod-item": addToCurrentList
            }

        })

        console.log(TestBackboneView.el);

    //console.log(TestBackbone.get('product_id'))
    //    console.log(this)
    //console.log(this.$el)
});

