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

	mass=$("#acordionForm input[type='checkbox']:checked")












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
