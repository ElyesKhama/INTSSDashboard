/****** CONSTANTS  ******/
const nbDaysBefore = 20;
const numberVariation = 20;
const numberOrigin = -10;

//move this global variables
var valueUpdate = [0,20,10,15];
var valueUpdate22 = 20;
var option;

// based on prepared DOM, initialize echarts instance
//var myChart = echarts.init(document.getElementById('chartEvolution'));

//calculate a random integer between the specified numbers
function calculateRandomNumber() {
    for(var i=0;i<valueUpdate.length;i++){
        valueUpdate[i] +=  Math.random() * numberVariation + numberOrigin;
    }

    return valueUpdate;
}

function createArrayNbRandom(nb) {
    var arrayNb = [];
    for (i = 0; i < nb; i++) {
        arrayNb[i] = returnRandomInt();
    }
    return arrayNb;
}

function calculateData() {
    var date = new Date();
    date.setDate(date.getDate() - nbDaysBefore);

    var dataFinal = [];
    var data0 = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];

        for (var i = 0; i < 24 * 2 * 20; i++) {
        var dateTmp = new Date(date.setMinutes(date.getMinutes() + 30));            //TODO: Factorize

        calculateRandomNumber();

        var objs = [];

        for (var j = 0; j < 4; j++) {
            objs[j] = { value: [dateTmp, valueUpdate[j]] };
        }

        data0.push(objs[0]);
        data1.push(objs[1]);
        data2.push(objs[2]);
        data3.push(objs[3]);
    }

    return [data0, data1, data2, data3];
}

var dataFinal = calculateData();

option = {
    title: {
        text: 'Evolution'
    },
    legend: {
        data: ['Incidents', 'Faults', 'Changes', 'Alarms']
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: true
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    series: [{
        name: 'Incidents',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: dataFinal[0]
    }, {
        name: 'Faults',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: dataFinal[1]
    }, {
        name: 'Changes',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: dataFinal[2]
    }, {
        name: 'Alarms',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: dataFinal[3]
    }
    ]
};

function drawChart(chart){
    console.log(option);
    chart.setOption(option);
}

//myChart.setOption(option);