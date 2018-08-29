var timeoutID;
var index = 0;
var json = {
    "report": [{
        "team": "tss",
        "incidents": [
            { "summary": "INC1", "assignee": "TSS", "priority": "medium", "SLA": "2018-08-29T16:00:00" },
            { "summary": "INC3", "assignee": "TSS", "priority": "medium", "SLA": "2018-08-29T16:00:00" }
        ],
        "faults": [
            { "summary": "FAU1", "assignee": "TSS", "priority": "medium", "SLA": "2018-08-29T17:00:00" },
            { "summary": "FAU2", "assignee": "TSS", "priority": "medium", "SLA": "2018-08-29T18:00:00" },
            { "summary": "FAU3", "assignee": "TSS", "priority": "medium", "SLA": "2018-08-29T19:00:00" }
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "TSS", "priority": "medium", "SLA": "2018-08-29T20:00:00" },
            { "summary": "CHA3", "assignee": "TSS", "priority": "medium", "SLA": "2018-08-29T21:00:00" }
        ],
        "alarms": [
            { "summary": "ALA1", "assignee": "TSS", "priority": "medium", "SLA": "2018-08-29T22:00:00" },
            { "summary": "ALA2", "assignee": "TSS", "priority": "medium", "SLA": "2018-08-29T23:00:00" },
            { "summary": "ALA3", "assignee": "TSS", "priority": "medium", "SLA": "2018-08-30T00:00:00" }
        ]
    },
    {
        "team": "int",
        "incidents": [
            { "summary": "INC1", "assignee": "INT", "priority": "medium", "SLA": "2018-08-30T01:00:00" }
        ],
        "faults": [
            { "summary": "FAU1", "assignee": "INT", "priority": "medium", "SLA": "2018-08-30T02:00:00" },
            { "summary": "FAU2", "assignee": "INT", "priority": "medium", "SLA": "2018-08-30T03:00:00" }
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "INT", "priority": "medium", "SLA": "2018-08-30T04:00:00" },
            { "summary": "CHA2", "assignee": "INT", "priority": "medium", "SLA": "2018-08-30T05:00:00" },
            { "summary": "CHA3", "assignee": "INT", "priority": "medium", "SLA": "2018-08-30T06:00:00" }
        ],
        "alarms": [
        ]
    },
    {
        "team": "pps",
        "incidents": [
            { "summary": "INC1", "assignee": "PPS", "priority": "medium", "SLA": "2018-08-30T07:00:00" }
        ],
        "faults": [
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "PPS", "priority": "medium", "SLA": "2018-08-30T08:00:00" },
            { "summary": "CHA2", "assignee": "PPS", "priority": "medium", "SLA": "2018-08-30T09:00:00" }
        ],
        "alarms": [
            { "summary": "ALA1", "assignee": "PPS", "priority": "medium", "SLA": "2018-08-30T10:00:00" }
        ]
    },
    {
        "team": "rti",
        "incidents": [
            { "summary": "INC1", "assignee": "RTI", "priority": "medium", "SLA": "2018-08-30T11:00:00" }
        ],
        "faults": [
            { "summary": "FAU1", "assignee": "RTI", "priority": "medium", "SLA": "2018-08-30T12:00:00" },
            { "summary": "FAU2", "assignee": "RTI", "priority": "medium", "SLA": "2018-08-30T13:00:00" }
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "RTI", "priority": "medium", "SLA": "2018-08-30T14:00:00" },
            { "summary": "CHA2", "assignee": "RTI", "priority": "medium", "SLA": "2018-08-30T14:00:00" },
            { "summary": "CHA3", "assignee": "RTI", "priority": "medium", "SLA": "2018-08-30T14:00:00" }
        ],
        "alarms": [
            { "summary": "ALA1", "assignee": "RTI", "priority": "medium", "SLA": "2018-08-30T14:00:00" },
            { "summary": "ALA2", "assignee": "RTI", "priority": "medium", "SLA": "2018-08-30T14:00:00" }
        ]
    }
    ],
    "date": "2018-28-08 08:39:44"
};

const listTitles = ['incidents', 'faults', 'changes', 'alarms'];


function updateTitle() {

    var elem;
    for(var i=0;i<4;i++){
        elem =  document.getElementById(listTitles[i]);
        elem.style.fontWeight = "normal";
        elem.style.fontSize = "1rem";

    }

    var elemTitle = document.getElementById(listTitles[index]);
    elemTitle.style.fontWeight = "bold";
    elemTitle.style.fontSize = "50px";
}

