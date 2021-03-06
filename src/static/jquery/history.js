
$(document).ready(function() {

    //menu 
   $('.navbar-nav').find('li').removeClass('active');
   $('.navbar-nav').find('#history').addClass('active');

    $(".date").click(function() {

            var datePicker = $(this).find(".datepicker");
            
            var that = this;
            var dates = [];
    
                datePicker.datepicker({

                    constrainInput: true,
                    showOn: "button",
                    buttonText: "",

                    beforeShowDay: function(date) {

                        $(that).find(".date").addClass("date-active");
                     
                        dmy = date.getFullYear() + "-" + (("0" + (date.getMonth() + 1)).slice(-2)) + "-" + (("0" + (date.getDate())).slice(-2));
                        
                        if ($.inArray(dmy, shoppingDates) != -1) {

                            return [true, "myclass","Available"];
                        } else {

                            return [false,"myclass","unAvailable"];
                        }       

                    },

                    onClose: function () {

                        setTimeout(function() {

                            $(".datepicker").blur();
                        }, 200);

                        $(that).find(".date").removeClass("date-active");
                    },

                    onSelect: function(dateText) {

                        $('.date').removeClass('date-selected');
                        
                        var container = $('#timeLine');
                        var scrollTo = $('#' + dateText);
                        console.log(container.offset().top)
                        console.log(container.scrollTop())
                        var scrollT = scrollTo.offset().top - container.offset().top + container.scrollTop() - 40;

                        $('body, html').animate({ scrollTop: scrollT }, 'slow');

                        $('#'+dateText).addClass('date-selected');
                    },

                    dateFormat: 'yy-mm-dd'
                })
            
            datePicker.datepicker('option', {});

            datePicker.datepicker("show");
      

    });

    $(".up_down").click(function() {

       if(this.flag === 1) {

        	$(this).parents('li').find("ul").slideUp();
            $(this).removeClass('icon-upload').addClass('icon-download')
            this.flag = 0;
        } else {

            $(this).parents('li').find("ul").slideDown();
            this.flag = 1;
            $(this).removeClass('icon-download').addClass('icon-upload')
       }
    })

        var priceMass = [];
     
    $.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
    }

    
    

    $('.category').change(function() {
        var slDivs = $(".shopping-list");
        var products = $("#li_category" + this.id).find(".products");
        var n, id, prodId = [];
        for (var i = 0; i < products.length; i++) {
            id = products[i].id;
            n = id.indexOf('_');
            prodId.push(id.slice(n + 1));
        }
        
        if ($(this).is(':checked') ) {
            products.prop("checked", true);
            for (var j = 0; j < prodId.length; j++) {
           
            $('.product_' + prodId[j]).addClass('show').removeClass('hide');
            $('.product_' + prodId[j]).parents('.shopping-list').show();
            }
        } else { 
            products.prop("checked", false);
            for (var j = 0; j < prodId.length; j++) {
           
                $('.product_' + prodId[j]).addClass('hide').removeClass('show');
            } 
            hideBlock();
        }
            countCircleSizes();

    })

   function hideBlock() {
        var slDivs = $(".shopping-list"); 
        for (var i = 0; i < slDivs.length; i++) {
            var sl_products = $("#" + slDivs[i].id).find(".show");
            if (sl_products.length === 0){ 
                $("#" + slDivs[i].id).hide();
            }
        }
    }


     function countCircleSizes() {
        var pattern = [10, 100, 200, 400, 800, 1000, 1500, 2000,3000, Math.pow(10,10)]
        var sumMuss = [];
        var singleSum = 0;
        var circles = [];
        var slDivs = $(".shopping-list"); //find all shopping-lists
        for (var i = 0; i < slDivs.length; i++) {
            var sl_products = $("#" + slDivs[i].id).find(".show")// find all visible products
            //find all circles
            var circle = $("#" + slDivs[i].id).find(".circle");
            circles.push(circle);
            //create summ massive
            singleSum = 0;
            for (var j = 0; j < sl_products.length; j++){
                var id = (sl_products[j].id).slice(11);
                for (var k = 0; k < priceMass.length; k++ ) {
                    if (priceMass[k]['pr_id'] == id) {
                            singleSum += priceMass[k]['pr_price']  
                    }
                }       
            }
            sumMuss.push(singleSum);
        }
        //create size massive
        var sizes = []
        for (var l = 0; l < sumMuss.length; l++) {
            for (var m = 0; m < pattern.length; m++){
                if (sumMuss[l] < pattern[m]) {
                    sizes.push(m)
                    break;
                }
            }
        }
        //assign every circle its size 
        for (var k = 0; k < circles.length; k++) {
            circles[k].removeClass();
            circles[k].addClass('circle');
            circles[k].addClass('size-' + sizes[k])
            circles[k].find('.small-circle').text(sumMuss[k]);
        }
    }


    $('.products').change(function() {

        var id = $(this).attr('id');
        var n = id.indexOf('_');
        var categoryId = id.slice(0, n);
        var p = $('.products');
        var slDivs = $(".shopping-list");  
        var productId =id.slice(n + 1);
        //id of product list item
        var liId = '.product_' + productId; //find all product on time line with defined id
        
        if ($(this).is(':checked')) {

            $('#' + categoryId).prop("checked", true);//check outer checkbox
            $(liId).removeClass('hide').addClass('show');        
            $(liId).parents('.shopping-list').show();
        } else {
            //hide unchecked product
            $(liId).addClass('hide').removeClass('show'); 
                
            //hide empty block with shopping-list
            hideBlock();
              //when all bolock uncheked
            if ($('#ul_products_' + categoryId).find("input:checkbox:checked").length === 0 ) {

                $('#' + categoryId).prop("checked", false);
            }
            
        }
        countCircleSizes();
    })

    $(".circle").mouseenter(function() {
        $(".sl_products_container").hide(); //Hide all popups off screen 
        $(this).prev().show();
    })

    $(".close_popup").click(function() {
        $(this).parent('ul').hide(); //Hide current popup off screen
    })


     $(function() {
      function moveFloatMenu() {
        //top position of accordian addad scrollTop position of window
      
        var menuOffset = menuYloc.top + $(this).scrollTop();

            
        if(!this.docHeight){
    
            this.docHeight = $(document).height();
        }
  
        if((parseInt(menuOffset,10) + parseInt($('#accordian').css('height'),10)) > this.docHeight){
            floatMenu = false;
        }
        else {
           floatMenu = true;
        }
       
        if (floatMenu){
            $('#accordian').animate({
                top: menuOffset+"px"
            }, {
                duration: 1000,
                queue: false
            });
        }
   
    
    }
    //returns the offset coordinates for the selected elements, relative to the document.
    menuYloc = $('#accordian').offset();
    //The scroll event occurs when the user scrolls in the specified element
    //the window is scrolled, moveFloatMenu works
    $(window).scroll(function(){
        var menuHeight = ($('#accordian').css('height'))
        moveFloatMenu();

    });
   
    
    $.get('/history/previous_settings',function(data) {
        $.currentList = []
        
        //initial assign
        for(var i = 0; i < data[0].length; i++) {

            $.currentList.push(data[1][i].product_name);
            var id = data[0][i].product_in_id;

            //initial assign : +/- for buttons;
            $('#button_'+ id).removeClass('icon-plus').addClass('icon-minus');
            $('.product_'+ id).find('div').removeClass('icon-plus').addClass('icon-minus');

            //initial assign : tittles for buttons;
            $('#button_'+ id).attr('title','delete product');
            $('.product_'+ id).find('div').attr('title','delete product');;
        }
    })

   $('.plus-minus-menu').click(function() {
        var that = $(this); 
        addDeleteProduct(that,false)
    })

    $('.plus-minus').click(function() {
        var that = $(this)
        addDeleteProduct(that,true);
    })

    function disappear(){
       $('.alert').fadeOut(2000); 
    }


    function addDeleteProduct(that,bool) {

        var id = (bool) ? that.data('product_id') : that.attr('id').slice(7);
        
        $.get('/history/add_to_list/?id='+id, function(data) {

            if(data.flag == 'false') {

                $.currentList.splice($.currentList.indexOf(data.name),1)
                $('.product_'+id).find('div').removeClass('icon-minus').addClass('icon-plus');
                $('.product_'+id).find('div').attr('title','add product');
               
                if(bool) {

                    $('#button_'+ id).removeClass('icon-minus').addClass('icon-plus');
                    $('.product_'+id).find('div').attr('title','add product');    
                }
                else {
                    that.removeClass('icon-minus').addClass('icon-plus');
                    that.attr('title','add product');
                }
                //message about changing in database
                $('.message').text('You deleted ' + 
                    data.name.toUpperCase() + ' from your shopping-list');
                $('.alert').removeClass('alert-add').addClass('alert-delete');
                showMessage();
            }
            if(data.flag == 'true') {

                $.currentList.push(data.name)
                console.log($.currentList)

                $('.product_'+id).find('div').removeClass('icon-plus').addClass('icon-minus');
                $('.product_'+id).find('div').attr('title','delete product');

                if(bool) {

                    $('#button_'+ id).removeClass('icon-plus').addClass('icon-minus');
                    $('#button_'+ id).attr('title','delete product');
                }
                else {
                    that.removeClass('icon-plus').addClass('icon-minus');
                    that.attr('title','delete product');
                }
                //message about changing in database
                $('.message').text('You added ' + 
                    data.name.toUpperCase() + ' to your shopping-list');
                $('.alert').removeClass('alert-delete').addClass('alert-add');
                
                showMessage();
            }
           
            
        })
    }
   
    function showMessage() {

        //it usfull, when work function dissapear 
        $('.alert').hide();

        $('.message').append($('<div></div>').text('Now in your shopping-list:'));
        $('.message').append($('<ul></ul>'));

        for(var i = 0; i < $.currentList.length; i++) {

            $('.message').find('ul').append($('<li></li>').text($.currentList[i]));
        }

        $('.alert').show(0,
            function() {
            clearTimeout($.timer);
            $.timer = setTimeout(disappear,6000)
        })

        $('.alert').center();

    }

    // work with circles 
    $.get('/history/prices',function(data) {
        priceMass = data;
        countCircleSizes();
    })
    
    //work with alert messages
    $('.close_message').click(function(){
        clearTimeout($.timer);
        $('.alert').hide();
    })
    
});
    var markers = [], map = null, customTop = null;
    $('.product_map').click(function() {

        var id = this.id.slice(2);
     
        var mCont = $('#map-container');
        
        //find top defined in css if it define 
        if(!customTop) {
            customTop = Boolean(parseInt(mCont.css("top"))) ? parseInt(mCont.css("top")) : 0
        }

        mCont.show().css("top",  ($(window).scrollTop() + customTop) + "px");

        $.get('/history/work_with_map/?id='+id, function(data) {

            if(!map) {
            //initialize map if it not initialize
            map = L.map('map');
            } else {
                //delete all old markers
                for (var i = 0; i < markers.length; i++) {
                    
                    map.removeLayer(markers[i]);
                    console.log(markers[i])
                }
            }
            
            var iconUrl = '/media/'+ data.url;
            var positions = data.positions;
            
            map.setView(positions[0],10)
            L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 2,
            }).addTo(map);
            
            //define class of icon
            var categoryIcon = L.Icon.extend({
                options: {
                    iconUrl: iconUrl
                 
                }
            });

            
            for(var i = 0; i < positions.length; i++) {

                var cIcon = new categoryIcon({})
                
                //create instanse of with necessary position and icon
                var marker = L.marker(positions[i], {icon:cIcon});
                marker.bindPopup(data.loc_names[i] + '</br>' + data.pr_name).openPopup();
                //every marker on its layer
                map.addLayer(marker);
                markers.push(marker);
            }  

        })
    })

    $('.close_map').click(function(){
         var mCont = $('#map-container');
         mCont.hide();
    })    
    
})

