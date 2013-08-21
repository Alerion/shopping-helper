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
    if(reg.test(p[i].id)){(p[i]).checked=true }
    }

  }
  else{ for(var i=0;i<p.length;i++){
    if(reg.test(p[i].id)){(p[i]).checked=false}
    }
  }
})


$('.products').change(function(){
  var id=$(this).attr('id')
  var n = id.indexOf('_')
  var categoryId = id.slice(0,n)
  var p = $('.products')
  var productId = id.slice(n+1)
  var reg = new RegExp('^'+productId+'_[0-9]+$') 

  if($(this).is(':checked')){
    $('#'+categoryId).prop("checked", true);
  }
    else 
  {
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
           success: function(data)
           {
               alert(data); 
           },
        
         });

    return false; 
});
})
