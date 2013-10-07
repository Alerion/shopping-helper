$(function(){

    var IdData = Backbone.Model.extend ({
        'id_data' : ""
    });
    
    var ProductModel = Backbone.Model.extend ({
        url: '/api/products'
    });
    var ProductCollection = Backbone.Collection.extend ({
        model: ProductModel,
        url: '/api/products'
    });

    var Useradmin = Backbone.View.extend({

        events:{
            'click #selected-dash' : "GetProduct"
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
                            '<span class="productname pointer">' + ' ' +
                            response[i].name + ' ' + '</span>' +
                            '<i data-product-id="'+ response[i].id +
                            '" class="icon-remove-circle remove-product pointer"></i></p>'
                        )
                    }
                }
            })            
        },

        render: function() {
            return this;
        },

    });
    var idData = new IdData();
    var userAdmin = new Useradmin({el:'body'});
    userAdmin.render();

});