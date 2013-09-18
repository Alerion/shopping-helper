

$(function(){
var Product_Items_Model = Backbone.Model.extend({
    defaults:{
        product_id: $(".choose-item").data('product-id'),
        product_icon: $(".choose-item").data('item-icon')
        }
    })


var Product_Items_View = Backbone.View.extend({
    events :{
        "onclick .listprod-item": console.log('clicked')
        }
    })
    var TestBackbone = new Product_Items_Model;
    console.log(TestBackbone.get('product_id'))
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

