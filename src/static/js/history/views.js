
$.Helper.ProductTimeView = Backbone.View.extend({

        tagName:  "li",
        template : _.template($('#product-time-template').html()),

        initialize: function() {
            this.listenTo($.Helper.localProducts, 'add remove', this.render);
            this.listenTo($.Helper.currentProducts, 'add remove', this.render);

        }, 

        events: {
          "click .plus-minus" : "addDelete"
        },

        render: function() {

            this.$el.html(this.template(this.model.toJSON()));
            var flag = $.Helper.localProducts.get(this.model.get('id'));
            
            if(flag) {

                this.$el.removeClass('hide').addClass('show');;   
            } else {
                this.$el.removeClass('show').addClass('hide');
            }

            this.changeIcon();

            return this;  

        },

        changeIcon : function() {

            var flag = $.Helper.currentProducts.get(this.model.get('id'));

            if(flag) {

                this.$el.find('.plus-minus').removeClass('icon-plus').addClass('icon-minus');
                this.$el.find('.plus-minus').attr('title', 'delete product');
            
            } else {
                this.$el.find('.plus-minus').removeClass('icon-minus').addClass('icon-plus');
                this.$el.find('.plus-minus').attr('title', 'add product');
            }
        },

        addDelete : function() {

            $('.alert').hide();
            var that =this;
            var id = this.model.get('id');
            $.get('/history/add_to_list/?id='+id, function(data) {

                if(data.flag == 'true') {
                    //added product model to collection
                    $.Helper.currentProducts.add(that.model);

                    //form message about changing in current shopping-list
                    $('.message').text('You added ' + data.name.toUpperCase() + ' to your shopping-list');
                    $('.alert').removeClass('alert-delete').addClass('alert-add');
                    that.showMessage();
                }

                if(data.flag == 'false') {
                    //remove product model to collection
                    $.Helper.currentProducts.remove(that.model);

                    //form message about changing in current shopping-list
                    $('.message').text('You deleted ' + data.name.toUpperCase() + ' from your shopping-list');
                    $('.alert').removeClass('alert-add').addClass('alert-delete');
                    that.showMessage();
                } 
 
            }) 

        },

        showMessage : function() {

            $('.message').append($('<div></div>').text('Now in your shopping-list:')); 
            $('.message').append($('<ul></ul>'));

            //display a list of products in current shopping-list
            _.each($.Helper.currentProducts.models, function(product) {

                $('.message').find('ul').append($('<li></li>').text(product.get('name')));
            })

            var that= this;
            $('.alert').show(0,
                function() {
                    //timer can clear before dissapear sturt running
                    clearTimeout($.Helper.timer);
                    $.Helper.timer = setTimeout(that.disappear,6000);      
                }
            )
               
            $('.alert').center();
            
        },

        disappear: function() {
            
            $('.alert').fadeOut(2000); 
           
        },  
        
    });


    $.Helper.ShoppingListView = Backbone.View.extend({

        className : 'shopping-list',

        template :_.template($('#shopping-list-template').html()),

        initialize: function(options) {

            this.listenTo($.Helper.localProducts, 'add remove', this.sumCount);
            this.dates = options.dates;

        },

        events: {

            "mouseenter .circle" : "showPopup",
            "click .close_popup" : "hidePopup",
            "click .date" : "showDatepicker",
            
        },

        render : function() {

            var that = this;
            that.$el.html(this.template(this.model.toJSON()));
            var products = that.model.get('products').models;

            _.each(products,function(product) {

                    var view = new $.Helper.ProductTimeView({model: product});
                    that.$el.find('.sl_products_container').append(view.render().el);
            });

            var moduleHeight = $('#module-day').height();
            that.$el.find(".module-day").css('height', this.options.days*moduleHeight);
           
            that.sumCount();
            
        return that;

        },

        sumCount: function() {

            var sum = 0;
            var pattern = [10, 100, 200, 400, 800, 1000, 1500, 2000, 3000, Math.pow(10,10)]
            var products = this.model.get('products');
            var circle = this.$el.find('.circle');
            var smallCircle = this.$el.find('.small-circle');
            var ids =$.Helper.localProducts.pluck('id'); 
            
            _.each(products.models,function(product) {

                if(ids.indexOf(product.get('id')) != -1) {

                    sum += Number(product.get('price'));
                    
                } 
               
                circle.removeClass();
                circle.addClass('circle');

                //define class of circle
                for(var i = 0; i < pattern.length; i++) {

                    if(sum < pattern[i]) {

                        circle.addClass('size-' + i);
                        break;
                    }

                }
            })
           
            smallCircle.text(sum);
            this.checkEmpty();
        },


        showPopup : function() {

            $('#timeLine').find('.sl_products_container').hide();
            this.$el.find('.sl_products_container').show();
        },

        hidePopup : function() {

           this.$el.find('.sl_products_container').hide(); 
        },

        checkEmpty : function() {

            var ids = $.Helper.localProducts.pluck('id')

            var products = this.model.get('products');
            var visible = []

            _.each(products.models, function(product){

                if(ids.indexOf(product.get("id"))!= -1) {

                    visible.push(product);
                }
            })
                
            if(visible.length == 0) {

                this.$el.find('.list-container').hide();
            } else {

                this.$el.find('.list-container').show();
            }
        },

        avaliableDates : function(date, dates) {


        dmy = date.getFullYear() +"-"+ (('0'+(date.getMonth()+1)).slice(-2))+ "-" +(('0'+(date.getDate())).slice(-2));
        

          if ($.inArray(dmy, dates) != -1) {

            return [true, "myclass","Available"];
          } else {

            return [false,"myclass","unAvailable"];
          }          
        },

        showDatepicker : function() {

            var datePicker = this.$el.find(".datepicker");
            var that = this;
    
                datePicker.datepicker({

                    constrainInput: true,
                    showOn: 'button',
                    buttonText: "",

                    beforeShowDay : function(date) {

                       that.$el.find(".date").addClass('date-active');
                     
                       return that.avaliableDates(date, that.dates);

                    },

                    onClose : function () {

                         setTimeout(function() {

                            $(".datepicker").blur();
                         }, 200);
                        that.$el.find(".date").removeClass('date-active');
                    },

                    onSelect : function(dateText) {


                        $('.date').removeClass('date-selected');

                        var container = $('#timeLine');
                        var scrollTo = $('#' + dateText);
                        console.log(container.offset().top)
                        console.log(container.scrollTop())
                        var scrollT = scrollTo.offset().top - container.offset().top + container.scrollTop() - 80;

                        $('body, html').animate({ scrollTop: scrollT }, 'slow');

                        $('#' + dateText).addClass('date-selected');
                    },

                    dateFormat: 'yy-mm-dd'
                })
           
            datePicker.datepicker('option', {});
            datePicker.datepicker("show");
        },
       

    })



    $.Helper.TimeLineView = Backbone.View.extend({

        el : '#timeLine',

        initialize: function() {
           
            this.load();
            this.days();
            this.render();
        },
     
        events : {
            //this event work for menu too
            'click .close_message' : 'hideMessage'
        },

        render : function() {

            var that = this;
            var i = 0;

                _.each(this.timeLine.models, function(shoppingList, i) {

                    var shoppingListView = new $.Helper.ShoppingListView({

                        model:shoppingList,
                        days:that.days_mass[i],
                        dates:that.allDates
                    });
                    
                    i = i + 1;
                    that.$el.append(shoppingListView.render().el);
                })
                   
        },

        load : function() {

            var that = this;
            this.timeLine  = new $.Helper.TimeLine()
            this.timeLine.fetch({ async:false,

            success : function() {
     
                    that.timeLine.models.reverse();
                    var model = that.timeLine.where({ 'date': null});
                    that.timeLine.remove(model);

                    that.allDates = that.timeLine.pluck('date');
                }

            })
           
        },

        days : function() {

            var that = this;
            this.days_mass = [];
            var nextDate = new Date();

            _.each(this.timeLine.models, function(shoppingList) {

                var date = shoppingList.get('date');
                var time = date.split('-');
                var curDate = new Date();
                curDate.setFullYear(time[0],time[1]-1,time[2]);
                //get difference between dates in milliseconds
                var dumyDate = nextDate - curDate;
                //get difference between dates in days /(1000*60*60*24)
                var days = Math.ceil(dumyDate/86400000);
                nextDate = curDate;
                that.days_mass.push(days);

            }) 
           
            return this.days_mass; 
        },

        hideMessage : function() {

            clearTimeout($.Helper.timer);
            $('.alert').hide();
        }
    
    })
   
    $.Helper.ProductView = $.Helper.ProductTimeView.extend({

        tagName:  "li",
        template : _.template($('#item-template').html()),

        initialize : function(options) {

            this.listenTo($.Helper.currentProducts, 'all', this.render);
        },

        events: {
            // check/uncheck change product model
            "click .check"   : "toggleCheck", 
            "click .plus-minus-menu"   : "addDelete",
            "click .product_map"   : "showMap",
            

        },

        render : function() {

            this.$el.html(this.template(this.model.toJSON()));
            this.changeIcon();
            return this;

        },

        changeIcon : function() {

            var flag = $.Helper.currentProducts.get(this.model.get('id'));
            
            if(flag) { 

                //change view
                this.$el.find('.plus-minus-menu').removeClass('icon-plus').addClass('icon-minus');
                //change title
                this.$el.find('.plus-minus-menu').attr('title', 'delete')  
            } else {
                this.$el.find('.plus-minus-menu').removeClass('icon-minus').addClass('icon-plus');
                this.$el.find('.plus-minus-menu').attr('title', 'add')   
            }

        },

        toggleCheck : function() {

            var flag = this.$el.find('.check').is(':checked');
            //add or remove checked or unchecked product from localProducts
            if(flag) {

                $.Helper.localProducts.add(this.model);
            } else {
                $.Helper.localProducts.remove(this.model);

            }
            //if product is checking, the category is checking too
            if(flag) {
                this.$el.parents('ul').find('.category_check').prop('checked',true);
            }

        },
        
        showMap : function(ev) {
            
            //icon for marker
            var iconUrl = '/media/'+ this.model.get('category').get('icon');
            //form list of coordinates
            var positions = [];
            _.each(this.model.get('locations'), function(location)  {

                var p = [];
                _.each(location.coordinate.split(';'),function(coord) {

                    p.push(parseFloat(coord)) ;

                })
                positions.push(p);
            })
            
            var mCont = $('#map-container');
            var element = $(ev.currentTarget).parents('#accordian');
            
            if(!element.attr('customTop')) {

                element.attr('customTop', Boolean(parseInt(mCont.css("top"))) ? parseInt(mCont.css("top")) : 0)
               
            }
            console.log(element.attr('customTop'))
            var top = $(window).scrollTop() + parseInt(element.attr('customTop'));
            console.log(top)
            mCont.show().css("top",  top + "px");
            
            if(!$.Helper.map) {
            //initialize map if it not initialize
                $.Helper.map = L.map('map');
            } else {
                //delete all old markers
                for (var i = 0; i < $.Helper.markers.length; i++) {
                   
                    $.Helper.map.removeLayer($.Helper.markers[i]);

                }
            }
            $.Helper.map.setView(positions[0],10) 
            L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 2,
            trackResize: true
            }).addTo($.Helper.map);
                       
            //define class of icon
            var categoryIcon = L.Icon.extend({
                options: {
                    iconUrl: iconUrl,
                }
            });
            
            for(var i = 0; i < positions.length; i++) {

                var cIcon = new categoryIcon({})
            
                //create instanse of with necessary position and icon
                var marker = L.marker(positions[i], {icon:cIcon})
                //every marker on its layer
                $.Helper.map.addLayer(marker);
                marker.bindPopup(this.model.get('locations')[i].name +"</br>"+this.model.get('name')).openPopup();
                $.Helper.markers.push(marker);

            }
            
        }
    })
    

    $.Helper.CategoryView = Backbone.View.extend({

        tagName : 'ul',

        template: _.template($('#category-item').html()),

        events: {
            "click .category_check"   : "toggleCheck", 
            'click .up_down' : 'up_down',
            'click .check' : 'uncheck'
        },

        initialize : function() {

        },
      
        toggleCheck : function() {

            var checked = this.$el.find('.category_check').is(':checked');

            if (checked) {

                this.$el.find('.check').prop('checked', true);

                _.each(this.model.get("products").models, function(product) {
                   
                    $.Helper.localProducts.add(product);
                });
            }
            else {
                 this.$el.find('.check').prop('checked', false);

                    _.each(this.model.get("products").models, function(product) {
                        $.Helper.localProducts.remove(product);

                    });
            }

        },

        render: function() {

            this.$el.html(this.template(this.model.toJSON()));

            var that = this;

                _.each(this.model.get("products").models, function(product) {

                    var view = new $.Helper.ProductView({model: product});
                    that.$el.find('ul').append(view.render().el);

             });

            return this;

        },
      //uncheck category, wich don't have any products
        uncheck: function() {
            
            var checked = this.$el.find('.check:checked');

            if(checked.length == 0) {
                this.$el.find('.category_check').prop('checked',false);
            }

        },

        up_down : function () {

            if(this.$el.flag === 1) {


                this.$el.find('ul').slideUp();
                this.$el.find('.up_down').removeClass('icon-upload').addClass('icon-download');
                this.$el.flag = 0;
            } else {


                this.$el.find('ul').slideDown();
                this.$el.flag = 1;
                this.$el.find('.up_down').removeClass('icon-download').addClass('icon-upload');
            }
        }

    })

   
    $.Helper.MenuView = Backbone.View.extend({

        el : "#accordian-container",

        events: {
            
            'click .close_map' : 'hideMap'
        },

        initialize: function() {
        
            this.load();
            this.render();

        },

        load: function() {

            this.categories = new $.Helper.Categories();
            this.categories.fetch({async:false,
            })
        },

        render : function() {

            that = this
            _.each(this.categories.models, function(category) {
                      
                    var categoryView = new $.Helper.CategoryView({model:category});
                    that.$el.find('#accordian').append(categoryView.render().el);

            });
      
        },

        hideMap : function() {
            $('#map-container').hide();
        }
    })



  

  