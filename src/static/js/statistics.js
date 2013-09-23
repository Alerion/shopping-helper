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
    $(function () {
    var chart;
    
    $(document).ready(function () {
        $('#chart1').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,

            },
            title: {
                text: 'Spends by category'
            },
            tooltip: {
        	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: 'Procentege',
                data: JSON.parse(a.data_for_piechart)
            }]
        });
    });

});
    /*Bar chart*/
$(function () {
        $('#bar_chart').highcharts({
            chart: {
                type: 'column',
                margin: [ 50, 50, 100, 80]
            },
            title: {
                text: 'Money spend for each category'
            },
            xAxis: {
                categories: JSON.parse(a.categories_name),
                labels: {
                    rotation: -45,
                    align: 'right',
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'price '
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Price {point.y:.1f}',
            },
            series: [{
                name: 'Price',
                data: JSON.parse(a.price),
                dataLabels: {
                    enabled: true,
                    color: '#999',
                    align: 'center',
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif',
                        textShadow: '0 0 3px #cecece'
                    }
                }
            }]
        });
        
    });

    $(function () {
        $('#time_series').highcharts({
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Monthly Spends'
            },
            
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'price'
                },
                labels: {
                    formatter: function() {
                        return this.value
                    }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                }
            },
            series: [{
                name: 'price',
                data: JSON.parse(a.price_by_month)
            }]
        });
    });
    
    $(function () {
        $('#stacked_area').highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: 'Monthly spends by categories'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'spends'
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' '
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: JSON.parse(a.data_for_stacked_area)
        });
    });