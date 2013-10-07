$(function(){
    $('.a-popup').hide();
    if (!navigator.cookieEnabled) {
        alert('To correctly switch styles turn on your cookies');
    }

        var style1_gradient_blue1='-moz-linear-gradient(-45deg, rgba(224,243,250,1) 0%, rgba(216,240,252,0.5) 50%, rgba(184,226,246,0.49) 51%, rgba(182,223,253,0) 100%);';
        var style1_gradient_blue2='-webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(224,243,250,1)), color-stop(50%,rgba(216,240,252,0.5)), color-stop(51%,rgba(184,226,246,0.49)), color-stop(100%,rgba(182,223,253,0)));';
        var style1_gradient_blue3='-webkit-linear-gradient(-45deg, rgba(224,243,250,1) 0%,rgba(216,240,252,0.5) 50%,rgba(184,226,246,0.49) 51%,rgba(182,223,253,0) 100%);';
        var style1_gradient_blue4='-o-linear-gradient(-45deg, rgba(224,243,250,1) 0%,rgba(216,240,252,0.5) 50%,rgba(184,226,246,0.49) 51%,rgba(182,223,253,0) 100%);';
        var style1_gradient_blue5='-ms-linear-gradient(-45deg, rgba(224,243,250,1) 0%,rgba(216,240,252,0.5) 50%,rgba(184,226,246,0.49) 51%,rgba(182,223,253,0) 100%';
        var style1_gradient_blue6='linear-gradient(135deg, rgba(224,243,250,1) 0%,rgba(216,240,252,0.5) 50%,rgba(184,226,246,0.49) 51%,rgba(182,223,253,0) 100%';

       var style1_gradient_green1='-moz-linear-gradient(-45deg, rgba(230,240,163,1) 0%, rgba(210,230,56,0.77) 50%, rgba(218,239,66,0.54) 51%, rgba(219,240,67,0.54) 100%);';
        var style1_gradient_green2='-webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(230,240,163,1)), color-stop(50%,rgba(210,230,56,0.77)), color-stop(51%,rgba(218,239,66,0.54)), color-stop(100%,rgba(219,240,67,0.54)));';
        var style1_gradient_green3='-webkit-linear-gradient(-45deg, rgba(230,240,163,1) 0%,rgba(210,230,56,0.77) 50%,rgba(218,239,66,0.54) 51%,rgba(219,240,67,0.54) 100%);';
        var style1_gradient_green4='-o-linear-gradient(-45deg, rgba(230,240,163,1) 0%,rgba(210,230,56,0.77) 50%,rgba(218,239,66,0.54) 51%,rgba(219,240,67,0.54) 100%);';
        var style1_gradient_green5='-ms-linear-gradient(-45deg, rgba(230,240,163,1) 0%,rgba(210,230,56,0.77) 50%,rgba(218,239,66,0.54) 51%,rgba(219,240,67,0.54) 100%';
        var style1_gradient_green6='linear-gradient(135deg, rgba(230,240,163,1) 0%,rgba(210,230,56,0.77) 50%,rgba(218,239,66,0.54) 51%,rgba(219,240,67,0.54) 100%';

        var style1_gradient_purple1='-moz-linear-gradient(-45deg, rgba(252,236,252,1) 0%, rgba(251,166,225,0.63) 50%, rgba(253,137,215,0.62) 51%, rgba(255,124,216,0.27) 100%);';
        var style1_gradient_purple2='-webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(252,236,252,1)), color-stop(50%,rgba(251,166,225,0.63)), color-stop(51%,rgba(253,137,215,0.62)), color-stop(100%,rgba(255,124,216,0.27)));';
        var style1_gradient_purple3='-webkit-linear-gradient(-45deg, rgba(252,236,252,1) 0%,rgba(251,166,225,0.63) 50%,rgba(253,137,215,0.62) 51%,rgba(255,124,216,0.27) 100%);';
        var style1_gradient_purple4='-o-linear-gradient(-45deg, rgba(252,236,252,1) 0%,rgba(251,166,225,0.63) 50%,rgba(253,137,215,0.62) 51%,rgba(255,124,216,0.27) 100%);';
        var style1_gradient_purple5='-ms-linear-gradient(-45deg, rgba(252,236,252,1) 0%,rgba(251,166,225,0.63) 50%,rgba(253,137,215,0.62) 51%,rgba(255,124,216,0.27) 100%';
        var style1_gradient_purple6='linear-gradient(135deg, rgba(252,236,252,1) 0%,rgba(251,166,225,0.63) 50%,rgba(253,137,215,0.62) 51%,rgba(255,124,216,0.27) 100%';

        var style_all_product =0;
        var style_add_product=0;
        var style_buy_list=0;
    function CookieCompare(){
    if(getCookie('style_all_product')==1)
    {
      $('.all-products-style1').css('border','3px solid mediumpurple')
        $('.all-products-style2').css('border','3px solid #DCE3E6')
        $('.all-products-style3').css('border','3px solid #DCE3E6')
        $('.choose_list').css('background',style1_gradient_blue1);
        $('.choose_list').css('background',style1_gradient_blue2);
        $('.choose_list').css('background',style1_gradient_blue3);
        $('.choose_list').css('background',style1_gradient_blue4);
        $('.choose_list').css('background',style1_gradient_blue5);
        $('.choose_list').css('background',style1_gradient_blue6);
        $('.choose_list').css('color','#000000');
        $('.choose_list').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1 ');
    }
    if(getCookie('style_all_product')==2)
    {
            $('.all-products-style1').css('border','3px solid #DCE3E6')
        $('.all-products-style2').css('border','3px solid mediumpurple')
        $('.all-products-style3').css('border','3px solid #DCE3E6')
        $('.choose_list').css('background',style1_gradient_green1);
        $('.choose_list').css('background',style1_gradient_green2);
        $('.choose_list').css('background',style1_gradient_green3);
        $('.choose_list').css('background',style1_gradient_green4);
        $('.choose_list').css('background',style1_gradient_green5);
        $('.choose_list').css('background',style1_gradient_green6);
        $('.choose_list').css('color','#000000');
        $('.choose_list').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#90d53b'+', endColorstr='+'#6b6cbc0a'+',GradientType=1 );');

    }
    if(getCookie('style_all_product')==3)
    {        $('.all-products-style1').css('border','3px solid #DCE3E6')
        $('.all-products-style2').css('border','3px solid #DCE3E6')
        $('.all-products-style3').css('border','3px solid mediumpurple')
        $('.choose_list').css('background',style1_gradient_purple1);
        $('.choose_list').css('background',style1_gradient_purple2);
        $('.choose_list').css('background',style1_gradient_purple3);
        $('.choose_list').css('background',style1_gradient_purple4);
        $('.choose_list').css('background',style1_gradient_purple5);
        $('.choose_list').css('background',style1_gradient_purple6);
        $('.choose_list').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');
        $('.choose_list').css('color','#000000');}
    if(getCookie('style_add_product')==1)
    {   $('.add-products-style1').css('border','3px solid mediumpurple')
        $('.add-products-style2').css('border','3px solid #DCE3E6')
        $('.add-products-style3').css('border','3px solid #DCE3E6')
        $('.add_form').css('background',style1_gradient_blue1);
        $('.add_form').css('background',style1_gradient_blue2);
        $('.add_form').css('background',style1_gradient_blue3);
        $('.add_form').css('background',style1_gradient_blue4);
        $('.add_form').css('background',style1_gradient_blue5);
        $('.add_form').css('background',style1_gradient_blue6);
        $('.add_form').css('color','#000000');
        $('.add_form').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1 ');}
    if(getCookie('style_add_product')==2)
    {    $('.add-products-style1').css('border','3px solid #DCE3E6')
        $('.add-products-style2').css('border','3px solid mediumpurple')
        $('.add-products-style3').css('border','3px solid #DCE3E6')
        $('.add_form').css('background',style1_gradient_green1);
        $('.add_form').css('background',style1_gradient_green2);
        $('.add_form').css('background',style1_gradient_green3);
        $('.add_form').css('background',style1_gradient_green4);
        $('.add_form').css('background',style1_gradient_green5);
        $('.add_form').css('background',style1_gradient_green6);
        $('.add_form').css('color','#000000');
        $('.add_form').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#90d53b'+', endColorstr='+'#6b6cbc0a'+',GradientType=1 );');}
    if(getCookie('style_add_product')==3)
    {    $('.add-products-style1').css('border','3px solid #DCE3E6')
        $('.add-products-style2').css('border','3px solid #DCE3E6')
        $('.add-products-style3').css('border','3px solid mediumpurple')
        $('.add_form').css('background',style1_gradient_purple1);
        $('.add_form').css('background',style1_gradient_purple2);
        $('.add_form').css('background',style1_gradient_purple3);
        $('.add_form').css('background',style1_gradient_purple4);
        $('.add_form').css('background',style1_gradient_purple5);
        $('.add_form').css('background',style1_gradient_purple6);
        $('.add_form').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');
        $('.add_form').css('color','#000000');}
    if(getCookie('style_buy_list')==1)
    {$('.buylist-products-style1').css('border','3px solid mediumpurple')
        $('.buylist-products-style2').css('border','3px solid #DCE3E6')
        $('.buylist-products-style3').css('border','3px solid #DCE3E6')
        $('.items_of_buylist').css('background',style1_gradient_blue1);
        $('.items_of_buylist').css('background',style1_gradient_blue2);
        $('.items_of_buylist').css('background',style1_gradient_blue3);
        $('.items_of_buylist').css('background',style1_gradient_blue4);
        $('.items_of_buylist').css('background',style1_gradient_blue5);
        $('.items_of_buylist').css('background',style1_gradient_blue6);
        $('.items_of_buylist').css('color','#000000');
        $('.items_of_buylist').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1 ');}
    if(getCookie('style_buy_list')==2)
    {    $('.buylist-products-style1').css('border','3px solid #DCE3E6')
        $('.buylist-products-style2').css('border','3px solid mediumpurple')
        $('.buylist-products-style3').css('border','3px solid #DCE3E6')
        $('.items_of_buylist').css('background',style1_gradient_green1);
        $('.items_of_buylist').css('background',style1_gradient_green2);
        $('.items_of_buylist').css('background',style1_gradient_green3);
        $('.items_of_buylist').css('background',style1_gradient_green4);
        $('.items_of_buylist').css('background',style1_gradient_green5);
        $('.items_of_buylist').css('background',style1_gradient_green6);
        $('.items_of_buylist').css('color','#000000');
        $('.items_of_buylist').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#90d53b'+', endColorstr='+'#6b6cbc0a'+',GradientType=1 );');}
    if(getCookie('style_buy_list')==3)
    {    $('.buylist-products-style1').css('border','3px solid #DCE3E6')
        $('.buylist-products-style2').css('border','3px solid #DCE3E6')
        $('.buylist-products-style3').css('border','3px solid mediumpurple')
        $('.items_of_buylist').css('background',style1_gradient_purple1);
        $('.items_of_buylist').css('background',style1_gradient_purple2);
        $('.items_of_buylist').css('background',style1_gradient_purple3);
        $('.items_of_buylist').css('background',style1_gradient_purple4);
        $('.items_of_buylist').css('background',style1_gradient_purple5);
        $('.items_of_buylist').css('background',style1_gradient_purple6);
        $('.items_of_buylist').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');
        $('.items_of_buylist').css('color','#000000');}
    }
    CookieCompare();
    if(getCookie('text')=='Nunito')
         $('body').css('font-family',"Nunito, arial, verdana")
    if(getCookie('text')=='Lily Script One')
         $('body').css('font-family',"'Lily Script One'")
    if(getCookie('text')=='Comic Sans MS')
         $('body').css('font-family',"'Comic Sans MS', cursive, sans-serif")
    if(getCookie('text')=='Georgia')
         $('body').css('font-family',"'Georgia',serif")
    if(getCookie('text')=='Courier New')
         $('body').css('font-family',"'Courier New', Courier, monospace")
    $('.a_popup_trigger').on('click',function(){
        //'Lily Script One', cursive;
        //"Comic Sans MS", cursive, sans-serif
        //'Georgia', serif
        //"Courier New", Courier, monospace


        $('.submit_change_style').on('click',function(){
            $('.a-popup').hide();
            if(style_all_product != 0)
                setCookie('style_all_product',style_all_product)
            if(style_add_product != 0)
                setCookie('style_add_product',style_add_product)
            if(style_buy_list != 0)
                setCookie('style_buy_list',style_buy_list)
            setCookie('text',$(".dropdown option:selected").text())


        })

        $('.cancel_change_style').on('click',function(){
            $('.a-popup').hide();
            CookieCompare();

        })
        $('.default_change_style').on('click',function(){
            $('.a-popup').hide();
            $('body').css('font-family','Nunito, arial, verdana')
            $('.items_of_buylist').css('background-color','#ABCCAB')
            $('.add_form').css('background-color','#ABCCAB');
            $('.choose-list').css('background-color','#6BA1BB');
            style_all_product =0;
            style_add_product=0;
            style_buy_list=0;
            setCookie('style_all_product',style_all_product)
            setCookie('style_add_product',style_add_product)
            setCookie('style_buy_list',style_buy_list)
            deleteCookie('style_all_product');
            deleteCookie('style_add_product');
            deleteCookie('style_buy_list');

        })


        $('.a-popup').show();
        if($(".dropdown").find('option').length == 0){
                         $(".dropdown").append(
                             "<option value="+"Nunito"+">Nunito</option>"+
                             "<option value="+"Comic Sans MS"+">Comic Sans MS</option>"+
                             "<option value="+"Lily Script One"+">Lily Script One</option>"+
                             "<option value="+"Georgia"+">Georgia</option>"+
                             "<option value="+"Courier New"+">Courier New</option>")
                    }
        $(".dropdown").on('change',function(){
            if($(".dropdown option:selected").text()=='Nunito')
                $('body').css('font-family',"Nunito, arial, verdana")
            if($(".dropdown option:selected").text()=='Lily Script One')
                $('body').css('font-family',"'Lily Script One'")
            if($(".dropdown option:selected").text()=='Comic Sans MS')
                $('body').css('font-family',"'Comic Sans MS', cursive, sans-serif")
            if($(".dropdown option:selected").text()=='Georgia')
                $('body').css('font-family',"'Georgia',serif")
            if($(".dropdown option:selected").text()=='Courier New')
                $('body').css('font-family',"'Courier New', Courier, monospace")
        })
        $('.all-products-style1').css('background',style1_gradient_blue1);
        $('.all-products-style1').css('background',style1_gradient_blue2);
        $('.all-products-style1').css('background',style1_gradient_blue3);
        $('.all-products-style1').css('background',style1_gradient_blue4);
        $('.all-products-style1').css('background',style1_gradient_blue5);
        $('.all-products-style1').css('background',style1_gradient_blue6);
        $('.all-products-style1').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');

        $('.all-products-style2').css('background',style1_gradient_green1);
        $('.all-products-style2').css('background',style1_gradient_green2);
        $('.all-products-style2').css('background',style1_gradient_green3);
        $('.all-products-style2').css('background',style1_gradient_green4);
        $('.all-products-style2').css('background',style1_gradient_green5);
        $('.all-products-style2').css('background',style1_gradient_green6);
        $('.all-products-style2').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');

        $('.all-products-style3').css('background',style1_gradient_purple1);
        $('.all-products-style3').css('background',style1_gradient_purple2);
        $('.all-products-style3').css('background',style1_gradient_purple3);
        $('.all-products-style3').css('background',style1_gradient_purple4);
        $('.all-products-style3').css('background',style1_gradient_purple5);
        $('.all-products-style3').css('background',style1_gradient_purple6);
        $('.all-products-style3').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');

        $('.add-products-style1').css('background',style1_gradient_blue1);
        $('.add-products-style1').css('background',style1_gradient_blue2);
        $('.add-products-style1').css('background',style1_gradient_blue3);
        $('.add-products-style1').css('background',style1_gradient_blue4);
        $('.add-products-style1').css('background',style1_gradient_blue5);
        $('.add-products-style1').css('background',style1_gradient_blue6);
        $('.add-products-style1').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');

        $('.add-products-style2').css('background',style1_gradient_green1);
        $('.add-products-style2').css('background',style1_gradient_green2);
        $('.add-products-style2').css('background',style1_gradient_green3);
        $('.add-products-style2').css('background',style1_gradient_green4);
        $('.add-products-style2').css('background',style1_gradient_green5);
        $('.add-products-style2').css('background',style1_gradient_green6);
        $('.add-products-style2').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');

        $('.add-products-style3').css('background',style1_gradient_purple1);
        $('.add-products-style3').css('background',style1_gradient_purple2);
        $('.add-products-style3').css('background',style1_gradient_purple3);
        $('.add-products-style3').css('background',style1_gradient_purple4);
        $('.add-products-style3').css('background',style1_gradient_purple5);
        $('.add-products-style3').css('background',style1_gradient_purple6);
        $('.add-products-style3').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');

        $('.buylist-products-style1').css('background',style1_gradient_blue1);
        $('.buylist-products-style1').css('background',style1_gradient_blue2);
        $('.buylist-products-style1').css('background',style1_gradient_blue3);
        $('.buylist-products-style1').css('background',style1_gradient_blue4);
        $('.buylist-products-style1').css('background',style1_gradient_blue5);
        $('.buylist-products-style1').css('background',style1_gradient_blue6);
        $('.buylist-products-style1').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');

        $('.buylist-products-style2').css('background',style1_gradient_green1);
        $('.buylist-products-style2').css('background',style1_gradient_green2);
        $('.buylist-products-style2').css('background',style1_gradient_green3);
        $('.buylist-products-style2').css('background',style1_gradient_green4);
        $('.buylist-products-style2').css('background',style1_gradient_green5);
        $('.buylist-products-style2').css('background',style1_gradient_green6);
        $('.buylist-products-style2').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');

        $('.buylist-products-style3').css('background',style1_gradient_purple1);
        $('.buylist-products-style3').css('background',style1_gradient_purple2);
        $('.buylist-products-style3').css('background',style1_gradient_purple3);
        $('.buylist-products-style3').css('background',style1_gradient_purple4);
        $('.buylist-products-style3').css('background',style1_gradient_purple5);
        $('.buylist-products-style3').css('background',style1_gradient_purple6);
        $('.buylist-products-style3').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');


    })
    //For choose-list
    $('.all-products-style1').on('click',function(){
        $('.choose_list').fadeOut('slow');
        $('.all-products-style1').css('border','3px solid mediumpurple')
        $('.all-products-style2').css('border','3px solid #DCE3E6')
        $('.all-products-style3').css('border','3px solid #DCE3E6')
        $('.choose_list').css('background',style1_gradient_blue1);
        $('.choose_list').css('background',style1_gradient_blue2);
        $('.choose_list').css('background',style1_gradient_blue3);
        $('.choose_list').css('background',style1_gradient_blue4);
        $('.choose_list').css('background',style1_gradient_blue5);
        $('.choose_list').css('background',style1_gradient_blue6);
        $('.choose_list').css('color','#000000');
        $('.choose_list').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1 ');
        $('.choose_list').fadeIn('slow');
        style_all_product =1;
    })

    $('.all-products-style2').on('click',function(){
        $('.choose_list').fadeOut('slow');
        $('.all-products-style1').css('border','3px solid #DCE3E6')
        $('.all-products-style2').css('border','3px solid mediumpurple')
        $('.all-products-style3').css('border','3px solid #DCE3E6')
        $('.choose_list').css('background',style1_gradient_green1);
        $('.choose_list').css('background',style1_gradient_green2);
        $('.choose_list').css('background',style1_gradient_green3);
        $('.choose_list').css('background',style1_gradient_green4);
        $('.choose_list').css('background',style1_gradient_green5);
        $('.choose_list').css('background',style1_gradient_green6);
        $('.choose_list').css('color','#000000');
        $('.choose_list').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#90d53b'+', endColorstr='+'#6b6cbc0a'+',GradientType=1 );');
        $('.choose_list').fadeIn('slow');
        style_all_product =2;
    })

    $('.all-products-style3').on('click',function(){
        $('.choose_list').fadeOut('slow');
        $('.all-products-style1').css('border','3px solid #DCE3E6')
        $('.all-products-style2').css('border','3px solid #DCE3E6')
        $('.all-products-style3').css('border','3px solid mediumpurple')
        $('.choose_list').css('background',style1_gradient_purple1);
        $('.choose_list').css('background',style1_gradient_purple2);
        $('.choose_list').css('background',style1_gradient_purple3);
        $('.choose_list').css('background',style1_gradient_purple4);
        $('.choose_list').css('background',style1_gradient_purple5);
        $('.choose_list').css('background',style1_gradient_purple6);
        $('.choose_list').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');
        $('.choose_list').css('color','#000000');
        $('.choose_list').fadeIn('slow');
        style_all_product =3;
    })
    //For add-product
    $('.add-products-style1').on('click',function(){
        $('.add_form').fadeOut('slow');
        $('.add-products-style1').css('border','3px solid mediumpurple')
        $('.add-products-style2').css('border','3px solid #DCE3E6')
        $('.add-products-style3').css('border','3px solid #DCE3E6')
        $('.add_form').css('background',style1_gradient_blue1);
        $('.add_form').css('background',style1_gradient_blue2);
        $('.add_form').css('background',style1_gradient_blue3);
        $('.add_form').css('background',style1_gradient_blue4);
        $('.add_form').css('background',style1_gradient_blue5);
        $('.add_form').css('background',style1_gradient_blue6);
        $('.add_form').css('color','#000000');
        $('.add_form').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1 ');
        $('.add_form').fadeIn('slow');
        style_add_product =1;
    })

    $('.add-products-style2').on('click',function(){
        $('.add_form').fadeOut('slow');
        $('.add-products-style1').css('border','3px solid #DCE3E6')
        $('.add-products-style2').css('border','3px solid mediumpurple')
        $('.add-products-style3').css('border','3px solid #DCE3E6')
        $('.add_form').css('background',style1_gradient_green1);
        $('.add_form').css('background',style1_gradient_green2);
        $('.add_form').css('background',style1_gradient_green3);
        $('.add_form').css('background',style1_gradient_green4);
        $('.add_form').css('background',style1_gradient_green5);
        $('.add_form').css('background',style1_gradient_green6);
        $('.add_form').css('color','#000000');
        $('.add_form').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#90d53b'+', endColorstr='+'#6b6cbc0a'+',GradientType=1 );');
        $('.add_form').fadeIn('slow');
        style_add_product =2;
    })

    $('.add-products-style3').on('click',function(){
        $('.add_form').fadeOut('slow');
        $('.add-products-style1').css('border','3px solid #DCE3E6')
        $('.add-products-style2').css('border','3px solid #DCE3E6')
        $('.add-products-style3').css('border','3px solid mediumpurple')
        $('.add_form').css('background',style1_gradient_purple1);
        $('.add_form').css('background',style1_gradient_purple2);
        $('.add_form').css('background',style1_gradient_purple3);
        $('.add_form').css('background',style1_gradient_purple4);
        $('.add_form').css('background',style1_gradient_purple5);
        $('.add_form').css('background',style1_gradient_purple6);
        $('.add_form').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');
        $('.add_form').css('color','#000000');
        $('.add_form').fadeIn('slow');
        style_add_product =3;
    })
    //For all current products
    $('.buylist-products-style1').on('click',function(){
        $('.items_of_buylist').fadeOut('slow');
        $('.buylist-products-style1').css('border','3px solid mediumpurple')
        $('.buylist-products-style2').css('border','3px solid #DCE3E6')
        $('.buylist-products-style3').css('border','3px solid #DCE3E6')
        $('.items_of_buylist').css('background',style1_gradient_blue1);
        $('.items_of_buylist').css('background',style1_gradient_blue2);
        $('.items_of_buylist').css('background',style1_gradient_blue3);
        $('.items_of_buylist').css('background',style1_gradient_blue4);
        $('.items_of_buylist').css('background',style1_gradient_blue5);
        $('.items_of_buylist').css('background',style1_gradient_blue6);
        $('.items_of_buylist').css('color','#000000');
        $('.items_of_buylist').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1 ');
        $('.items_of_buylist').fadeIn('slow');
        style_buy_list =1;
    })

    $('.buylist-products-style2').on('click',function(){
        $('.items_of_buylist').fadeOut('slow');
        $('.buylist-products-style1').css('border','3px solid #DCE3E6')
        $('.buylist-products-style2').css('border','3px solid mediumpurple')
        $('.buylist-products-style3').css('border','3px solid #DCE3E6')
        $('.items_of_buylist').css('background',style1_gradient_green1);
        $('.items_of_buylist').css('background',style1_gradient_green2);
        $('.items_of_buylist').css('background',style1_gradient_green3);
        $('.items_of_buylist').css('background',style1_gradient_green4);
        $('.items_of_buylist').css('background',style1_gradient_green5);
        $('.items_of_buylist').css('background',style1_gradient_green6);
        $('.items_of_buylist').css('color','#000000');
        $('.items_of_buylist').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#90d53b'+', endColorstr='+'#6b6cbc0a'+',GradientType=1 );');
        $('.items_of_buylist').fadeIn('slow');
        style_buy_list =2;
    })

    $('.buylist-products-style3').on('click',function(){
        $('.items_of_buylist').fadeOut('slow');
        $('.buylist-products-style1').css('border','3px solid #DCE3E6')
        $('.buylist-products-style2').css('border','3px solid #DCE3E6')
        $('.buylist-products-style3').css('border','3px solid mediumpurple')
        $('.items_of_buylist').css('background',style1_gradient_purple1);
        $('.items_of_buylist').css('background',style1_gradient_purple2);
        $('.items_of_buylist').css('background',style1_gradient_purple3);
        $('.items_of_buylist').css('background',style1_gradient_purple4);
        $('.items_of_buylist').css('background',style1_gradient_purple5);
        $('.items_of_buylist').css('background',style1_gradient_purple6);
        $('.items_of_buylist').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');
        $('.items_of_buylist').css('color','#000000');
        $('.items_of_buylist').fadeIn('slow');
        style_buy_list =3;
    })

    function setCookie(name, value, options) {
          options = options || {};
          var expires = options.expires;
          if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires*1000);
            expires = options.expires = d;
          }
          if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
          }
          value = encodeURIComponent(value);
          var updatedCookie = name + "=" + value;
          for(var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
              updatedCookie += "=" + propValue;
             }
          }
          document.cookie = updatedCookie;
    }

    function getCookie(name) {
          var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
          return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function deleteCookie(name) {
        setCookie(name, "", { expires: -1 })
    }


})