function updateTables(index) {
    var countTimer = 0;
    for (var i = 0; i < 4; i++) {
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

        removeBodyRows(elemBodyTable);

        for (var j = 0; j < items.length; j++) {
            var line = elemBodyTable.insertRow(-1);
            var col0 = line.insertCell(0);
            var col1 = line.insertCell(1);
            var col2 = line.insertCell(2);
            var col3 = line.insertCell(3);
            var col4 = line.insertCell(4);
            col0.innerHTML += items[j].summary;
            col1.innerHTML += items[j].assignee;
            col2.innerHTML += items[j].priority;

            var nbSeconds = calculationSLA(items[j].SLA);

            createCountDown(col3, countTimer);
            var deadline = new Date(Date.parse(new Date()) + nbSeconds * 1000);
            initializeClock("clockdiv" + countTimer, deadline);


            //insertDivs(nbSeconds, col3, col4, countTimer);

            countTimer++;
        }
    }
}

function calculationSLA(endTime) {
    var dateNow = new Date();
    var dateEnd = new Date(endTime);
    var nbSeconds = Math.round((dateEnd - dateNow) / 1000);
    console.log(nbSeconds);
    return nbSeconds;
}

/* function insertDivs(nbSeconds, col3, col4, count) {
    var divContainer = document.createElement('div');
    divContainer.className = "container containerTimeCircle";
    var divTimer = document.createElement('div');
    divTimer.className = "container timerTest timerDiv";
    divTimer.id = "timer" + count;
    divTimer.setAttribute("data-timer", nbSeconds);
    var divCircle = document.createElement('div');
    divCircle.className = "circle";

    var divInsertedContainer = col3.appendChild(divContainer);
    var divInsertedTimer = divInsertedContainer.appendChild(divTimer);
    col4.appendChild(divCircle);

    createTimer("#"+divTimer.id);
} */

function createCountDown(parentElement, countTimer) {
    var divClockDiv = document.createElement('div');
    divClockDiv.id = "clockdiv" + countTimer;  //TODO: + number 
    divClockDiv.className = "clockdiv";

    var divContainerHours = document.createElement('div');
    var spanHours = createSpan("hours");
    var divHours = createDiv("Hours");
    divContainerHours.appendChild(spanHours);
    divContainerHours.appendChild(divHours);

    var divContainerMinutes = document.createElement('div');
    var spanMinutes = createSpan("minutes");
    var divMinutes = createDiv("Minutes");
    divContainerMinutes.appendChild(spanMinutes);
    divContainerMinutes.appendChild(divMinutes);

    var divContainerSeconds = document.createElement('div');
    var spanSeconds = createSpan("seconds");
    var divSeconds = createDiv("Seconds");
    divContainerSeconds.appendChild(spanSeconds);
    divContainerSeconds.appendChild(divSeconds);

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

function createDiv(type) {
    var div = document.createElement('div');
    div.className = "smalltext";
    div.innerText = type;
    return div;
}

function removeBodyRows(elem) {
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

        hoursSpan.innerHTML = ('0' + time.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + time.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + time.seconds).slice(-2);

        /*if(t.seconds == 50){
          secondsSpan.style = "background-color: blue";
        }*/

        updateColor(time, hoursSpan, minutesSpan, secondsSpan);

        if (time.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

function updateColor(time, hoursSpan, minutesSpan, secondsSpan) {
    var hours = time.hours;
    var minutes = time.minutes;
    var seconds = time.seconds;

    var palette = [
        "#FF0000",
        "#F30101",
        "#FD0400",
        "#FB4300",
        "#FB4300",
        "#FC5400",
        "#FD6601",
        "#FD8200",
        "#FD9000",
        "#FCA000",
        "#FCB800",
        "#FCC500",
        "#FDD300",
        "#F0FD01",
        "#F0FD01",
        "#DAFC00",
        "#C4FB00",
        "#B9FD01",
        "#A6FE00",
        "#87FD00",
        "#62FD01",
        "#00FE14",
        "#01FF2B",
        "#01FB50"
      ];

    hoursSpan.style.backgroundColor = palette[hours];
    minutesSpan.style.backgroundColor = palette[hours];
    secondsSpan.style.backgroundColor = palette[hours];

      
}

function updateTitleTimer() {
    updateTitle();
    updateTables(index);
    index++;
    if (index == 4) {
        index = 0;
    }
}

function setIntervalUpdate() {
    updateTitleTimer();
    timeoutID = window.setInterval(updateTitleTimer, 1000);
}

setIntervalUpdate();