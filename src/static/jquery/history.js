/*jQuery time*/
//loop trought shopping list

$(document).ready(function(){

    $("#accordian h3").click(function(){
    		//slide up all the link lists
    		$("#accordian ul ul").slideUp();
    		//slide down the link list below the h3 clicked - only if its closed
    		if(!$(this).next().is(":visible"))
    		{
    			$(this).next().slideDown();
    		}
    	})


    function hideEmpty(){

        var slDivs = $(".shopping-list"); 
        for (var i = 0; i < slDivs.length; i++) {
            var sl_products = $("#"+slDivs[i].id).find(".product:visible");
            if (sl_products.length == 0){
            $("#"+slDivs[i].id).hide();
            }
        }
    }

    $('.category').change(function(){

        var slDivs = $(".shopping-list");
        var products = $("#li_category"+this.id).find(".products")
        var prodId = []
        var n
        var id
        for (var i = 0; i < products.length; i++) {
            id = products[i].id
            n = id.indexOf('_')
            prodId.push(id.slice(n+1))
        }
        
        if ($(this).is(':checked')) {
            products.prop("checked", true);/*cant get id direct, need use prop. Why ?*/
            for (var j = 0; j< prodId.length; j++) {
            $('.product_' + prodId[j]).show();
            }
        } else { products.prop("checked", false);
            for (var j = 0; j< prodId.length; j++){
            $('.product_' + prodId[j]).hide();
        } 
        hideEmpty();
        }
    })
    

    $('.products').change(function(){
        var id = $(this).attr('id')
        var n = id.indexOf('_')
        var categoryId = id.slice(0,n)
        var p = $('.products')

        //TODO:for some reason products in checkbox menu and timeline have different IDs
        var productId =id.slice(n+1);

        //id of product list item
        var liId = '.product_' + productId; 
        //var slDivs = $(".shopping-list"); 
        if ($(this).is(':checked')) {
            $('#'+categoryId).prop("checked", true);//check outer checkbox
            $(liId).show();
        } else {
            //hide unchecked product
            $(liId).hide();
            hideEmpty();
            //when all bolock uncheked
            if ($('#ul_products_'+categoryId).find("input:checkbox:checked").length == 0 ) {
                $('#'+categoryId).prop("checked", false);
            }    
        }
    })


     $("#list_button").click(function() {

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
    });

    $.get('/history/information', function(data) {

      //alert(data.olena)

    })

})
