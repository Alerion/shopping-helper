//$.Helper = $.Helper || {};

    var localProducts = new $.Helper.Products();

    localProducts.fetch({

        success: function(){

            var menuView = new $.Helper.MenuView();
            var timeLineView = new $.Helper.TimeLineView();
        }
    });
   

    var shoppingLists = new $.Helper.TimeLine();
    var currentProducts = new $.Helper.Products();

    shoppingLists.fetch({ async:false,

                success : function() {
                   
                    var currentList = shoppingLists.where({ 'date': null})[0];
                    var products = currentList.get('products');
                    _.each(products.models, function(product){
                        currentProducts.add(product)
                    })
                    
                }
            })
    $.Helper.timer = "";

    $.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
    }
    