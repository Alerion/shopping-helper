$(function(){

    var IdData = Backbone.Model.extend ({
        'id_data' : ""
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
                for(var i=0; i<response.length; i++)
                {
                    if(response[i].name == name)
                    {
                        idData.set({'id':response[i].id}); 
                    }
                }

            })

            $.get('/api/products/',function(response) {
                for(var i=0; i< response.length;i++){
                    if(response[i].dashboard == idData.get('id')){
                        $('.product-list').prepend(
                            '<p class="product-item" data-item-icon="' +
                            response[i].category.icon +
                            '">' +
                            ' <img class="icon-animation" src="/media/' + response[i].category.icon + '" />' + // need to fix this /media/
                            '<span class="pdf editable">' + ' ' +
                            response[i].name + ' ' +
                            '</span>' +
                            '<i data-product-id="'+
                            response[i].id +
                            '" class="icon-remove-circle remove-product"></i></p>'
                        )
                    }
                }
            })            
        },
        render: function() {
            return this;
        }

    });
    var idData = new IdData();
    var userAdmin = new Useradmin({el:'body'});
    userAdmin.render();

});
$(document).ready(function() {
            
            $(".editable").dblclick(function(){
                $(this).text(prompt("Введіть назву"));  
            });

        });