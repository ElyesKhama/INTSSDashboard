//global variables
var index = 0;
var first = true;
var json = {
    "report": [{
        "team": "tss",
        "incidents": [
            { "summary": "INC1", "assignee": "TSS", "priority": "medium", "SLA": "2018-09-05T12:55:00" },
            { "summary": "INC1", "assignee": "TSS", "priority": "medium", "SLA": "2018-09-05T23:02:00" },
            { "summary": "INC18", "assignee": "TSS", "priority": "medium", "SLA": "2018-09-06T7:02:00" }
        ],
        "faults": [
            { "summary": "FAU1", "assignee": "TSS", "priority": "medium", "SLA": "2018-09-05T18:01:00" },
            { "summary": "FAU2", "assignee": "TSS", "priority": "medium", "SLA": "2018-09-05T15:00:59" },
            { "summary": "FAU3", "assignee": "TSS", "priority": "medium", "SLA": "2018-09-06T05:00:00" }
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "TSS", "priority": "medium", "SLA": "2018-09-05T17:00:00" },
            { "summary": "CHA3", "assignee": "TSS", "priority": "medium", "SLA": "2018-09-05T16:00:00" }
        ],
        "alarms": [
            { "summary": "ALA1", "assignee": "TSS", "priority": "medium", "SLA": "2018-09-05T17:00:00" },
            { "summary": "ALA2", "assignee": "TSS", "priority": "medium", "SLA": "2018-09-05T18:00:00" },
            { "summary": "ALA3", "assignee": "TSS", "priority": "medium", "SLA": "2018-09-05T19:00:00" }
        ]
    },
    {
        "team": "int",
        "incidents": [
            { "summary": "INC1", "assignee": "INT", "priority": "medium", "SLA": "2018-09-05T20:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "medium", "SLA": "2018-09-05T20:00:00" },
            { "summary": "INC1", "assignee": "INT", "priority": "medium", "SLA": "2018-09-05T24:00:00" }
        ],
        "faults": [
            { "summary": "FAU1", "assignee": "INT", "priority": "medium", "SLA": "2018-09-05T21:00:00" },
            { "summary": "FAU2", "assignee": "INT", "priority": "medium", "SLA": "2018-09-05T22:00:00" }
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "INT", "priority": "medium", "SLA": "2018-09-05T23:00:00" },
            { "summary": "CHA2", "assignee": "INT", "priority": "medium", "SLA": "2018-09-05T12:00:00" },
            { "summary": "CHA3", "assignee": "INT", "priority": "medium", "SLA": "2018-09-05T00:00:00" }
        ],
        "alarms": [
        ]
    },
    {
        "team": "pps",
        "incidents": [
            { "summary": "INC1", "assignee": "PPS", "priority": "medium", "SLA": "2018-09-05T19:00:00" }
        ],
        "faults": [
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "PPS", "priority": "medium", "SLA": "2018-09-05T13:00:00" },
            { "summary": "CHA2", "assignee": "PPS", "priority": "medium", "SLA": "2018-09-05T14:00:00" }
        ],
        "alarms": [
            { "summary": "ALA1", "assignee": "PPS", "priority": "medium", "SLA": "2018-09-05T15:00:00" }
        ]
    },
    {
        "team": "rti",
        "incidents": [
            { "summary": "INC1", "assignee": "RTI", "priority": "medium", "SLA": "2018-09-05T16:00:00" }
        ],
        "faults": [
            { "summary": "FAU1", "assignee": "RTI", "priority": "medium", "SLA": "2018-09-05T17:00:00" },
            { "summary": "FAU2", "assignee": "RTI", "priority": "medium", "SLA": "2018-09-05T12:00:00" }
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "RTI", "priority": "medium", "SLA": "2018-09-05T18:00:00" },
            { "summary": "CHA2", "assignee": "RTI", "priority": "medium", "SLA": "2018-09-05T18:00:00" },
            { "summary": "CHA3", "assignee": "RTI", "priority": "medium", "SLA": "2018-09-05T18:00:00" }
        ],
        "alarms": [
            { "summary": "ALA1", "assignee": "RTI", "priority": "medium", "SLA": "2018-09-05T11:00:00" },
            { "summary": "ALA2", "assignee": "RTI", "priority": "medium", "SLA": "2018-09-05T15:00:00" }
        ]
    }
    ],
    "date": "2018-28-08 08:39:44"
};

