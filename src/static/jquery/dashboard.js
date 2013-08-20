$(document).ready(function() {
    $('.choose_list').delay(300).fadeIn();
    $('.choose_list p').click(function() {
        $(this).fadeOut();
    });
});