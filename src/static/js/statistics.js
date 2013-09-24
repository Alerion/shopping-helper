    /*Pie chart*/
    $(document).ready(function(){
                    window.a = {};
                    $.ajax({
                        url : 'http://127.0.0.1:8000/statistics/back_page/',
                        dataType : 'json',
                        async : false,
                        success : function(data) {
                            window.a = data;
                        }
                    });
                })
var PieCartView = Backbone.View.extend({
    el: "#chart1",
    initialize : function(){
        this.render();
    },
    render : function(){
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable(JSON.parse(a.data_for_piechart));

        var options = {
          title: 'Money spended for each category'
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart1'));
        chart.draw(data, options);
      }
    }
});
var BarChartView = Backbone.View.extend({
    el: "#bar_chart",
    initialize : function(){
        this.render();
    },
    render : function(){
        google.load("visualization", "1", {packages:["corechart"]});
        google.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(JSON.parse(a.data_for_bar_chart));
            var options = {
                title: 'Money spended for each category',
                hAxis: {title: 'categories', titleTextStyle: {color: 'red'}},

            };
            var chart = new google.visualization.ColumnChart(document.getElementById('bar_chart'));
            chart.draw(data, options);
      }
    }
});
var TimeSeriesView = Backbone.View.extend({
    el : "#time_series",
    initialize : function(){
        this.render();
    },
    render : function(){
        google.load("visualization", "1", {packages:["corechart"]});
        google.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(JSON.parse(a.price_by_month));

        var options = {
          title: 'Company Performance'
        };

        var chart = new google.visualization.LineChart(document.getElementById('time_series'));
        chart.draw(data, options);
      }
    }
});
var StackedAreaView = Backbone.View.extend({
    el : '#stacked_area',
    initialize : function(){
        this.render();
    },
    render : function(){
        google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable(JSON.parse(a.data_for_stacked_area));

        var options = {
          title: 'Company Performance',
          hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('stacked_area'));
        chart.draw(data, options);
      }
    }
});
var pieChartView = new PieCartView();
var barChartView = new BarChartView();
var timeSeriesView = new TimeSeriesView();
var stackedAreaView = new StackedAreaView();