/* -------- global variables -------- */
var timeoutIDProgressBar;
var timeoutIDTimer;
var timeOutGraph;
var index = 0;
var first = true;
var firstTimer = true;
var json = {
    "report": [{
        "team": "tss",
        "incidents": [
            { "summary": "INC1111", "assignee": "TSS", "priority": "Medium", "SLA": "2018-09-12T12:00:00" },
            { "summary": "INC1", "assignee": "TSS", "priority": "Medium", "SLA": "2018-09-12T19:14:00" },
            { "summary": "INC1", "assignee": "TSS", "priority": "Medium", "SLA": "2018-09-13T00:02:00" },
            { "summary": "INC1", "assignee": "TSS", "priority": "Medium", "SLA": "2018-09-13T07:02:00" },
            { "summary": "INC18", "assignee": "TSS", "priority": "Medium", "SLA": "2018-09-12T19:02:00" }
        ],
        "faults": [
            { "summary": "FAU1", "assignee": "TSS", "priority": "Medium", "SLA": "2018-09-12T18:01:00" },
            { "summary": "FAU2", "assignee": "TSS", "priority": "Medium", "SLA": "2018-09-13T01:00:59" },
            { "summary": "FAU3", "assignee": "TSS", "priority": "Medium", "SLA": "2018-09-13T05:00:00" }
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "TSS", "priority": "Medium", "SLA": "2018-09-12T13:00:00" },
            { "summary": "CHA1", "assignee": "TSS", "priority": "Medium", "SLA": "2018-09-12T23:00:00" },
            { "summary": "CHA3", "assignee": "TSS", "priority": "Medium", "SLA": "2018-09-12T17:00:00" }
        ],
        "alarms": [
            { "summary": "ALA1", "assignee": "TSS", "priority": "Medium", "SLA": "2018-09-12T11:00:00" },
            { "summary": "ALA2", "assignee": "TSS", "priority": "Medium", "SLA": "2018-09-12T23:00:00" },
            { "summary": "ALA3", "assignee": "TSS", "priority": "Medium", "SLA": "2018-09-13T06:00:00" }
        ]
    },
    {
        "team": "int",
        "incidents": [
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-12T14:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-12T17:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-12T20:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-12T23:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-12T22:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-12T21:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-12T20:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-13T01:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-13T02:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-13T03:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-13T04:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-13T05:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-12T20:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-12T20:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-12T20:00:00" },

            { "summary": "INC1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-13T00:00:00" }
        ],
        "faults": [
            { "summary": "FAU1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-12T21:00:00" },
            { "summary": "FAU2", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-12T22:00:00" }
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-12T23:00:00" },
            { "summary": "CHA2", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-12T13:00:00" },
            { "summary": "CHA3", "assignee": "INT", "priority": "Medium", "SLA": "2018-09-13T00:00:00" }
        ],
        "alarms": [
        ]
    },
    {
        "team": "pps",
        "incidents": [
            { "summary": "INC1", "assignee": "PPS", "priority": "Medium", "SLA": "2018-09-12T19:00:00" }
        ],
        "faults": [
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "PPS", "priority": "Medium", "SLA": "2018-09-12T12:00:00" },
            { "summary": "CHA2", "assignee": "PPS", "priority": "Medium", "SLA": "2018-09-12T21:00:00" }
        ],
        "alarms": [
            { "summary": "ALA1", "assignee": "PPS", "priority": "Medium", "SLA": "2018-09-12T20:00:00" }
        ]
    },
    {
        "team": "rti",
        "incidents": [
            { "summary": "INC1", "assignee": "RTI", "priority": "Medium", "SLA": "2018-09-12T19:00:00" }
        ],
        "faults": [
            { "summary": "FAU1", "assignee": "RTI", "priority": "Medium", "SLA": "2018-09-12T11:00:00" },
            { "summary": "FAU2", "assignee": "RTI", "priority": "Medium", "SLA": "2018-09-13T07:00:00" }
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "RTI", "priority": "Medium", "SLA": "2018-09-12T18:00:00" },
            { "summary": "CHA2", "assignee": "RTI", "priority": "Medium", "SLA": "2018-09-13T08:30:00" },
            { "summary": "CHA3", "assignee": "RTI", "priority": "Medium", "SLA": "2018-09-13T08:00:00" }
        ],
        "alarms": [
            { "summary": "ALA1", "assignee": "RTI", "priority": "Medium", "SLA": "2018-09-13T02:00:00" },
            { "summary": "ALA2", "assignee": "RTI", "priority": "Medium", "SLA": "2018-09-12T22:00:00" }
        ]
    }
    ],
    "date": "2018-28-08 08:39:44"
};

/*-------- constants  -------- */
const listTitles = ['incidents', 'faults', 'changes', 'alarms'];
const listTeams = ['TSS', 'INT', 'PPS', 'RTI'];
const delay = 150300;
const nbMaxItems = 6;
const minLevel = 3;
const medLevel = 16;
const maxLevel = 24;

