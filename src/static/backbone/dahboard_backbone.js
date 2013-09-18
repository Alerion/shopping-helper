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








            //$.post(URLS.ADD_ITEM,{'product_id':product_id},function(response){
            //    $(".items_of_buylist").prepend(
            //        '<p class="product-item" data-item-icon="' +
            //         product_icon +
            //         '">' +
            //         ' <img class="icon-animation" src="' + product_icon + '" />' +
            //        '<span class="pdf">' + ' ' +
            //        response + ' ' +
            //         '</span>' +
            //        '<i data-product-id="'+
            //        product_id +
            //        '" class="icon-remove-circle remove-product"></i></p>');
            //});

