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
                    question = confirm('Would you like to get a printable version ?')
                    var list = document.getElementsByClassName('pdf');
                        if (question == true){
                            var list = document.getElementsByClassName('pdf');
                            var doc = new jsPDF();
                            doc.text(20, 20, 'What you bought:');
                            for(var j=0; j<response.length;j++)
                                for(var i = 0; i < list.length; i++)
                                {
                                    if(" "+response[j].name+" " == list[i].innerHTML ){
                                        doc.setFontSize(15);
                                        doc.text(20, 30 + i*10, response[j].name);
                                        doc.setFontSize(13);
                                        doc.text(50, 30 + i*10, "cost: " + response[i].price)
                                        doc.setFontSize(13);
                                        doc.text(80, 30 + i*10, "category: " + response[i].category.name)
                                    }
                                }
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
                });

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
                "click .choose-item": 'addToCurrentList',
                "click .submit_change": 'submitChange',
                "click .cancel_change": 'cancelChange',
                "mousedown .choose-item": 'changeProductInfo'
            },

            render: function() {
                return this;
            },
            submitChange: function(e){

                var name_change = $(".change_product_name").val();
                console.log(name_change)
                var cost_change = $(".change_product_cost").val();
                var category_change = $(".change_product_categories option:selected").text();
                $.post(URLS.CHANGE_ITEM,{'product_id':Model.get('old_prod_id'),'name_change':name_change,'cost_change':cost_change,'category_change':category_change},function(response){

                })
                $(".change_product_name").val();
            },
            changeProductInfo: function(event){
                if(event.which == 2){

                    $(".change_product_name").val("");
                    $(".change_product_cost").val("");
                    var product_id = $(event.currentTarget).data('product-id');
                    $.get('/api/products/',function(response) {
                        if($(".change_product_categories").find('option').length == 0){
                            $(".change_product_categories").append(
                                "<option value="+"Other"+">Other</option>"+
                                "<option value="+"Food"+">Food</option>"+
                                "<option value="+"Drink"+">Drink</option>"+
                                "<option value="+"Stationary"+">Stationary</option>"+
                                "<option value="+"Pets"+">Pets</option>"+
                                "<option value="+"Alcohol"+">Alcohol</option>"
                        )};

                    for(var i=0; i<response.length; i++)
                    {
                        if(response[i].id == product_id)
                        {
                            Model.set({'old_prod_id':product_id})
                            $(".change_product_name").val(response[i].name);
                            $(".change_product_cost").val(response[i].price);

                        }
                    }


                })
            }},

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
        var chooseList = new ChooseList({el: "body"});
        var suggestedProducts = new SuggestedProducts({el: ".suggested"});
        chooseList.render();
        currProducts.render();
});