/*-------- functions  -------- */
function setIntervalUpdate(way) {
    //periodic function
    updateProgressBar();
    timeoutIDProgressBar = window.setInterval(updateProgressBar, (delay - 650) / 1000);

    updateTitleTimer(way);
    timeoutIDTimer = window.setInterval(updateTitleTimer, delay, way);
}

function updateProgressBar() {
    var progressBar = document.getElementById("progressBar");
    // console.log(progressBar.style.width);
    //recov the width without the % and into an int
    widthProgressBar = parseFloat(progressBar.style.width.substr(0, progressBar.style.width.length - 1));
    //set the width : +1%
    progressBar.style.width = widthProgressBar + 0.1 + "%";
    //set the aria value now attribute (same as width)
    progressBar.setAttribute("aria-valuenow", progressBar.style.width);
}

function updateTitleTimer(way) {
    launchTimeOutGraph();
    updateIndex(way);
    updateTimeRefresh();
    updateTitle();
    updateTables(index);
    resetProgressBar();
    if (firstTimer == false) {  //not the first time
        removeGraph();
        document.getElementById('mainContainer').style.visibility = "visible";
    }
    //  setIntervalUpdate();
    firstTimer = false;
}

function launchTimeOutGraph() {
    // at the middle of the delay : hide the main container and print the graph
    timeOutGraph = setTimeout(function () {
        document.getElementById('mainContainer').style.visibility = "hidden";
        createGraph();
    }, delay / 2);
}

function updateIndex(way) {
    //going to the left 
    if (way == -1) {
        if (index == 0) {
            index = 4;
        }
        index--;
    }
    else {      //going to the right 
        if (firstTimer == false) {
            index++;
            if (index == 4) {
                index = 0;
            }
        }
    }
}

function updateTimeRefresh() {
    var span = document.getElementById("timeRefresh");
    var date = new Date();
    span.innerText = date.toTimeString().substr(0, 8);  //to only have hour:minutes:seconds
}

function updateTitle() {
    var elem;
    //make all titles normal again
    for (var i = 0; i < 4; i++) {
        elem = document.getElementById(listTeams[i]);
        elem.style.fontWeight = "normal";
        elem.style.fontSize = "1rem";
    }

    //bold and zoom the current title
    var elemTitle = document.getElementById(listTeams[index]);
    elemTitle.style.fontWeight = "bold";
    elemTitle.style.fontSize = "50px";
}

function updateTables(index) {

    var countTimer = 0;

    //recover all of the incidents/faults/alarms/changes depending on the current index
    var item = json.report[index];

    for (var i = 0; i < 4; i++) {
        var bodyTable = "bodyTable" + i;
        var elemBodyTable = document.getElementById(bodyTable);
        var type = listTitles[i];
        var items = item[type];

        items = sortArray(items);

        var badgeNumber = "badgeNumber" + i;
        var elemBadgeNumber = document.getElementById(badgeNumber);
        elemBadgeNumber.innerText = items.length;

        //remove all rows
        removeBodyRows(elemBodyTable);
        first = true;

        if (items.length != 0) {                        //TODO: Factorize
            //fill the table
            for (var j = 0; j < items.length; j++) {
                if (j < nbMaxItems) {   //max items to display entirely
                    fillTable(elemBodyTable, items[j], countTimer);
                }
                else {      //too many items 
                    var line;
                    var col;
                    if (first == true) {    //first time you enter in this portion of code
                        line = elemBodyTable.insertRow(-1);
                        col = line.insertCell(0);
                        first = false;
                    }
                    col.innerHTML += items[j].summary + " - ";
                    col.setAttribute("colspan", 4);
                }
                countTimer++;
            }
        } else {        //no items
            var line = elemBodyTable.insertRow(-1);
            var col = line.insertCell(0);
            col.innerHTML = "No " + listTitles[i] + " currently";
            col.setAttribute("colspan", 4);
            col.style.fontStyle = "italic";
        }
    }
}

function sortArray(array) {
    //sort the table according to the SLA
    array.sort(function (a, b) {
        var aTime = a.SLA;
        var bTime = b.SLA;
        if (aTime < bTime) {
            return -1;
        } else if (aTime > bTime) {
            return 1;
        } else {
            return 0;
        }
    });

    return array;
}

function fillTable(elemBodyTable, item, countTimer) {
    var line = elemBodyTable.insertRow(-1);
    var col0 = line.insertCell(0);
    var col1 = line.insertCell(1);
    var col2 = line.insertCell(2);
    var col3 = line.insertCell(3);
    col0.innerHTML += item.summary;
    col1.innerHTML += item.assignee;
    col2.innerHTML += item.priority;

    var nbSeconds = calculationSLA(item.SLA);
    createCountDown(col3, countTimer);
    var deadline = new Date(Date.parse(new Date()) + nbSeconds * 1000);
    initializeClock("clockdiv" + countTimer, deadline);
}

