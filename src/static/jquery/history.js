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

$('.category').change(function(){

  var slDivs = $(".shopping-list");
  if($(this).is(':checked')){ 
    $("#li_category"+this.id).find(".products").prop("checked", true);/*cant get id direct, need use prop. Why ?*/
  }
  else{ $("#li_category"+this.id).find(".products").prop("checked", false);
  }
})


$('.products').change(function(){

  var id = $(this).attr('id')
  var n = id.indexOf('_')
  var categoryId = id.slice(0,n)
  var p = $('.products')

  //TODO:for some reason products in checkbox menu and timeline have different IDs
  var productId = Number(id.slice(n+1));

  var reg = new RegExp('^'+productId+'_[0-9]+$') 
  
  //id of product list item
  var liId = '.product_' + productId;

  var blockElements = 0;


  if($(this).is(':checked')){

    $('#'+categoryId).prop("checked", true);
    $(liId).show();
    blockElements++;
 //do we need to show shopping list?
    if (blockElements > 0){
        //$(slDiv).show();
    }
    //divs containing our shopping list
   var slDivs = $(".shopping-list");  
    for (var i=0;i<slDivs.length;i++){

        var sl_products= $("#"+slDivs[i].id).find(".product:visible");
        if (sl_products.length == 0){
            $("#"+slDivs[i].id).show();
        }

    }

  }
  else{
      //hide unchecked product
    $(liId).hide();

   //are there visible products in shopping list
    
   //divs containing our shopping list
   var slDivs = $(".shopping-list");  

    for (var i=0;i<slDivs.length;i++){

        var sl_products= $("#"+slDivs[i].id).find(".product:visible");
        if (sl_products.length == 0){
            $("#"+slDivs[i].id).hide();
        }

    }


      //when all bolock uncheked
    if ($('#ul_products_'+categoryId).find("input:checkbox:checked").length == 0 ){
          $('input[name=ch_category_'+categoryId+"]").prop("checked", false);
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

$.get('/history/information/', function(data) {
  alert(data)

})

})
