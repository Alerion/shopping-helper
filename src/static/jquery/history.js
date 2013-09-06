/*jQuery time*/
//loop trought shopping list

$(document).ready(function() {



    $("#accordian h3").click(function() {
        if(this.flag === 1) {
        	$(this).parent().find("ul").slideUp();
            this.flag = 0;
        } else {
            $(this).parent().find("ul").slideDown();
            this.flag = 1;
        }
    		//slide down the link list below the h3 clicked - only if its closed
    		/*if (!$(this).next().is(":visible")) {
    			$(this).next().slideDown();
    		}*/
    	})

    $('.category').change(function() {
        var slDivs = $(".shopping-list");
        var products = $("#li_category" + this.id).find(".products");
        var n, id, prodId = [];
        for (var i = 0; i < products.length; i++) {
            id = products[i].id;
            n = id.indexOf('_');
            prodId.push(id.slice(n + 1));
        }
        
        if ($(this).is(':checked') ) {
            products.prop("checked", true);/*cant get id direct, need use prop. Why ?*/
            for (var j = 0; j < prodId.length; j++) {
            $('.product_' + prodId[j]).show();
            $('.product_' + prodId[j]).parents('.shopping-list').show();
            }
        } else { 
            products.prop("checked", false);
            for (var j = 0; j < prodId.length; j++) {
                $('.product_' + prodId[j]).hide();
            } 
            hide_Block();
        }
    })

    function hide_Block() {
        var slDivs = $(".shopping-list"); 
        for (var i = 0; i < slDivs.length; i++) {
            var sl_products = $("#" + slDivs[i].id).find(".product:visible");
            if (sl_products.length === 0){ 
                $("#" + slDivs[i].id).hide();
            }
        }
    }

    $('.products').change(function() {
        var id = $(this).attr('id');
        var n = id.indexOf('_');
        var categoryId = id.slice(0, n);
        var p = $('.products');
        var slDivs = $(".shopping-list");  
 
        //TODO:for some reason products in checkbox menu and timeline have different IDs
        var productId =id.slice(n + 1);

        //id of product list item
        var liId = '.product_' + productId; 
        if ($(this).is(':checked')) {
            $('#' + categoryId).prop("checked", true);//check outer checkbox
            $(liId).show(); 
            $(liId).parents('.shopping-list').show();
        } else {
            //hide unchecked product
            $(liId).hide();
            //hide empty block with shopping-list
            hide_Block();
              //when all bolock uncheked
            if ($('#ul_products_' + categoryId).find("input:checkbox:checked").length === 0 ) {
                $('#' + categoryId).prop("checked", false);
            }
            
        }
    })

    $(".circle").mouseenter(function() {
        $(".sl_products_container").css('left','-2000px'); //Hide all popups off screen
        $(this).prev().css('left','130px'); 
    })
    $(".sl_products_container").click(function() {
        $(this).css('left','-2000px'); //Hide current popup off screen
    })

    var previousScrollTop = null;

     $(function() {
        function moveFloatMenu() {

        //top position of accordian addad scrollTop position of window
        //height returns int value
      
        var menuHeight = ($('#accordian').height())

        var scrollTop = (previousScrollTop != null) ? previousScrollTop - $(this).scrollTop() : $(this).scrollTop();

        $('body').append((menuHeight + " " + scrollTop + ", "));

        if ( (menuYloc.top + $(this).scrollTop()) < $(document).height()){
              var menuOffset = menuYloc.top + $(this).scrollTop() + "px";
         
            $('#accordian').animate({
                top: menuOffset
            }, {
                duration: 1000,
                queue: false
            });
        }


         
        }
       
    
    //returns the offset coordinates for the selected elements, relative to the document.
    menuYloc = $('#accordian').offset();
    //The scroll event occurs when the user scrolls in the specified element
    //the window is scrolled, moveFloatMenu works
    $(window).scroll(function(){
        
        moveFloatMenu();

    });
   
    $('a:has(.add-product)').click(function(){
        var id = $(this).data('product_id');
        $.get('/history/information/?id='+id, function(data) {
            var text = $("<p></p>").text("Text.");
            //TODO:зробити сірий фон, поверх нього поцентру div,туди завантажується інфа
            //завантажити json зі всім, або завантажувати потрібне після кліку
            $("body").append(txt);
        })
    }) 
   
});


     /*$("#list_button").click(function() {

        var url = "/history/update_timeline";
        var data=$("#acordionForm").serialize();
        $.ajax({
               type: "POST",
               url: url,
               data: data, 
               success: function(data) //якщо успішно виконано відправку поста -- виводиться серилізований вміст форми
               {
                   alert(data); 
               },
            
             });

        return false; //???
    });*/

})
