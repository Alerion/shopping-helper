
    $.Helper.localProducts = new $.Helper.Products();

    $.Helper.localProducts.fetch({

        success: function(){

            var menuView = new $.Helper.MenuView();
            var timeLineView = new $.Helper.TimeLineView();
        }
    });
   
    
    var shoppingLists = new $.Helper.TimeLine();
   $.Helper.currentProducts = new $.Helper.Products();

    // async:false for some reason gives errors in firefox. App crushes
    //NotSupportedError: Operation is not supported
    shoppingLists.fetch({
            
                success : function() {
                   
                    var currentList = shoppingLists.where({ 'date': null})[0];
                    var products = currentList.get('products');
                    
                    _.each(products.models, function(product){
                        $.Helper.currentProducts.add(product)
                    })
                    
                }
                
    })
    
    $.Helper.timer = "";
    $.Helper.t = true;
    $.Helper.markers = []; 

    $.fn.center = function () {
        this.css("position","absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                    $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                    $(window).scrollLeft()) + "px");
        return this;
    }

    $.fn.left = function () {
    this.css("position","absolute");
    this.css("top", $(window).scrollTop() + 55 +"px");
    this.css("left","20px");
    return this;
    }

    $(document).ready(function() {

        $('.navbar-nav').find('li').removeClass('active');
        $('.navbar-nav').find('#history').addClass('active');



    //menu floating
    $(function(){

        var docHeight = $(document).height();
       
        function moveFloatMenu() {
         
            //top position of accordian addad scrollTop position of window
          
            var menuOffset = menuYloc.top + $(this).scrollTop();
            var accordianHeight = parseInt($('#accordian').css('height'),10);
            var floatMenu ;
            var accordianPosition = parseInt($('#accordian').offset().top,10);

            //to determine if accordion is visible
            var OffsetDifference = Math.abs(accordianPosition - menuOffset);

            if(!this.docHeight){
        
                this.docHeight = $(document).height();
            }
      
            if((parseInt(menuOffset,10) + accordianHeight) > this.docHeight){

                floatMenu = false;
            }
            else if($(window).height() < accordianHeight && OffsetDifference < $(window).height()/2){

                floatMenu = false;
            
            }
            else{
                floatMenu = true;
            }
            if (floatMenu){
                $('#accordian').animate({
                    top: menuOffset+"px"
                }, {
                    duration: 500,
                    queue: false
                });
            }
       
        
        }
        //returns the offset coordinates for the selected elements, relative to the document.
       var menuYloc = $('#accordian').offset();
        //The scroll event occurs when the user scrolls in the specified element
        //the window is scrolled, moveFloatMenu works

        $(window).scroll(function(){
            var menuHeight = ($('#accordian').css('height'))
            moveFloatMenu();
          

        });
    })
        
});
   