function calculationSLA(endTime) {
    var dateNow = new Date();
    var dateEnd = new Date(endTime);

    //calculate the nb of seconds between now and the end date
    var nbSeconds = Math.round((dateEnd - dateNow) / 1000);
    return nbSeconds;
}

function createCountDown(parentElement, countTimer) {
    //create the count down element

    var divClockDiv = document.createElement('div');
    divClockDiv.id = "clockdiv" + countTimer;  //TODO: + number 
    divClockDiv.className = "clockdiv";

    var divContainerHours = document.createElement('div');
    var spanHours = createSpan("hours");
    divContainerHours.appendChild(spanHours);

    var divContainerMinutes = document.createElement('div');
    var spanMinutes = createSpan("minutes");
    divContainerMinutes.appendChild(spanMinutes);

    var divContainerSeconds = document.createElement('div');
    var spanSeconds = createSpan("seconds");
    divContainerSeconds.appendChild(spanSeconds);

    divClockDiv.appendChild(divContainerHours);
    divClockDiv.appendChild(divContainerMinutes);
    divClockDiv.appendChild(divContainerSeconds);

    parentElement.appendChild(divClockDiv);
}

function createSpan(type) {
    var span = document.createElement('span');
    span.className = type;
    return span;
}

function removeBodyRows(elem) {
    //remove all rows of the table
    var length = elem.getElementsByTagName("tr").length;
    for (var i = 0; i < length; i++) {
        elem.deleteRow(-1);
    }
}

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var time = getTimeRemaining(endtime);

        hoursSpan.innerHTML = ('0' + time.hours).slice(-2) + "h";
        minutesSpan.innerHTML = ('0' + time.minutes).slice(-2) + "m";
        secondsSpan.innerHTML = ('0' + time.seconds).slice(-2) + "s";
        updateColor(time, clock);

        /*  if (time.total <= 0) {
             //time is 0 : remove the corresponding line in the table
             clock.parentNode.parentNode.parentNode.removeChild(clock.parentNode.parentNode);
             clearInterval(timeinterval);
         } */
    }
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

function updateColor(time, clockDiv) {
    var hours = time.hours;

    //from red to green
    var palette = [
        "#FF0000",      //red
        "#FFCC00",      //amber
        "#00FF00"       //green
    ];

    var indexPalette = 0;
    if (hours < minLevel) {
        indexPalette = 0;
        if (clockDiv.className.indexOf("blinking") == -1) {
            clockDiv.className += " blinking";
        }
    }
    else if (hours < medLevel) {
        indexPalette = 1;
    }
    else {
        indexPalette = 2;
    }
    clockDiv.style.backgroundColor = palette[indexPalette];
}

function resetProgressBar() {
    var progressBar = document.getElementById("progressBar");
    progressBar.style.width = "0%";
    progressBar.setAttribute("aria-valuenow", 0);
}

document.addEventListener('keydown', function (e) {
    var keyCode = e.keyCode;
    var leftArrow = 37;
    var rightArrow = 39;
    var upArrow = 38;
    var downArrow = 40;

    switch (keyCode) {
        case leftArrow:
            clearTimers();
            setIntervalUpdate(-1);
            break;
        case rightArrow:
            clearTimers();
            setIntervalUpdate(+1);
            break;
        case upArrow:
            break;
        case downArrow:
            break;
        default:
            break;
    }
});

function clearTimers() {
    clearTimeout(timeOutGraph);
    window.clearInterval(timeoutIDProgressBar);
    window.clearInterval(timeoutIDTimer);
}

//create the graph element and add it to the body
function createGraph() {
    var div = document.createElement('div');
    div.id = "chartEvolution";
    div.style.width = "50%";
    div.style.height = "50vh";
    div.style.position = "fixed";
    div.style.top = "0";
    div.style.bottom = "0";
    div.style.left = "0";
    div.style.right = "0";
    div.className = "scale-up-center";

    document.body.appendChild(div);

    var myChart = echarts.init(div);
    drawChart(myChart);
}

function removeGraph() {
    if (document.getElementById("chartEvolution") != null) {
        var graph = document.getElementById("chartEvolution");
        graph.parentNode.removeChild(graph);
    }
}

function changeColor() {
    var backgroundColor = getComputedStyle(document.getElementById("mainContainer")).backgroundColor;
    var tablesContainer = document.getElementsByClassName("tableContainer");

    if (backgroundColor == 'rgb(0, 0, 0)') {        //background is black
        document.getElementById("mainContainer").style.backgroundColor = "white";
        [].forEach.call(tablesContainer, function (el) {
            el.style.color = "black";
        });
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    }
    else {//background is white
        document.getElementById("mainContainer").style.backgroundColor = "black";
        [].forEach.call(tablesContainer, function (el) {
            el.style.color = "white";
        });
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
    }
}

document.getElementById("buttonChangeTheme").onclick = function () {
    changeColor();
}

setIntervalUpdate(1);