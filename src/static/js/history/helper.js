$.Helper = $.Helper || {};

    var localProducts = new $.Helper.Products(); 
    localProducts.fetch({
        success: function(){

            var menuView = new $.Helper.MenuView();
            menuView.render();

            var timeLineView = new $.Helper.TimeLineView();
            timeLineView.render();
        }
    });
   

    var shoppingLists = new $.Helper.TimeLine();
    var currentProducts = new $.Helper.Products();
    shoppingLists.fetch({ async:false,

                success : function() {
                    //shoppingList = new ShoppingList();
                    var currentList = shoppingLists.where({ 'date': null})[0];
                    var products = currentList.get('products');
                    _.each(products,function(product){
                        pr = new $.Helper.Product(product);
                        currentProducts.add(pr)
                    })
                    console.log(currentProducts)
                }
            })
        $.Helper.timer = "";