//constants
const listTitles = ['incidents', 'faults', 'changes', 'alarms'];
const delay = 15500;
const nbMaxItems = 3;

function updateTitle() {
    console.log("[BEGINING] index in updateTitle ::: " + index);
    var elem;
    //make all titles normal again
    for (var i = 0; i < 4; i++) {
        elem = document.getElementById(listTitles[i]);
        elem.style.fontWeight = "normal";
        elem.style.fontSize = "1rem";
    }

    //bold and zoom the current title
    var elemTitle = document.getElementById(listTitles[index]);
    elemTitle.style.fontWeight = "bold";
    elemTitle.style.fontSize = "50px";
}

function updateTables(index) {
    var countTimer = 0;
    for (var i = 0; i < 4; i++) {
        //recover the whole json object about differents alarms
        var item = json.report[i];
        var bodyTable = "bodyTable" + i;
        var elemBodyTable = document.getElementById(bodyTable);
        var items = 0;
        switch (index) {
            case 0:
                items = item.incidents;
                break;
            case 1:
                items = item.faults;
                break;
            case 2:
                items = item.changes;
                break;
            case 3:
                items = item.alarms;
                break;
        }

        //sort the table according to the SLA
        items.sort(function (a, b) {
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

        var badgeNumber = "badgeNumber" + i;
        var elemBadgeNumber = document.getElementById(badgeNumber);
        elemBadgeNumber.innerText = items.length;

        //remove all rows
        removeBodyRows(elemBodyTable);
        first = true;
        if (items.length != 0) {
            //fill the table
            for (var j = 0; j < items.length; j++) {
                if (j < nbMaxItems) {   //max items to display entirely
                    var line = elemBodyTable.insertRow(-1);
                    var col0 = line.insertCell(0);
                    var col1 = line.insertCell(1);
                    var col2 = line.insertCell(2);
                    var col3 = line.insertCell(3);
                    col0.innerHTML += items[j].summary;
                    col1.innerHTML += items[j].assignee;
                    col2.innerHTML += items[j].priority;

                    var nbSeconds = calculationSLA(items[j].SLA);

                    createCountDown(col3, countTimer);
                    var deadline = new Date(Date.parse(new Date()) + nbSeconds * 1000);
                    initializeClock("clockdiv" + countTimer, deadline);
                }
                else {
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
            line.innerHTML = "No " + listTitles[index] + " currently";
            line.style.fontStyle = "italic";
        }
    }
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
    if (hours < 8) {
        indexPalette = 0;
    }
    else if (hours < 16) {
        indexPalette = 1;
    }
    else {
        indexPalette = 2;
    }
    clockDiv.style.backgroundColor = palette[indexPalette];
}

function updateTimeRefresh() {
    var span = document.getElementById("timeRefresh");
    var date = new Date();
    span.innerText = date.toTimeString().substr(0, 8);  //to only have hour:minutes:seconds
}

function resetProgressBar() {
    var progressBar = document.getElementById("progressBar");
    progressBar.style.width = "0%";
    progressBar.setAttribute("aria-valuenow", 0);
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

function updateTitleTimer() {       //TODO: Factorize
    if (first == false) {
        index++;
        if (index == 4) {
            index = 0;
        }
    }
    updateTimeRefresh();
    updateTitle();
    updateTables(index);
    resetProgressBar();
    first = false;
}

function updateTitleTimer2() {      //TODO: Factorize
    
    if (index == 0) {
        index = 4;
    }
    index--;

    updateTimeRefresh();
    updateTitle();
    updateTables(index);
    resetProgressBar();
    first = false;
}

function setIntervalUpdate() {
    //periodic function
    updateProgressBar();
    var timeoutIDProgressBar = window.setInterval(updateProgressBar, (delay - 500) / 1000);

    updateTitleTimer();
    var timeoutIDTimer = window.setInterval(updateTitleTimer, delay);
}

document.addEventListener('keydown', function (e) {
    var keyCode = e.keyCode;
    var leftArrow = 37;
    var rightArrow = 39;
    var upArrow = 38;
    var downArrow = 40;

    switch (keyCode) {
        case leftArrow:
            console.log("left !");
            updateTitleTimer2();
            break;
        case rightArrow:
            console.log("right !");
            updateTitleTimer();
            break;
        default:
            break;
    }
});

setIntervalUpdate();