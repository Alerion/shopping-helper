$(document).ready(function() {
    $('.choose_list p').click(function() {
        $(this).fadeOut();
    });

    if ($(".items_of_buylist > .product-item").length > 0) {
        $('.buy-products').show();
    } else {
        $('.items_of_buylist').html('<p class="no_products">'
                        + 'There are no products in your list. Please add.' +
                        '</p>');
        $('.buy-products').hide();
    }
});

jQuery(function($) {
        $('.items_of_buylist').delegate('.remove-product', 'click', function() {
            $(this).parent().fadeOut();
            var $this = $(this);
            var product_id = $this.data('product-id');
            $.post(URLS.REMOVE_ITEM,{'product_id':product_id},function(){
                $this.parents('.product-item').remove();
                if ($(".items_of_buylist > .product-item").length == 0) {
                    $('.buy-products').fadeOut(400, function() {
                        $('.items_of_buylist').html('<p class="no_products">'
                        + 'There are no products in your list. Please add.' +
                        '</p>');

                    });
                }
            })
        });

        $('.choose-item, .suggested-products p').on('click',function(){
            var $this = $(this);
            var product_id = $this.data('product-id');
            var product_icon = $this.data('item-icon');
            $.post(URLS.ADD_ITEM,{'product_id':product_id},function(response){
                $(".items_of_buylist").prepend(
                    '<p class="product-item" data-item-icon="' +
                     product_icon +
                     '">' +
                     ' <img class="icon-animation" src="' + product_icon + '" />' +
                    '<span class="pdf">' + ' ' +
                    response + ' ' +
                     '</span>' +
                    '<i data-product-id="'+
                    product_id +
                    '" class="icon-remove-circle remove-product"></i></p>'
                );
                if ($(".items_of_buylist > .product-item").length > 0) {
                    $('.no_products').remove();
                    $('.buy-products').show();
                }
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
                        doc.setFontSize(15);
                        doc.text(20, 30 + i*10, (list[i].innerHTML.toString()).toLowerCase());
                    }
                    doc.output('dataurlnewwindow');

                }
            $.post(URLS.BUY_ITEMS,function() {
                location.reload();
            })
        })

        $('.buy-products').on('click',function() {
            $(".product-item").remove();
            $('.buy-products').hide();
            $('.no_products').show();
        })

        $('.submit_button').on('click',function() {
            var list = $('.listprod-item');
            var list1 = $('.pdf');
            var curr_to_add = $('#id_name').val();
            console.log(curr_to_add.toString())
            var already_in_list = 0;

            for(var i = 0; i < list.length; i++)
            {
               if(list[i].innerHTML.toString() == curr_to_add)
                    already_in_list = 1

            }
            for(var i = 0; i < list1.length; i++)
            {
                if(list1[i].innerHTML.toString() == curr_to_add)
                    already_in_list = 1
            }
            if(already_in_list == 1)
            {
                alert('You already have this product')
            }
        })
        $('.choose_for_info').mouseover(function(){
            $('.listprod-item').tooltip({
                placement: 'right',
                html : 'true',
                delay: { show: 500, hide: 100 }
            })

        })
    });
