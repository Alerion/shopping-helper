$(function(){
    $('.a-popup').hide();
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

    $('.a_popup_trigger').on('click',function(){
        //'Lily Script One', cursive;
        //"Comic Sans MS", cursive, sans-serif
        //'Georgia', serif
        //"Courier New", Courier, monospace
        $('.a-popup').show();
        if($(".dropdown").find('option').length == 0){
                         $(".dropdown").append(
                             "<option value="+"Comic Sans MS"+">Comic Sans MS</option>"+
                             "<option value="+"Lily Script One"+">Lily Script One</option>"+
                             "<option value="+"Georgia"+">Georgia</option>"+
                             "<option value="+"Courier New"+">Courier New</option>")
                    }
        $(".dropdown").on('change',function(){
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
    })

    $('.all-products-style2').on('click',function(){
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
    })

    $('.all-products-style3').on('click',function(){
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
    })
    //For add-product
        $('.add-products-style1').on('click',function(){
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
    })

    $('.add-products-style2').on('click',function(){
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
    })

    $('.add-products-style3').on('click',function(){
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
    })
    //For all current products
    $('.buylist-products-style1').on('click',function(){
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
    })

    $('.buylist-products-style2').on('click',function(){
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
    })

    $('.buylist-products-style3').on('click',function(){
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
    })

})