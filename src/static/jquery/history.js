/*jQuery time*/
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

$('.category_checkbox').change(function(){
  var id=Number($(this).attr('id'));
  var reg = new RegExp('^'+id+'_[0-9]+$') 
  var p =$('.products')
  if($(this).is(':checked')){for(i=0;i<p.length;i++){
    if(reg.test(p[i].id)){(p[i]).checked=true }
    }

  }
  else{ for(i=0;i<p.length;i++){
    if(reg.test(p[i].id)){(p[i]).checked=false}
    }
  }
})


$('.products').change(function(){
  var id=$(this).attr('id')
  var n = id.indexOf('_')
  var part1=id.slice(0,n)
  var p =$('.products')
  var part2 = id.slice(n+1)
  var reg = new RegExp('^'+part2+'_[0-9]+$') 
  if($(this).is(':checked')){ $('#'+part1).prop("checked", true);
  }else{

//when all bolock uncheked
  }
})






















 $("#list_button").click(function() {

    var url = "http://127.0.0.1:8000/history/update_timeline"; // the script where you handle the form input.
    var data=$("#acordionForm").serialize();
    $.ajax({
           type: "POST",
           url: url,
           data: data, // serializes the form's elements.
           success: function(data)
           {
               alert(data); // show response from the php script.
           },
        
         });

    return false; // avoid to execute the actual submit of the form.
});
})
