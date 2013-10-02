

jQuery(function($) {
        $('.tab-content').delegate('.remove-product', 'click', function() {
            $(this).parent().fadeOut();
            var $this = $(this);
            var product_id = $this.data('product-id');
            $.post(URLS.REMOVE_ITEM,{'product_id':product_id},function(){
                $this.parents('.product-item').remove();
            })
        });

       
    });
