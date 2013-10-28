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
        var ShoppingList = Backbone.Model.extend({
               urlRoot:'/api/shopping_lists/',
               idAttribute:'id'
            });
        var ShoppingLists = Backbone.Collection.extend({
            model:ShoppingList,
            url : '/api/shopping_lists/'
        });
        //A View for current dashboard products part
        var CurrProducts = Backbone.View.extend({
            render: function() {
                var data = [];
                for(var i=0;i<curr_shopping.models.length;i++)
                {

                    if(curr_shopping.models[i].get('date') ==null)
                    {
                        for(var j=0; j<curr_shopping.models[i].get('products').length;j++)
                        {
                            data[j] = {
                                    icon :'media/'+curr_shopping.models[i].get('products')[j].category.icon,
                                    name :curr_shopping.models[i].get('products')[j].name,
                                    id :  curr_shopping.models[i].get('products')[j].id
                            }
                        }
                    }
                }
                for(var i=0 ; i < data.length;i++)
                {
                        $('.items_of_buylist').prepend(_.template(
                            '<p class="product-item" data-item-name=<%= name%> data-item-icon=<%= icon%>> <img class="test p_rel" src=<%= icon%> </img> <span class = "pdf"><%= name%></span> <i class=" icon-remove" data-product-id=<%= id%>></i></p>'
                            ,data[i]))
                }
                if( $.trim( $('.items_of_buylist').html() ).length != 0 ) {
                    $('.buy-products').show();
                    $('.no_products').hide().remove();
                }
                else{
                    $('.buy-products').hide();
                    $('.items_of_buylist').html('<p class="no_products">'
                        + 'There are no products in your list. Please add.' +
                        '</p>');
                }
            },
            events: {
                "click .buy-products": 'buyProducts',
                "click .icon-remove": 'removeProduct'
            },
            //Function that works when you click on yellow buy-product button
            buyProducts: function() {
                var question = confirm('Would you like to get a printable version ?')
                if (question){
                    var list = document.getElementsByClassName('pdf');
                    var doc = new jsPDF();
                    doc.text(20, 20, 'What you bought:');
                    for(var j=0; j<products.models.length;j++)
                        for(var i = 0; i < list.length; i++)
                        {
                            if((' ' + products.models[j].get('name') + ' ' == list[i].innerHTML) || (products.models[j].get('name') == list[i].innerHTML))
                            {
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
                    $(".product-item").remove();
                    $('.buy-products').hide();
                    $('.no_products').show();

                    //Removes all products from buylist and refreshes their buy date
                    $.post(URLS.BUY_ITEMS,function() {
                        location.reload();
                    })
            },
            //When clicking on cross this function deletes a product from current buylist and moves it to all product list
            removeProduct: function() {
                $('.items_of_buylist').delegate('.icon-remove', 'click', function() {
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
                                    '<span class='+'icon-plus'+'></span><span class = "listprod-item" data-toggle="tooltip" title="'+products.models[i].get('name')+' ,<p>category:'+ products.models[i].get('category').name+',<p>price:'+ products.models[i].get('price')+',<p>last bought:'+ products.models[i].get('last_buy')+'">'+
                                        ' '+products.models[i].get('name')+' '+
                                    '</span>'+
                                    '<span class='+'icon-wrench change_Product'+'></span>'+
                                    '</p>'
                                    )
                                    break;
                                }
                            }
                    })
                });
            }

        });
        //View for choose list. For adding product to current list, updating product information, tooltip show
        var ChooseList = Backbone.View.extend({
            events: {
                "mouseover .choose_for_info": 'tooltipShow',
                "click .choose-item": 'addToCurrentList',
                "click .suggested-item": 'addToCurrentList',
                "click .submit_change": 'submitChange',
                "click .cancel_change": 'cancelChange',
                "mousedown .icon-wrench": 'changeProductInfo'
                //Click on middle mouse button to edit product
            },
            render: function() {
                var dashboard_id = $('.welcome_hi').data('dashboard');
                var data = [];
                var data_not_icluded = [];
                var included = [];
                var data_included = [];
                for(var i=0;i<curr_shopping.models.length;i++)
                {

                    if(curr_shopping.models[i].get('date') ==null)
                    {
                        for(var j=0; j<curr_shopping.models[i].get('products').length;j++)
                        {
                            data_not_icluded[j] = {
                                    name :curr_shopping.models[i].get('products')[j].name,
                                    id :  curr_shopping.models[i].get('products')[j].id
                            }
                        }

                    }
                }
                for(var i=0 ; i < products.models.length;i++)
                {

                        if(products.models[i].get('dashboard') == dashboard_id )
                            data[i] = {icon : products.models[i].get('category').icon,
                                      name :products.models[i].get('name'),
                                      id :  products.models[i].get('id'),
                                      category: products.models[i].get('category').name,
                                      price: products.models[i].get('price'),
                                      last_buy: products.models[i].get('last_buy')
                            };
                }

                    for(var i=0;i<data.length;i++)
                    {
                        var found = false;
                        for(var j=0;j<data_not_icluded.length;j++)
                        {
                            if(data[i].id == data_not_icluded[j].id ){
                              found = true;
                              break;
                            }
                         }
                        if (!found) data_included.push(data[i]);
                    }
                    for(var i=0; i<data_included.length;i++)
                    {
                            $('.choose_list').prepend(_.template('<p class="choose-item choose_for_info" data-product-id = <%= id%> data-item-icon=<%= icon%>><span class="icon-plus"></span><span class = "listprod-item" data-toggle="tooltip" title="<%=name%> <p>category: <%=category%> <p>price: <%=price%> <p>last bought: <%=last_buy%>"> <%=name%> </span><span class="icon-wrench change_Product"></span></p>'
                            ,data_included[i]));
                    }
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
                                products.models[i].set({'name':name_change});
                                products.models[i].set({'price':cost_change});
                                products.models[i].get('category').name = category_change;
                                    $('.choose_list').prepend(
                                    '<p class="choose-item choose_for_info" data-product-id = "'+products.models[i].id+'"'+
                                        'data-item-icon="'+products.models[i].get('category').icon+'">'+
                                    '<span class='+'icon-plus'+'></span><span class = "listprod-item" data-toggle="tooltip" title="'+ products.models[i].get('name') +' ,<p>category:'+ products.models[i].get('category').name +',<p>price:'+ products.models[i].get('price') +',<p>last bought:'+ products.models[i].get('last_buy')+'">'+
                                        ' '+products.models[i].get('name')+' '+
                                    '</span>'+
                                    '<span class='+'icon-wrench change_Product'+'></span>'+
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
                    $(".b-popup-content").show();
                    $('.b-popup').show();
                    $(".change_product_name").val("");
                    $(".change_product_cost").val("");
                    var product_id = $(event.currentTarget.parentNode).data('product-id');
                    var array = [];
                    for(var i=1; i<products.models.length; i++)
                    {
                        array.push(products.models[i].get('category').name)
                    }
                    array.sort();
                    var toAddArray = [array[0]];
                    for(var i = 1; i < array.length; i++)
                    {
                        if (array[i-1] !== array[i]) {
                            toAddArray.push(array[i]);
                        }

                    }
                    if($(".change_product_categories").find('option').length == 0){
                         for(var i =0; i <toAddArray.length;i++)
                         {
                             $(".change_product_categories").append(
                             "<option value="+toAddArray[i]+">"+toAddArray[i]+"</option>")
                         }
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


              },
            // Shows a tooltip when mouse is over a product
            tooltipShow: function() {
                $('.listprod-item').tooltip({
                    placement: 'left',
                    html : 'false',
                    delay: {
                        show: 500, hide: 100
                    }
                });
            },
            // adds the product to current buylist
            addToCurrentList: function(e) {
                e.preventDefault();
                var product_id = $(e.currentTarget).data('product-id');
                $(e.currentTarget).fadeOut().remove();
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
                                '" class=" icon-remove"></i></p>'
                            );
                            break;
                        }
                    }


                if ($(".items_of_buylist > .product-item").length > 0) {
                    $('.no_products').remove();
                    $('.buy-products').show();
                    }
                }

            )}

        });
        if(getCookie('show_about')=='false')
        {
            $('#home').hide();
            $('.checkbox_question').attr("checked",false);
        }
        else{
            $('.checkbox_question').attr("checked",true);
        }
        $('.checkbox_question').change(function(){
                setCookie('show_about',$('.checkbox_question').prop('checked'))
        })
        $(window).scroll(function() {
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                $('#home').hide();
             }
        });
        $(document).ready(function(){
            $('section[data-type="background"]').each(function(){
                var $bgobj = $(this);
                $(window).scroll(function() {
                    var yPos = -($(window).scrollTop() / $bgobj.data('speed'));
                    var coords = '50% '+ yPos + 'px';
                    $bgobj.css({ backgroundPosition: coords });
                });
            });   
        })

        $(".b-popup-content").hide();
        $('.b-popup').hide();
        var model = new Temporary();
        var products = new Products();
        var curr_shopping = new ShoppingLists();
        $.when(curr_shopping.fetch(),products.fetch()).done(function(){
             currProducts.render()
             chooseList.render()
        });
        products.fetch();
        var currProducts = new CurrProducts({el: ".selector"});
        var chooseList = new ChooseList({el: "body"});
        var a = 1;
        chooseList.render();

        if( $.trim( $('.items_of_buylist').html() ).length != 0 ) {
            $('.buy-products').show();
            $('.no_products').hide().remove();
        }
        //currProducts.render(a);
        function setCookie(name, value, options) {
              options = options || {};
              var expires = options.expires;
              if (typeof expires == "number" && expires) {
                var d = new Date();
                d.setTime(d.getTime() + expires*1000);
                expires = options.expires = d;
              }
              if (expires && expires.toUTCString) {
                options.expires = expires.toUTCString();
              }
              value = encodeURIComponent(value);
              var updatedCookie = name + "=" + value;
              for(var propName in options) {
                updatedCookie += "; " + propName;
                var propValue = options[propName];
                if (propValue !== true) {
                  updatedCookie += "=" + propValue;
                 }
              }
              document.cookie = updatedCookie;
        }

        function getCookie(name) {
              var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
              ));
              return matches ? decodeURIComponent(matches[1]) : undefined;
        }

        function deleteCookie(name) {
            setCookie(name, "", { expires: -1 })
        }
});

