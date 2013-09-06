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


    //$("#accordian h3").click(function() {
        //if(this.flag === 1) {
        	//$(this).parent().find("ul").slideUp();
            //this.flag = 0;
        //} else {
            //$(this).parent().find("ul").slideDown();
            //this.flag = 1;
        //}
    		//slide down the link list below the h3 clicked - only if its closed
    		/*if (!$(this).next().is(":visible")) {
    			$(this).next().slideDown();
    		}*/
        var priceMass = [];

        $(".icon-download").click(function() {
            $(this).parents('li').find("ul").slideDown();
    	})

        $(".icon-upload").click(function() {
            $(this).parents('li').find("ul").slideUp();
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
            count_circle_sizes();

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


    function count_circle_sizes() {
        var pattern = [50,100,200,400,800,1000,1500,2000,3000, 1000000000]
        var sumMuss = [];
        var singleSum = 0;
        var circles = [];
        var slDivs = $(".shopping-list"); //знаходимо всі лісти
        for (var i = 0; i < slDivs.length; i++) {
            var sl_products = $("#" + slDivs[i].id).find(".product:visible");// всі видимі продукти в кожному з них
            //знаходмо всі кружочки
            var circle = $("#" + slDivs[i].id).find(".circle");
            circles.push(circle);
        //створюємо масив сум
            singleSum = 0;
            for (var j = 0; j < sl_products.length; j++){
                var id = (sl_products[j].id).slice(11);
                for (var k = 0; k < priceMass.length; k++ ) {
                    if (priceMass[k]['pr_id'] == id) {
                            singleSum += priceMass[k]['pr_price']  
                    }
                }       
            }
            sumMuss.push(singleSum);
        }
        //створюємо масив розмірів
        var sizes = []
        for (var l = 0; l < sumMuss.length; l++) {
            for (var m = 0; m < pattern.length; m++){
                if (sumMuss[l] < pattern[m]) {
                    sizes.push(m)
                    break;
                }
            }
        }
        //присвоюємо кожному кружочку свій розмір
        for (var k = 0; k < circles.length; k++) {
            circles[k].removeClass();
            circles[k].addClass('circle');
            circles[k].addClass('size-' + sizes[k])
            circles[k].text(sumMuss[k]);
        }
    }


    $('.products').change(function() {
        var id = $(this).attr('id');
        var n = id.indexOf('_');
        var categoryId = id.slice(0, n);
        var p = $('.products');
        var slDivs = $(".shopping-list");  
 
        
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
        count_circle_sizes();
    })

    $(".circle").mouseenter(function() {
        $(".sl_products_container").css('left','-2000px'); //Hide all popups off screen
        $(this).prev().css('left','130px'); 
    })
    $(".cross").click(function() {
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
   
   $('a').click(function() {
        
        var id = $(this).data('product_id');
        $.get('/history/information/?id='+id, function(data) {
            console.log(data.name)
           
            //TODO:зробити сірий фон, поверх нього поцентру div,туди завантажується інфа
            //завантажити json зі всім, або завантажувати потрібне після кліку

        var txt = $("<p></p>").html(data.name+'<br/>'+data.category+'<br/>');
        $("body").append(txt);    
        })   
    })


    $.get('/history/previous_settings',function(data) {
        //потрібно початково присвоїти одним кнопкам add іншим delete
        //елементам попапів + або -
        for(var i = 0; i < data.length; i++) {
            var id = data[i].product_in_id
            //console.log(data[i]['product_in_id']);
            $('#button_'+ id).val('delete');
            $('.product_'+id).find('div').removeClass('icon-minus');
            $('.product_'+id).find('div').addClass('icon-plus');
        }
    })

   $('.add_delete_product').click(function() {
        var that = $(this); 
        add_delete(that,false)
    })

    $('.plus-minus').click(function() {
        var that = $(this)
        add_delete(that,true);
    })

    function add_delete(that,bool) {
        var id = (bool) ? that.data('product_id') : that.attr('id').slice(7);
        //є дві кнопки +- якщо тиснути на + продукт додається i + міняється на -
        //також є кнопки в меню add, dell, при їх використанні + - міняються
        //якщо продукт доданий до списку, при
        //реалізація на сервері взалежності чи продукт в базі чи ні він дод або видаляється;
        //символ з + на - (кнопка з add на del) на клієнті  змінюється лише після успішного виконання на сервері
        //може дод ще якусь перевірку?
        $.get('/history/add_to_list/?id='+id, function(data) {
            if(data.flag == 'true') {
                $('.product_'+id).find('div').removeClass('icon-minus');
                $('.product_'+id).find('div').addClass('icon-plus');
                
                //повідомлення про внесення змін
                 $('#for_alert').html('you delete ')
                if(bool) {
                   $('#button_'+ id).val('delete');
                }
                else {
                     that.val('delete');
                }
            }
            else {
                $('.product_'+id).find('div').removeClass('icon-plus');
                $('.product_'+id).find('div').addClass('icon-minus');
                
                $('#for_alert').html('you add');
                //повідомлення про внесення змін
                if(bool) {
                    $('#button_'+ id).val('add');
                }
                else {
                    that.val('add');
                }
            }
        })
    }
   
    // work with circles 
    $.get('/history/prices',function(data) {
        priceMass = data;
        count_circle_sizes();
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
