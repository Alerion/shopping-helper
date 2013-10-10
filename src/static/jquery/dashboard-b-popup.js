$(function(){
    $('.a-popup').hide();
    if (!navigator.cookieEnabled) {
        alert('To correctly switch styles turn on your cookies');
    }
        var style_all_product =0;
        var style_add_product=0;
        var style_buy_list=0;
    function CookieCompare(){
    if(getCookie('style_all_product')==1)
    {
      $('.all-products-style1').css('border','3px solid mediumpurple')
        $('.all-products-style2').css('border','3px solid #DCE3E6')
        $('.all-products-style3').css('border','3px solid #DCE3E6')
        $('.choose_list').addClass('style_changer_blue')
        $('.choose_list').css('color','#000000');
        //$('.choose_list').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1 ');
    }
    if(getCookie('style_all_product')==2)
    {
            $('.all-products-style1').css('border','3px solid #DCE3E6')
        $('.all-products-style2').css('border','3px solid mediumpurple')
        $('.all-products-style3').css('border','3px solid #DCE3E6')
        $('.choose_list').addClass('style_changer_green')
        $('.choose_list').css('color','#000000');
        //$('.choose_list').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#90d53b'+', endColorstr='+'#6b6cbc0a'+',GradientType=1 );');

    }
    if(getCookie('style_all_product')==3)
    {        $('.all-products-style1').css('border','3px solid #DCE3E6')
        $('.all-products-style2').css('border','3px solid #DCE3E6')
        $('.all-products-style3').css('border','3px solid mediumpurple')
        $('.choose_list').addClass('style_changer_purple')
        //$('.choose_list').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');
        $('.choose_list').css('color','#000000');}
    if(getCookie('style_add_product')==1)
    {   $('.add-products-style1').css('border','3px solid mediumpurple')
        $('.add-products-style2').css('border','3px solid #DCE3E6')
        $('.add-products-style3').css('border','3px solid #DCE3E6')
        $('.add_form').addClass('style_changer_blue')
        $('.add_form').css('color','#000000');
        //$('.add_form').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1 ');}
    }
    if(getCookie('style_add_product')==2)
    {    $('.add-products-style1').css('border','3px solid #DCE3E6')
        $('.add-products-style2').css('border','3px solid mediumpurple')
        $('.add-products-style3').css('border','3px solid #DCE3E6')
        $('.add_form').addClass('style_changer_green')
        $('.add_form').css('color','#000000');
    }
        //$('.add_form').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#90d53b'+', endColorstr='+'#6b6cbc0a'+',GradientType=1 );');}
    if(getCookie('style_add_product')==3)
    {    $('.add-products-style1').css('border','3px solid #DCE3E6')
        $('.add-products-style2').css('border','3px solid #DCE3E6')
        $('.add-products-style3').css('border','3px solid mediumpurple')
        $('.add_form').addClass('style_changer_purple')
        //$('.add_form').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');
        $('.add_form').css('color','#000000');}
    if(getCookie('style_buy_list')==1)
    {
        $('.buylist-products-style1').css('border','3px solid mediumpurple')

        $('.buylist-products-style2').css('border','3px solid #DCE3E6')
        $('.buylist-products-style3').css('border','3px solid #DCE3E6')
        $('.items_of_buylist').addClass('style_changer_blue')
        $('.items_of_buylist').css('color','#000000');
       // $('.items_of_buylist').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1 ');}
    }
    if(getCookie('style_buy_list')==2)
    {    $('.buylist-products-style1').css('border','3px solid #DCE3E6')
        $('.buylist-products-style2').css('border','3px solid mediumpurple')
        $('.buylist-products-style3').css('border','3px solid #DCE3E6')
        $('.items_of_buylist').addClass('style_changer_green')
        $('.items_of_buylist').css('color','#000000');
    }
        //$('.items_of_buylist').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#90d53b'+', endColorstr='+'#6b6cbc0a'+',GradientType=1 );');}
    if(getCookie('style_buy_list')==3)
    {    $('.buylist-products-style1').css('border','3px solid #DCE3E6')
        $('.buylist-products-style2').css('border','3px solid #DCE3E6')
        $('.buylist-products-style3').css('border','3px solid mediumpurple')
        $('.items_of_buylist').addClass('style_changer_purple')
        //$('.items_of_buylist').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');
        $('.items_of_buylist').css('color','#000000');
    }
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
            $('.add_form').css('background-color','#6BA1BB');
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

        $('.all-products-style2').addClass('style_changer_green')
        $('.all-products-style3').addClass('style_changer_purple')
        $('.all-products-style1').addClass('style_changer_blue')

        $('.add-products-style2').addClass('style_changer_green')
        $('.add-products-style3').addClass('style_changer_purple')
        $('.add-products-style1').addClass('style_changer_blue')

        $('.buylist-products-style2').addClass('style_changer_green')
        $('.buylist-products-style3').addClass('style_changer_purple')
        $('.buylist-products-style1').addClass('style_changer_blue')
//add-products-style2
        //buylist-products-style1


    })
    //For choose-list
    $('.all-products-style1').on('click',function(){
        $('.choose_list').fadeOut('slow');
        $('.all-products-style1').css('border','3px solid mediumpurple')
        $('.all-products-style2').css('border','3px solid #DCE3E6')
        $('.all-products-style3').css('border','3px solid #DCE3E6')
        $('.choose_list').addClass('style_changer_blue')
        $('.choose_list').removeClass('style_changer_green')
        $('.choose_list').removeClass('style_changer_purple')
        $('.choose_list').css('color','#000000');
        //$('.choose_list').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1 ');
        $('.choose_list').fadeIn('slow');
        style_all_product =1;
    })

    $('.all-products-style2').on('click',function(){
        $('.choose_list').fadeOut('slow');
        $('.all-products-style1').css('border','3px solid #DCE3E6')
        $('.all-products-style2').css('border','3px solid mediumpurple')
        $('.all-products-style3').css('border','3px solid #DCE3E6')
        $('.choose_list').addClass('style_changer_green')
        $('.choose_list').removeClass('style_changer_blue')
        $('.choose_list').removeClass('style_changer_purple')
        $('.choose_list').css('color','#000000');
        //$('.choose_list').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#90d53b'+', endColorstr='+'#6b6cbc0a'+',GradientType=1 );');
        $('.choose_list').fadeIn('slow');
        style_all_product =2;
    })

    $('.all-products-style3').on('click',function(){
        $('.choose_list').fadeOut('slow');
        $('.all-products-style1').css('border','3px solid #DCE3E6')
        $('.all-products-style2').css('border','3px solid #DCE3E6')
        $('.all-products-style3').css('border','3px solid mediumpurple')
        $('.choose_list').addClass('style_changer_purple')
        $('.choose_list').removeClass('style_changer_green')
        $('.choose_list').removeClass('style_changer_blue')
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
        $('.add_form').addClass('style_changer_blue')
        $('.add_form').removeClass('style_changer_green')
        $('.add_form').removeClass('style_changer_purple')
        $('.add_form').css('color','#000000');
        //$('.add_form').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1 ');
        $('.add_form').fadeIn('slow');
        style_add_product =1;
    })

    $('.add-products-style2').on('click',function(){
        $('.add_form').fadeOut('slow');
        $('.add-products-style1').css('border','3px solid #DCE3E6')
        $('.add-products-style2').css('border','3px solid mediumpurple')
        $('.add-products-style3').css('border','3px solid #DCE3E6')
        $('.add_form').addClass('style_changer_green')
        $('.add_form').removeClass('style_changer_blue')
        $('.add_form').removeClass('style_changer_purple')
        $('.add_form').css('color','#000000');
        //$('.add_form').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#90d53b'+', endColorstr='+'#6b6cbc0a'+',GradientType=1 );');
        $('.add_form').fadeIn('slow');
        style_add_product =2;
    })

    $('.add-products-style3').on('click',function(){
        $('.add_form').fadeOut('slow');
        $('.add-products-style1').css('border','3px solid #DCE3E6')
        $('.add-products-style2').css('border','3px solid #DCE3E6')
        $('.add-products-style3').css('border','3px solid mediumpurple')
        $('.add_form').addClass('style_changer_purple')
        $('.add_form').removeClass('style_changer_blue')
        $('.add_form').removeClass('style_changer_green')
        //$('.add_form').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');
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
        $('.items_of_buylist').addClass('style_changer_blue')
        $('.items_of_buylist').removeClass('style_changer_green')
        $('.items_of_buylist').removeClass('style_changer_purple')
        $('.items_of_buylist').css('color','#000000');
        //$('.items_of_buylist').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1 ');
        $('.items_of_buylist').fadeIn('slow');
        style_buy_list =1;
    })

    $('.buylist-products-style2').on('click',function(){
        $('.items_of_buylist').fadeOut('slow');
        $('.buylist-products-style1').css('border','3px solid #DCE3E6')
        $('.buylist-products-style2').css('border','3px solid mediumpurple')
        $('.buylist-products-style3').css('border','3px solid #DCE3E6')
        $('.items_of_buylist').addClass('style_changer_green')
        $('.items_of_buylist').removeClass('style_changer_blue')
        $('.items_of_buylist').removeClass('style_changer_purple')
        $('.items_of_buylist').css('color','#000000');
        //$('.items_of_buylist').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#90d53b'+', endColorstr='+'#6b6cbc0a'+',GradientType=1 );');
        $('.items_of_buylist').fadeIn('slow');
        style_buy_list =2;
    })

    $('.buylist-products-style3').on('click',function(){
        $('.items_of_buylist').fadeOut('slow');
        $('.buylist-products-style1').css('border','3px solid #DCE3E6')
        $('.buylist-products-style2').css('border','3px solid #DCE3E6')
        $('.buylist-products-style3').css('border','3px solid mediumpurple')
        $('.items_of_buylist').addClass('style_changer_purple')
        $('.items_of_buylist').removeClass('style_changer_green')
        $('.items_of_buylist').removeClass('style_changer_blue')
        //$('.items_of_buylist').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr='+'#e0f3fa'+', endColorstr='+'#00b6dffd'+',GradientType=1) ');
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