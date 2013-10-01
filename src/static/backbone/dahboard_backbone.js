    $(function(){
        //Model for adding product information to get it if needed
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
        //A View for current dashboard products part
        var CurrProducts = Backbone.View.extend({
            events: {
                "click .buy-products": 'buyProducts',
                "click .remove-product": 'removeProduct'
            },
            //Function that works when you click on yellow buy-product button
            buyProducts: function() {
                //we ask if user wants a printable version
                $.get('/api/products/',function(response) {
                    var question = confirm('Would you like to get a printable version ?')
                        if (question == true){
                            var list = document.getElementsByClassName('pdf');
                            var doc = new jsPDF();
                            doc.text(20, 20, 'What you bought:');
                            for(var j=0; j<response.length;j++)
                                for(var i = 0; i < list.length; i++)
                                {
                                    if(" "+response[j].name+" " == list[i].innerHTML )
                                    {
                                        doc.setFontSize(15);
                                        doc.text(20, 30 + i*10, response[j].name);
                                        doc.setFontSize(13);
                                        doc.text(50, 30 + i*10, "cost: " + response[i].price);
                                        doc.setFontSize(13);
                                        doc.text(80, 30 + i*10, "category: " + response[i].category.name);
                                    }
                                }
                            doc.output('dataurlnewwindow');
                        }

                        $('.buy-products').on('click',function() {
                            $(".product-item").remove();
                            $('.buy-products').hide();
                            $('.no_products').show();
                        })
                        //Removes all products from buylist and refreshes their buy date
                        $.post(URLS.BUY_ITEMS,function() {
                            location.reload();
                        })
                });
            },
            //When clicking on cross this function deletes a product from current buylist and moves it to all product list
            removeProduct: function() {
                $('.items_of_buylist').delegate('.remove-product', 'click', function() {
                    $(this).parent().fadeOut();
                    $(this).parent().remove();
                    var $this = $(this);
                    var product_id = $this.data('product-id');
                    Model.set({'removed_item_id':product_id})
                    $.post(URLS.REMOVE_ITEM,{'product_id':product_id},function(){
                        $this.parents('.product-item').remove();
                        if ($(".items_of_buylist > .product-item").length == 0) {
                            $('.buy-products').fadeOut(400, function() {
                                $('.items_of_buylist').html('<p class="no_products">'
                                + 'There are no products in your list. Please add.' +
                                '</p>');

                            });
                        }
                        //adding product back to all products list
                        $.get('/api/products/',function(response) {
                            for(var i= 0; i<response.length; i++)
                            {
                                if(Model.get('removed_item_id')==response[i].id)
                                {
                                    Model.set({
                                        "id":response[i].id,
                                        "category.icon": response[i].category.icon,
                                        "category.name": response[i].category.name,
                                        "name": response[i].name,
                                        'price':response[i].price,
                                        'last_buy':response[i].last_buy

                                    })
                                }
                            }
                            $('.choose_list').prepend(
                                '<p class="choose-item choose_for_info" data-product-id = "'+Model.get('id')+'"'+
                                    'data-item-icon="'+Model.get('category.icon')+'">'+
                                '<span class = "listprod-item" data-toggle="tooltip" title="'+Model.get('name')+' ,<p>category:'+ Model.get('category.name')+',<p>price:'+ Model.get('price')+',<p>last bought:'+ Model.get('last_buy')+'">'+
                                    ''+Model.get('name')+' '+
                                '</span>'+
                                '<span class="last-bought">last bought'+ Model.get('last_buy') +'</span>'+
                                '</p>'
                                )
                            })
                    })



                });
            },
            render: function() {
                return this;
            }
        });

        var SuggestedProducts = Backbone.View.extend({
            events: {
                "click .suggested-item": 'addToCurrentList'
            },

            render: function() {
                return this;
            }
        });
        //View for choose list. For adding product to current list, updating product information, tooltip show
        var ChooseList = Backbone.View.extend({
            events: {
                "mouseover .choose_for_info": 'tooltipShow',
                "click .choose-item": 'addToCurrentList',
                "click .submit_change": 'submitChange',
                "click .cancel_change": 'cancelChange',
                "mousedown .choose-item": 'changeProductInfo'
                //Click on middle mouse button to edit product
            },

            render: function() {
                return this;
            },
            //This function fires when the change is submitted , after clicking on submit button
            submitChange: function(){
                var name_change = $(".change_product_name").val();
                var cost_change = $(".change_product_cost").val();
                var category_change = $(".change_product_categories option:selected").text();
                $.post(URLS.CHANGE_ITEM,{'product_id':Model.get('old_prod_id'),'name_change':name_change,'cost_change':cost_change,'category_change':category_change},function(response){
                        $(".choose-item").filter("[data-product-id=" + Model.get('old_prod_id') + "]").remove();
                        $(".change_product_info").hide();
                        $(".change_product_name").val("");
                        $(".change_product_cost").val("");
                        $.get('/api/products/',function(response) {
                        for(var i= 0; i<response.length; i++)
                        {
                            if(Model.get('old_prod_id')==response[i].id)
                            {
                                Model.set({
                                    "id":response[i].id,
                                    "category.icon": response[i].category.icon,
                                    "category.name": response[i].category.name,
                                    "name": response[i].name,
                                    'price':response[i].price,
                                    'last_buy':response[i].last_buy

                                });
                            }
                        }
                        // adds changed product back to list of all products
                        $('.choose_list').prepend(
                            '<p class="choose-item choose_for_info" data-product-id = "'+Model.get('id')+'"'+
                                'data-item-icon="'+Model.get('category.icon')+'">'+
                            '<span class = "listprod-item" data-toggle="tooltip" title="'+Model.get('name')+' ,<p>category:'+ Model.get('category.name')+',<p>price:'+ Model.get('price')+',<p>last bought:'+ Model.get('last_buy')+'">'+
                                ''+Model.get('name')+' '+
                            '</span>'+
                            '<span class="last-bought">last bought'+ Model.get('last_buy') +'</span>'+
                            '</p>'
                        )
                    })
                })
            },
            //cancels changing product
            cancelChange: function(){
                    $(".change_product_info").hide();
                    $(".change_product_name").val("");
                    $(".change_product_cost").val("");
            },
            //changes product info vhen clicking on mousewheel button
            changeProductInfo: function(event){
                if(event.which == 2){
                    $(".change_product_info").show();
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
            // Shows a tooltip when mouse is over a product
            tooltipShow: function() {
                $('.listprod-item').tooltip({
                    placement: 'left',
                    html : 'true',
                    delay: {
                        show: 500, hide: 100
                    }
                });
            },
            // adds the product to current buylist
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
        //Creating objects to work with
        $(".change_product_info").hide();
        var Model = new ProductItemsModel()
        var currProducts = new CurrProducts({el: ".selector"});
        var chooseList = new ChooseList({el: "body"});
        chooseList.render();
        currProducts.render();
});

