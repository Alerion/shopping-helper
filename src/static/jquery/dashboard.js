$(document).ready(function() {
    $('.choose_list p').click(function() {
        $(this).fadeOut();
    });


});

jQuery(function($) {
        $('.selector').delegate('.remove-product', 'click', function() {
            $(this).parent().fadeOut();
            var $this = $(this);
            var product_id = $this.data('product-id');
            $.post(URLS.REMOVE_ITEM,{'product_id':product_id},function(){
                $this.parents('.product-item').remove();
            })
        });

        $('.choose-item').on('click',function(){
            var $this = $(this);
            var product_id = $this.data('product-id');
            $.post(URLS.ADD_ITEM,{'product_id':product_id},function(response){
                console.log(response);
                $(".items_of_buylist").prepend(

                    '<p class="product-item">'+
                     '<span class = "pdf">'+response+'</span>'+
                    '<i data-product-id="'+
                    product_id +
                    '" class="icon-remove-circle remove-product"></i></p>');
            });
        });

        $('.buy-products').on('click',function(){
            question = confirm('Would you like to get a printable version ?')
            if (question == true){
                var list = document.getElementsByClassName('pdf');
                var doc = new jsPDF();
                doc.text(20, 20, 'What you bought is :');
                for(var i = 0; i < list.length; i++)
                    {
                        //console.log(list[i].firstChild.nodeValue.toString())
                        doc.setFontSize(15);
                        doc.text(20, 30 + i*10, (list[i].innerHTML.toString()).toLowerCase());

                    }
	                doc.output('datauri');
                }
            $.post(URLS.BUY_ITEMS,function() {
                location.reload();


            })
        })

        $('.buy-products').on('click',function() {
                $(".product-item").remove();
        })
    });
