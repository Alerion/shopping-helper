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
  var id=Number($(this).attr('id'));
  var reg = new RegExp('^'+id+'_[0-9]+$') 
  var p =$('.products')
  if($(this).is(':checked')){for(var i=0;i<p.length;i++){
    if(reg.test(p[i].id)){(p[i]).checked=true;}
    }

  }
  else{ for(var i=0;i<p.length;i++){
    if(reg.test(p[i].id)){(p[i]).checked=false;}
    }
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


  //div containing our shopping list
  var slDivs = $(".shopping-list");
 
  var blockElements = 0;


  if($(this).is(':checked')){

    $('#'+categoryId).prop("checked", true);
    $(liId).show();
    blockElements++;
 //do we need to show shopping list?
    if (blockElements > 0){
        //$(slDiv).show();
    }

  }
  else{
      //hide unchecked product
      $(liId).hide();

    //are there visible products in shopping list
    /*
    for (var i=0;i<slDivs.length;i++){

        var sl_products = $("#"+slDivs[i].id).find(".product");

        for (var m=0;m<sl_products.length;m++){
        
              if (sl_products[m].css("display") == "block"){
                  blockElements++;
     
              }
        }
        //do we need to hide shopping list?
        if (blockElements == 0){
              $("#"+slDivs[i].id).hide();
        }

    }
    */
   

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
