    $(function(){
        var ProductItemsModel = Backbone.Model.extend({
                defaults:{
                    category: {
                        'id': null,
                        'icon':"",
                        'name':""
                    },
                    "id": null,
                    "name": "",
                    "dashboard": null,
                    "last_buy": "",
                    "price": "",
                    "buy_period": null
                }
            });

        var CurrProducts = Backbone.View.extend({
            events: {
                "click .buy-products": 'buyProducts',
                "click .remove-product": 'removeProduct'
            },

            buyProducts: function() {

                $(".product-item").remove();
                $('.buy-products').hide();
                $('.no_products').show();
            },

            removeProduct: function() {
                $('.items_of_buylist').delegate('.remove-product', 'click', function() {
                    $(this).parent().fadeOut();
                    var $this = $(this);
                    var product_id = $this.data('product-id');
                    $.post(URLS.REMOVE_ITEM,{'product_id':product_id},function(){
                        $this.parents('.product-item').remove();
                        if ($(".items_of_buylist > .product-item").length == 0) {
                            $('.buy-products').fadeOut(400, function() {
                                $('.items_of_buylist').html('<p class="no_products">'
                                + 'There are no products in your list. Please add.' +
                                '</p>');

                            });
                        }
                    })
                });
            },

            render: function() {
                return this;
            }
        });

        var SuggestedProducts = Backbone.View.extend({
            events: {
                "click .suggested-item": 'addToCurrentList' // needs a fix
            },

            render: function() {
                return this;
            }


        })

        var ChooseList = Backbone.View.extend({
            events: {
                "mouseover .choose_for_info": 'tooltipShow',
                "click .choose-item": 'addToCurrentList'
            },

            render: function() {
                return this;
            },

            tooltipShow: function() {
                $('.listprod-item').tooltip({
                    placement: 'left',
                    html : 'true',
                    delay: {
                        show: 500, hide: 100
                    }
                });
            },
            addToCurrentList: function(e) {
                e.preventDefault();
                var product_id = $(e.currentTarget).data('product-id');
                $(e.currentTarget).fadeOut();
                $(e.currentTarget).remove();
                $.get('/api/products/',function(response) {
                    product_info = response
                    for(var i=0;i < product_info.length;i++)
                    {
                        if(product_info[i].id == product_id){
                            console.log(product_info[i])
                            Model.set(
                                {
                                    "category.id": product_info[i].category.id,
                                    "category.name": product_info[i].category.name,
                                    "category.icon": product_info[i].category.icon,
                                    "id": product_info[i].id,
                                    "name": product_info[i].name,
                                    "dashboard": product_info[i].dashboard,
                                    "last_buy": product_info[i].last_buy,
                                    "price": product_info[i].price,
                                    "buy_period": product_info[i].buy_period
                                })
                            }
                    }

                    console.log('category.id ' + Model.get('category.id'));
                    console.log('category.name ' + Model.get('category.name'));
                    console.log('category.icon ' + Model.get('category.icon'));
                    console.log('id ' + Model.get('id'));
                    console.log('name ' + Model.get('name'));
                    console.log('dashboard ' + Model.get('dashboard'));
                    console.log('last_buy ' + Model.get('last_buy'));
                    console.log('price ' + Model.get('price'));
                    console.log('buy_period ' + Model.get('buy_period'));

                $.post(URLS.ADD_ITEM,{'product_id':product_id},function(){
                    $(".items_of_buylist").prepend(
                        '<p class="product-item" data-item-icon="' +
                        Model.get('category.icon') +
                        '">' +
                        ' <img class="icon-animation" src="/media/' + Model.get('category.icon') + '" />' + // need to fix this /media/
                        '<span class="pdf">' + ' ' +
                        Model.get('name') + ' ' +
                        '</span>' +
                        '<i data-product-id="'+
                        Model.get('id') +
                        '" class="icon-remove-circle remove-product"></i></p>'
                    );

                if ($(".items_of_buylist > .product-item").length > 0) {
                    $('.no_products').remove();
                    $('.buy-products').show();
                }
            });

            })}

        })
        var Model = new ProductItemsModel()
        var currProducts = new CurrProducts({el: ".items_of_buylist"});
        var chooseList = new ChooseList({el: ".choose_list"});
        var suggestedProducts = new SuggestedProducts({el: ".suggested"});
        chooseList.render();
        currProducts.render();

});

