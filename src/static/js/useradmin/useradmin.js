$(function(){

    var IdData = Backbone.Model.extend ({
        'id_data' : ""
    });
    
    var ProductsView = Backbone.View.extend({

        events:{
            'click #select-dash' : "GetProduct",
            'click #share-dash' : "AddUser",
            'click .remove-user' : "RemoveUser"
        },
        
        GetProduct: function(){
            //function to get dashboard name
            $('.product-list').empty();
            
            var name = $("#select-dash option:selected").text();
            var id;

            $.get('/api/dashboards/',function(response) {
                for(var i=0; i<response.length; i++) {
                    if(response[i].name == name) {
                        idData.set({'id':response[i].id}); 
                    }
                }
            })

            $.get('/api/products/',function(response) {
                for(var i=0; i< response.length;i++){
                    if(response[i].dashboard == idData.get('id')){
                        $('.product-list').prepend(
                            '<p class="product-item" data-item-icon="' +
                            response[i].category.icon + '">' +
                            '<img src="/media/' + response[i].category.icon + '" />' + 
                            '<a href="#" id="productname" data-type="text" data-pk="1" data-url="/post" data-title="Enter productname" class="productname pointer">' + ' ' +
                            response[i].name + ' ' + '</a>' +
                            '<i data-product-id="'+ response[i].id +
                            '" class="icon-remove remove-product pointer"></i></p>'
                        )
                    }
                }
            })
        },

        AddUser: function(){
            var value = $("input:radio[name=radio]:checked").val();
            var name = $("input:radio[name=radio]:checked").data("user")
            
            $.post(URLS.ADD_USER,{'value':value},function(response){
                /*
                $('.connected-users').append(
                    '<i class="icon icon-user"></i>'+
                    '<span class="ulist" data-user="{{users}}">'+ name +'</span>'+
                    '<i class="icon-remove-circle remove-user pointer" data-user="{{ users.id }}"></i>'
                )
                */
            })
        },
        /*
        RemoveUser: function(event){
            event.currentTarget = this
            var value = $(this).data('user');
            console.log(value)
            console.log($(this))
            //$.post(URLS.REMOVE_USER,{'value':value}, function(response){

            //})
        },
        */
        render: function() {
            return this;
        },

    });
    var idData = new IdData();
    var productView = new ProductsView({el:'body'});
    productView.render();

});
