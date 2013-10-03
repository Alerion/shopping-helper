    $(function(){
        //Model for adding product information to get it if needed
        var Temporary = Backbone.Model.extend({
                    "removed_item_id":null,
                    "old_prod_id":null
            });
        var Product = Backbone.Model.extend({
               urlRoot:'/api/products',
               idAttribute:'id'
            });
        var Products = Backbone.Collection.extend({
            model:Product,
            url : '/api/products/'
        });



        //A View for current dashboard products part
        var CurrProducts = Backbone.View.extend({
            events: {
                "click .buy-products": 'buyProducts',
                "click .remove-product": 'removeProduct'
            },
            //Function that works when you click on yellow buy-product button
            buyProducts: function() {
                var question = confirm('Would you like to get a printable version ?')
                if (question == true){
                    var list = document.getElementsByClassName('pdf');
                    var doc = new jsPDF();
                    doc.text(20, 20, 'What you bought:');
                    for(var j=0; j<products.models.length;j++)
                        for(var i = 0; i < list.length; i++)
                        {
                            //console.log(products.models[j].get('name'))
                            //console.log(list[i].innerHTML)
                            if(' ' + products.models[j].get('name') + ' ' == list[i].innerHTML )
                            {
                                console.log('toPDF working')
                                doc.setFontSize(15);
                                doc.text(20, 30 + i*10, products.models[j].get('name'));
                                doc.setFontSize(13);
                                doc.text(50, 30 + i*10, "cost: " + products.models[i].get('price'));
                                doc.setFontSize(13);
                                doc.text(80, 30 + i*10, "category: " + products.models[i].get('category').name);
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
            },
            //When clicking on cross this function deletes a product from current buylist and moves it to all product list
            removeProduct: function() {
                $('.items_of_buylist').delegate('.remove-product', 'click', function() {
                    $(this).parent().fadeOut().remove();
                    var $this = $(this);
                    var product_id = $this.data('product-id');
                    model.set({'removed_item_id':product_id})
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
                            for(var i= 0; i<products.models.length; i++)
                            {
                                if(model.get('removed_item_id')==products.models[i].get('id'))
                                {
                                    $('.choose_list').prepend(
                                    '<p class="choose-item choose_for_info" data-product-id = "'+products.models[i].id+'"'+
                                        'data-item-icon="'+products.models[i].get('category').icon+'">'+
                                    '<span class = "listprod-item" data-toggle="tooltip" title="'+products.models[i].get('name')+' ,<p>category:'+ products.models[i].get('category').name+',<p>price:'+ products.models[i].get('price')+',<p>last bought:'+ products.models[i].get('last_buy')+'">'+
                                        ''+products.models[i].get('name')+' '+
                                    '</span>'+
                                    '<span class="last-bought">last bought'+ products.models[i].get('last_buy') +'</span>'+
                                    '</p>'
                                    )
                                }
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
                $.post(URLS.CHANGE_ITEM,{'product_id':model.get('old_prod_id'),'name_change':name_change,'cost_change':cost_change,'category_change':category_change},function(response){
                        $(".choose-item").filter("[data-product-id=" + model.get('old_prod_id') + "]").remove();
                        $('.b-popup').hide()
                        for(var i= 0; i<products.models.length; i++)
                        {
                            if(model.get('old_prod_id')==products.models[i].id)
                            {
                                products.models[i].set({'name':name_change})
                                products.models[i].set({'price':cost_change})
                                products.models[i].get('category').name = category_change;
                                console.log(products.models[i].get('name'));
                                console.log(products.models[i].get('price'));
                                console.log(products.models[i].get('category').name);
                                console.log(name_change)
                                    $('.choose_list').prepend(
                                    '<p class="choose-item choose_for_info" data-product-id = "'+products.models[i].id+'"'+
                                        'data-item-icon="'+products.models[i].get('category').icon+'">'+
                                    '<span class = "listprod-item" data-toggle="tooltip" title="'+ products.models[i].get('name') +' ,<p>category:'+ products.models[i].get('category').name +',<p>price:'+ products.models[i].get('price') +',<p>last bought:'+ products.models[i].get('last_buy')+'">'+
                                        ''+products.models[i].get('name')+' '+
                                    '</span>'+
                                    '<span class="last-bought">last bought'+ products.models[i].get('last_buy') +'</span>'+
                                    '</p>'
                                    )
                            }
                        }
                })
            },
            //cancels changing product
            cancelChange: function(){
                    $(".b-popup-content").hide();
                    $('.b-popup').hide();
                    $(".change_product_name").val("");
                    $(".change_product_cost").val("");
            },
            //changes product info vhen clicking on mousewheel button
            changeProductInfo: function(event){
                if(event.which == 2){
                    $(".b-popup-content").show();
                    $('.b-popup').show();
                    $(".change_product_name").val("");
                    $(".change_product_cost").val("");
                    var product_id = $(event.currentTarget).data('product-id');
                    if($(".change_product_categories").find('option').length == 0){
                         $(".change_product_categories").append(
                             "<option value="+"Other"+">Other</option>"+
                             "<option value="+"Food"+">Food</option>"+
                             "<option value="+"Drink"+">Drink</option>"+
                             "<option value="+"Stationary"+">Stationary</option>"+
                             "<option value="+"Pets"+">Pets</option>"+
                             "<option value="+"Alcohol"+">Alcohol</option>")
                    }
                    for(var i=0; i<products.models.length; i++)
                    {
                        if(products.models[i].id == product_id)
                        {
                            model.set({'old_prod_id':product_id})
                            $(".change_product_name").val(products.models[i].get('name'));
                            $(".change_product_cost").val(products.models[i].get('price'));

                        }
                    }

                }
              },
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
                $.post(URLS.ADD_ITEM,{'product_id':product_id},function(){
                    for(var i=0; i<products.models.length; i++)
                    {
                        if(products.models[i].get('id')==product_id)
                        {
                            $(".items_of_buylist").prepend(
                                '<p class="product-item" data-item-icon="' +
                                products.models[i].get('category').icon +
                                '">' +
                                ' <img class="icon-animation" src="/media/' + products.models[i].get('category').icon + '" />' + // need to fix this /media/
                                '<span class="pdf">' + ' ' +
                                products.models[i].get('name') + ' ' +
                                '</span>' +
                                '<i data-product-id="'+
                                products.models[i].get('id') +
                                '" class="icon-remove-circle remove-product"></i></p>'
                            );
                        }
                    }


                if ($(".items_of_buylist > .product-item").length > 0) {
                    $('.no_products').remove();
                    $('.buy-products').show();
                    }
                }

            )}

        })

        if( $.trim( $('.items_of_buylist').html() ).length == 0 ) {
             $('.items_of_buylist').html('<p class="no_products">'
                                + 'There are no products in your list. Please add.' +
                                '</p>');
             $('.buy-products').hide();
        }
        //Creating objects to work with
        $(".b-popup-content").hide();
        $('.b-popup').hide();
        var model = new Temporary()
        var products = new Products();
        products.fetch();
        var currProducts = new CurrProducts({el: ".selector"});
        var chooseList = new ChooseList({el: "body"});
        chooseList.render();
        currProducts.render();
});

