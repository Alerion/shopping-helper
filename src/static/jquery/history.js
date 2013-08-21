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

	mass=$("#acordionForm input[type='checkbox']:checked")


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
