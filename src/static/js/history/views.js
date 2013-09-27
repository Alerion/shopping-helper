
$.Helper.ProductTimeView = Backbone.View.extend({

        tagName:  "li",
        template : _.template($('#product-time-template').html()),

        initialize: function() {
            this.listenTo(localProducts, 'all', this.render);
            this.listenTo(currentProducts, 'all', this.render);

        }, 

        events: {
          "click .plus-minus" : "addDelete"
        },

        render: function() {

            this.$el.html(this.template(this.model.toJSON()));
            flag = localProducts.get(this.model.get('id'));
            
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

        changeIcon : function () {

            flag = currentProducts.get(this.model.get('id'));

            if(flag) {

                this.$el.find('.plus-minus').removeClass('icon-plus');
                this.$el.find('.plus-minus').addClass('icon-minus');
           } else {
                this.$el.find('.plus-minus').removeClass('icon-minus');
                this.$el.find('.plus-minus').addClass('icon-plus');
           }
        },

        addDelete : function() {

            var that =this;
            var id = this.model.get('id');
            $.get('/history/add_to_list/?id='+id, function(data) {

                if(data.flag == 'true') {
                    currentProducts.add(that.model);
                    $('.message').text('You added ' + data.name + ' to your shopping-list');
                    $('.message').append($('<div></div>').text('Now in your shopping-list :'));
                    _.each(currentProducts.models, function(product){
                        $('.message').append($('<div></div>').text(product.get('name')));
                    })

                    $('.alert').removeClass('alert-delete');
                    $('.alert').addClass('alert-add');
                    that.showMessage();

                }

                if(data.flag == 'false') {
                    currentProducts.remove(that.model);
                    $('.message').text('You deleted ' + data.name + ' from your shopping-list');
                    $('.message').append($('<div></div>').text('Now in your shopping-list :'));
                    _.each(currentProducts.models, function(product){
                        $('.message').append($('<div></div>').text(product.get('name')));
                    })

                    $('.alert').removeClass('alert-add');
                    $('.alert').addClass('alert-delete');
                    that.showMessage();
                } 

            })    
        },

        showMessage : function(){
            that= this;
             $('.alert').show(0,
                function(){
                clearTimeout($.Helper.timer);
                $.Helper.timer = setTimeout(that.disappear,6000)
                }
            )

            $('.alert').center();
        },
         disappear: function(){
        $('.alert').fadeOut(4000); 
        },

        
        
    })


    $.Helper.ShoppingListView = Backbone.View.extend({

        className : 'shopping-list',

        template :_.template($('#shopping-list-template').html()),

        initialize: function(options) {

            this.listenTo(localProducts, 'all', this.sumCount);
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

            _.each(products,function(product){

                    var view = new $.Helper.ProductTimeView({model: product});
                    that.$el.find('.sl_products_container').append(view.render().el);
            });

            var moduleDay = this.$el.find('.module-day');
            moduleDay.css('height', moduleDay.height()*this.options.days);
            that.sumCount();

        return that;

        },

        sumCount: function() {

            var sum = 0;
            var pattern = [10,100,200,400,800,1000,1500,2000,3000, 10000]
            var products = this.model.get('products');
            var circle = this.$el.find('.circle')
            var smallCircle = this.$el.find('.small-circle')
            var ids =localProducts.pluck('id') 
            
            _.each(products.models,function(product){

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

            var ids = localProducts.pluck('id')

            var products = this.model.get('products');
            var visible = []

            _.each(products.models, function(product){

                if(ids.indexOf(product.get("id"))!= -1) {
                    visible.push(product)
                }
            })
                
            if(visible.length == 0) {
                this.$el.find('.list-container').hide();
            } else {
                this.$el.find('.list-container').show();
            }
        },

        avaliableDates: function(date, dates){

        dmy = date.getFullYear() +"-"+ (('0'+(date.getMonth()+1)).slice(-2))+ "-" +(('0'+(date.getDate())).slice(-2));
        

          if ($.inArray(dmy, dates) != -1) {

            return [true, "myclass","Available"];
          } else {

            return [false,"myclass","unAvailable"];
          }          
        },

        showDatepicker: function() {

            var datePicker = this.$el.find(".datepicker");
            var that = this;
    
                datePicker.datepicker({

                    constrainInput: true,
                    showOn: 'button',
                    buttonText: "",

                    beforeShowDay: function(date){

                       that.$el.find(".date").addClass('date-active');
                     
                       return that.avaliableDates(date, that.dates);

                    },

                    onClose: function (){
                         setTimeout(function(){
                            $(".datepicker").blur();
                         }, 200);
                        that.$el.find(".date").removeClass('date-active');
                    },

                    onSelect: function(dateText){

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

        render : function(){

            var that= this;
            var i = 0;

                _.each(this.timeLine.models, function(shoppingList, i) {

                    var shoppingListView = new $.Helper.ShoppingListView({

                        model:shoppingList,
                        days:that.days_mass[i],
                        dates:that.allDates
                    });
                    i = i+1;
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

            _.each(this.timeLine.models, function(shoppingList){

                var date = shoppingList.get('date');
                var time = date.split('-');
                var curDate = new Date()
                curDate.setFullYear(time[0],time[1]-1,time[2]);
                var dumyDade = new Date(nextDate - curDate);
                var days = dumyDade.getDate();
                nextDate = curDate;
                that.days_mass.push(days)

             }) 

            return this.days_mass 
        },

        hideMessage : function() {

            clearTimeout($.Helper.timer);
            $('.alert').hide();
        }
    
    })
   
    $.Helper.ProductView = $.Helper.ProductTimeView.extend({

        tagName:  "li",
        template : _.template($('#item-template').html()),

        initialize: function(options) {

            this.listenTo(currentProducts, 'all', this.render);
        },

        events: {
            // check/uncheck change product model
            "click .check"   : "toggleCheck", 
            "click .add_delete_product"   : "addDelete"
        },

        render: function() {

            this.$el.html(this.template(this.model.toJSON()));
            this.changeIcon();
            return this;

        },

        changeIcon : function() {

            flag = currentProducts.get(this.model.get('id'));

            if(flag) { 
                this.$el.find('.add_delete_product').removeClass('icon-shopping-cart');
                this.$el.find('.add_delete_product').addClass('icon-remove');
           } else {
                this.$el.find('.add_delete_product').removeClass('icon-remove');
                this.$el.find('.add_delete_product').addClass('icon-shopping-cart');
           }

        },

        toggleCheck : function() {

            var flag = this.$el.find('.check').is(':checked');
            //тут ми маємо видаляти анчекнуті продукти з  колекції локалпродакт, або додаємо чекнуті
            if(flag) {

                localProducts.add(this.model) ;
            } else {
                localProducts.remove(this.model);

            }
            //кожен внутрішній чекнутий  чекбокс на всякий випадок чекає і зовнішній чекбокс 
            if(flag) {
                this.$el.parents('ul').find('.category_check').prop('checked',true)
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

        initialize: function(){

        },
      
        toggleCheck: function() {

            var checked = this.$el.find('.category_check').is(':checked');

            if (checked){

                this.$el.find('.check').prop('checked', true);

                _.each(this.model.get("products").models, function(product){
                   
                    localProducts.add(product);
                });
            }
            else{
                 this.$el.find('.check').prop('checked', false);

                  _.each(this.model.get("products").models, function(product){
                    localProducts.remove(product);
                });
            }

        },

        render: function() {

          this.$el.html(this.template(this.model.toJSON()));

           var that = this;

                _.each(this.model.get("products").models, function(product){

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
                this.$el.find('.up_down').removeClass('icon-upload');
                this.$el.find('.up_down').addClass('icon-download');
                this.$el.flag = 0;
            } else {


                this.$el.find('ul').slideDown();
                this.$el.flag = 1;
                this.$el.find('.up_down').removeClass('icon-download');
                this.$el.find('.up_down').addClass('icon-upload');
            }
        }


    })

   
    $.Helper.MenuView = Backbone.View.extend({

        el : "#accordian",

        events: {
            
        },

        initialize: function(){
        
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
            _.each(this.categories.models, function(category){
                      
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

  

  