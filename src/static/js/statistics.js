
    window. REQUEST_DATA = {};   //variable for saving data from ajax
    $.ajax({
        url : 'http://127.0.0.1:8000/statistics/back_page/',
        dataType : 'json',
        type: "GET",
        async : true,
        success : function(data) {          //visualization views
            window. REQUEST_DATA = data;
            var pieChartView = new PieCartView();
            var barChartView = new BarChartView();
            var timeSeriesView = new TimeSeriesView();
            var stackedAreaView = new StackedAreaView();
        }
    });


/*View for piechart*/
var PieCartView = Backbone.View.extend({
    el: "#chart1",
    initialize : function(){
        this.render();
    },
    render : function(){
      google.load("visualization", "1", {'callback':this.drawPieChart, packages:["corechart"]})
    },
    
    drawPieChart : function () {
        var data = google.visualization.arrayToDataTable(JSON.parse( REQUEST_DATA.data_for_piechart));

        var options = {
            title: 'Money spended for each category'
        };

        var chart = new google.visualization.PieChart(this.$("#chart1").get(0));
        chart.draw(data, options);
      }
    
});
/*View for bar chart*/
var BarChartView = Backbone.View.extend({
    el: "#bar_chart",
    initialize : function(){
        this.render();
    },
    render : function(){
        google.load("visualization", "1", {'callback' : this.drawBarChart, packages:["corechart"]});
    },
    drawBarChart : function() {
        var data = google.visualization.arrayToDataTable(JSON.parse( REQUEST_DATA.data_for_bar_chart));
        var options = {
            title: 'Money spended for each category',
            hAxis: {title: 'categories', titleTextStyle: {color: 'red'}},
        };
        var chart = new google.visualization.ColumnChart(this.$('#bar_chart').get(0));
        chart.draw(data, options);
    }

});
/*View for line chart*/
var TimeSeriesView = Backbone.View.extend({
    el : "#time_series",
    initialize : function(){
        this.render();
    },
    render : function(){
        google.load("visualization", "1", {'callback' : this.drawTimeSeries, packages:["corechart"]});
    },
    drawTimeSeries : function() {
        var data = google.visualization.arrayToDataTable(JSON.parse( REQUEST_DATA.price_by_month));

        var options = {
            title: 'Money Spend for the period'
        };

        var chart = new google.visualization.LineChart(this.$('#time_series').get(0));
        chart.draw(data, options);
    }

});
/*View for staked area*/
var StackedAreaView = Backbone.View.extend({
    el : '#stacked_area',
    initialize : function(){
        this.render();
    },
    render : function(){
        google.load("visualization", "1", {'callback' : this.drawStackedArea, packages:["corechart"]});
    },
    drawStackedArea : function() {
        var data = new google.visualization.arrayToDataTable(JSON.parse( REQUEST_DATA.data_for_stacked_area));

        var options = {
            title: 'Money spend for each category for the period',
            isStacked : true,
            hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(this.$('#stacked_area').get(0));
        chart.draw(data, options);
      }
    
});
/*View for filter*/
var FilterView = Backbone.View.extend({
    el : '#filter',
    initialize : function(){
        this.render();
    },
    events: {
        'click #submit':'send_request'
    },
    render : function(){
        var that = this;
        var template = _.template($('#filter-template').html());
           that.$el.html(template);
    },
    send_request : function(){
        var date_filter = $('input[type=radio][name=time]:checked').val();
        $.ajax({
            url : 'http://127.0.0.1:8000/statistics/back_page/',
            type: "GET",
            data: {
                filter_d : date_filter
            },
            dataType : 'json',
            async : true,
            success : function(data) { 
                window. REQUEST_DATA = data;
                var pieChartView = new PieCartView();
                var barChartView = new BarChartView();
                var timeSeriesView = new TimeSeriesView();
                var stackedAreaView = new StackedAreaView();
            }
        });
    }
});
var filterView = new FilterView();
