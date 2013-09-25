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
                $.get('/api/products/',function(response) {
                    var product_info = response
                    question = confirm('Would you like to get a printable version ?')
                    var list = document.getElementsByClassName('pdf');
                    if (question == true){
                        var list = document.getElementsByClassName('pdf');
                        var doc = new jsPDF();
                        var sumprice = 0;
                        var textlocation = 0;
                        doc.text(20, 20, 'What you bought is :');
                        for(var i =0; i< product_info.length; i++)
                            for(var j=0; j< list.length; j++)
                                if(" "+product_info[i].name+" " == list[j].innerHTML)
                                {
                                    textlocation = 30 + i*10;
                                    doc.setFontSize(15);
                                    doc.text(20, textlocation, product_info[i].name.toLowerCase());
                                    doc.setFontSize(13);
                                    doc.text(50, textlocation, "cost: " + product_info[i].price);
                                    doc.setFontSize(13);
                                    doc.text(80, textlocation, "category: " + product_info[i].category.name);
                                    sumprice = parseInt(sumprice) + parseInt(product_info[i].price);
                                }
                            doc.text(20 , textlocation + 10 ," What you bought costs: " + sumprice.toString() + " EUR");
                            doc.output('dataurlnewwindow');
                        }
                        $('.buy-products').on('click',function() {
                            $(".product-item").remove();
                            $('.buy-products').hide();
                            $('.no_products').show();
                        })
                    $.post(URLS.BUY_ITEMS,function() {
                        location.reload();
                    })
                })
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
                            Model.set(
                                {
                                    "category.id": product_info[i].category.id,
                                    "category.icon": product_info[i].category.icon,
                                    "id": product_info[i].id,
                                    "name": product_info[i].name
                                })
                            }
                    }
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
        var currProducts = new CurrProducts({el: ".selector"});
        var chooseList = new ChooseList({el: ".choose_list"});
        var suggestedProducts = new SuggestedProducts({el: ".suggested"});
        chooseList.render();
        currProducts.render();
});

