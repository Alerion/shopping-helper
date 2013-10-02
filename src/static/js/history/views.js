
$.Helper.ProductTimeView = Backbone.View.extend({

        tagName:  "li",
        template : _.template($('#product-time-template').html()),

        initialize: function() {
            this.listenTo($.Helper.localProducts, 'all', this.render);
            this.listenTo($.Helper.currentProducts, 'all', this.render);

        }, 

        events: {
          "click .plus-minus" : "addDelete"
        },

        render: function() {

            this.$el.html(this.template(this.model.toJSON()));
            flag = $.Helper.localProducts.get(this.model.get('id'));
            
            if(flag) {
               
                this.$el.removeClass('hide');
                this.$el.addClass('show');
            } else {
                this.$el.removeClass('show');
                this.$el.addClass('hide');
            }

            this.changeIcon();

            return this;  

        },

        changeIcon : function() {

            flag = $.Helper.currentProducts.get(this.model.get('id'));

            if(flag) {

                this.$el.find('.plus-minus').removeClass('icon-plus').addClass('icon-minus');
            
            } else {
                this.$el.find('.plus-minus').removeClass('icon-minus').addClass('icon-plus');
            }
        },

        addDelete : function() {

            var that =this;
            var id = this.model.get('id');
            $.get('/history/add_to_list/?id='+id, function(data) {

                if(data.flag == 'true') {

                    $.Helper.currentProducts.add(that.model);
                    $('.message').text('You added ' + data.name + ' to your shopping-list');
                    $('.message').append($('<div></div>').text('Now in your shopping-list :'));

                    _.each($.Helper.currentProducts.models, function(product) {
                        $('.message').append($('<div></div>').text(product.get('name')));
                    })

                    $('.alert').removeClass('alert-delete').addClass('alert-add');
    
                    that.showMessage();

                }

                if(data.flag == 'false') {

                    $.Helper.currentProducts.remove(that.model);
                    $('.message').text('You deleted ' + data.name + ' from your shopping-list');
                    $('.message').append($('<div></div>').text('Now in your shopping-list:'));

                    _.each($.Helper.currentProducts.models, function(product) {
                        $('.message').append($('<div></div>').text(product.get('name')));
                    })

                    $('.alert').removeClass('alert-add').addClass('alert-delete');
                  
                    that.showMessage();
                } 
 
            })    
        },

        showMessage : function() {

            that= this;
            $('.alert').show(0,
                function() {
                clearTimeout($.Helper.timer);
                $.Helper.timer = setTimeout(that.disappear,6000);
                }
            )

            $('.alert').center();
        },

        disappear: function() {

            $('.alert').fadeOut(4000); 
        },

        
        
    })


    $.Helper.ShoppingListView = Backbone.View.extend({

        className : 'shopping-list',

        template :_.template($('#shopping-list-template').html()),

        initialize: function(options) {

            this.listenTo($.Helper.localProducts, 'all', this.sumCount);
            this.dates = options.dates;

        },

        events: {

            "mouseenter .circle" : "showPopup",
            "click .popups" : "hidePopup",
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
            var pattern = [10,100,200,400,800,1000,1500,2000,3000, 10000]
            var products = this.model.get('products');
            var circle = this.$el.find('.circle')
            var smallCircle = this.$el.find('.small-circle')
            var ids =$.Helper.localProducts.pluck('id') 
            
            _.each(products.models,function(product) {

                if(ids.indexOf(product.get('id'))!=-1) {
                    sum += Number(product.get('price'));
                    
                } 
                //define class of circle
                circle.removeClass();
                circle.addClass('circle');
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
                        var scrollTo = $('#'+dateText);
                        var scrollT = scrollTo.offset().top - container.offset().top + container.scrollTop()-80;

                        $('body, html').animate({ scrollTop: scrollT }, 'slow');

                        $('#'+dateText).addClass('date-selected');
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
            //ця подія спрацьовує для повідомлень меню
            'click .cross' : 'hideMessage'
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
                var dumyDade = new Date(nextDate - curDate);
                var days = dumyDade.getDate();
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
            "click .product_map"   : "showMap"
        },

        render : function() {

            this.$el.html(this.template(this.model.toJSON()));
            this.changeIcon();
            return this;

        },

        changeIcon : function() {

            flag = $.Helper.currentProducts.get(this.model.get('id'));
            
            if(flag) { 

                this.$el.find('.plus-minus-menu').removeClass('icon-plus').addClass('icon-minus');   
            } else {
                this.$el.find('.plus-minus-menu').removeClass('icon-minus').addClass('icon-plus');   
            }

        },

        toggleCheck : function() {

            var flag = this.$el.find('.check').is(':checked');
            //тут ми маємо видаляти анчекнуті продукти з  колекції локалпродакт, або додаємо чекнуті
            if(flag) {

                $.Helper.localProducts.add(this.model);
            } else {
                $.Helper.localProducts.remove(this.model);

            }
            //кожен внутрішній чекнутий  чекбокс на всякий випадок чекає і зовнішній чекбокс 
            if(flag) {
                this.$el.parents('ul').find('.category_check').prop('checked',true);
            }

        },
        //отримує масив координат, 
        showMap : function() {

            var iconUrl = 'http://127.0.0.1:8000/media/'+ this.model.get('category').get('icon');
            var positions = this.model.get('locations');

            console.log(this.model.get('locations'));//доступ до координат
            console.log(this.model.get('category').get('icon'));
            var mCont = $('#map-container');
            mCont.show().center();
            
            if(!this.map) {
            //initialize map if it not initialize
            this.map = L.map('map');
            } else {
                //delete all old markers
                for (var i = 0; i < this.markers.length; i++) {
                    
                    this.map.removeLayer(this.markers[i]);
                }
            }
            this.map.setView(positions[0],10) 
            L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
            maxZoom: 18,
            }).addTo(map);
            //var marker = L.marker([50.45, 30.52]).addTo(map);

            //клієнтський маркер з довільною картинкою

            //var shadowUrl = 
            
            //define class of icon

            var categoryIcon = L.Icon.extend({
                options: {
                    iconUrl: iconUrl
                    //shadowUrl: 'leaf-shadow.png',
                    //iconSize:     [38, 95],
                    //shadowSize:   [50, 64],
                    //iconAnchor:   [22, 94],
                    //shadowAnchor: [4, 62],
                    //popupAnchor:  [-3, -76]
                }
            });

            
            for(var i = 0; i<positions.length; i++) {

                var cIcon = new categoryIcon({})
                //L.marker(positions[i], {icon:cIcon}).addTo(map);
                //create instanse of with necessary position and icon
                var marker = L.marker(positions[i], {icon:cIcon})
                //every marker on its layer
                this.map.addLayer(marker);
                this.markers.push(marker);



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

        el : "#accordian",

        events: {
            
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

        render : function(){

            that = this
            _.each(this.categories.models, function(category) {
                      console.log(category.get('icon'))
                    var categoryView = new $.Helper.CategoryView({model:category});
                    that.$el.append(categoryView.render().el);

            });
      
        }
    })



    //Чому цей код перестав працювати, але якщо його закинути у wiev працює??????
     //$('.cross').click(function(){
        //alert('dfsf')
        //clearTimeout($.Helper.timer);
        //$('.alert').hide();
    //})

  

  