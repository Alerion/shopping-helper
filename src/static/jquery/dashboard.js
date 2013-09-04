$(document).ready(function() {
    $('.choose_list').delay(300).fadeIn();
    $('.add_form').delay(600).fadeIn();
    $('.choose_list p').click(function() {
        $(this).fadeOut();
    });
    $('.selector').delegate('.remove-product', 'click', function() {
        $(this).parent().fadeOut();
    });
});