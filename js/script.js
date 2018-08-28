var timeoutID;
var index = 0;
var json = {
    "report": [{
        "team": "tss",
        "incidents": [
            { "summary": "INC1", "assignee": "TSS", "priority": "...", "SLA": "..." },
            { "summary": "INC2", "assignee": "TSS", "priority": "...", "SLA": "..." },
            { "summary": "INC3", "assignee": "TSS", "priority": "...", "SLA": "..." }
        ],
        "faults": [
            { "summary": "FAU1", "assignee": "TSS", "priority": "...", "SLA": "..." },
            { "summary": "FAU2", "assignee": "TSS", "priority": "...", "SLA": "..." },
            { "summary": "FAU3", "assignee": "TSS", "priority": "...", "SLA": "..." }
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "TSS", "priority": "...", "SLA": "..." },
            { "summary": "CHA2", "assignee": "TSS", "priority": "...", "SLA": "..." },
            { "summary": "CHA3", "assignee": "TSS", "priority": "...", "SLA": "..." }
        ],
        "alarms": [
            { "summary": "ALA1", "assignee": "TSS", "priority": "...", "SLA": "..." },
            { "summary": "ALA2", "assignee": "TSS", "priority": "...", "SLA": "..." },
            { "summary": "ALA3", "assignee": "TSS", "priority": "...", "SLA": "..." }
        ]
    },
    {
        "team": "int",
        "incidents": [
            { "summary": "INC1", "assignee": "INT", "priority": "...", "SLA": "..." }
        ],
        "faults": [
            { "summary": "FAU1", "assignee": "INT", "priority": "...", "SLA": "..." },
            { "summary": "FAU2", "assignee": "INT", "priority": "...", "SLA": "..." }
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "INT", "priority": "...", "SLA": "..." },
            { "summary": "CHA2", "assignee": "INT", "priority": "...", "SLA": "..." },
            { "summary": "CHA3", "assignee": "INT", "priority": "...", "SLA": "..." }
        ],
        "alarms": [
        ]
    },
    {
        "team": "pps",
        "incidents": [
            { "summary": "INC1", "assignee": "PPS", "priority": "...", "SLA": "..." }
        ],
        "faults": [
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "PPS", "priority": "...", "SLA": "..." },
            { "summary": "CHA2", "assignee": "PPS", "priority": "...", "SLA": "..." }
        ],
        "alarms": [
            { "summary": "ALA1", "assignee": "PPS", "priority": "...", "SLA": "..." }
        ]
    },
    {
        "team": "rti",
        "incidents": [
            { "summary": "INC1", "assignee": "RTI", "priority": "...", "SLA": "..." }
        ],
        "faults": [
            { "summary": "FAU1", "assignee": "RTI", "priority": "...", "SLA": "..." },
            { "summary": "FAU2", "assignee": "RTI", "priority": "...", "SLA": "..." }
        ],
        "changes": [
            { "summary": "CHA1", "assignee": "RTI", "priority": "...", "SLA": "..." },
            { "summary": "CHA2", "assignee": "RTI", "priority": "...", "SLA": "..." },
            { "summary": "CHA3", "assignee": "RTI", "priority": "...", "SLA": "..." }
        ],
        "alarms": [
            { "summary": "ALA1", "assignee": "RTI", "priority": "...", "SLA": "..." },
            { "summary": "ALA2", "assignee": "RTI", "priority": "...", "SLA": "..." }
        ]
    }
    ],
    "date": "2018-28-08 08:39:44"
};

const listTitles = ['Incidents', 'Faults', 'Changes', 'Alarms'];


function updateTitle() {
    var elemTitle = document.getElementById("titleSlide");
    elemTitle.innerHTML = listTitles[index];
    updateTables(index);
    index++;
    if (index == 4) {
        index = 0;
    }
}

function updateTables(index) {
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
            col0.innerHTML += items[j].summary;
            col1.innerHTML += items[j].assignee;
            col2.innerHTML += items[j].priority;
            col3.innerHTML += items[j].SLA;
            //insérer une ligne de tableau
            //mettre le bon texte
        }
    }
}

function removeBodyRows(elem) {
    var length = elem.getElementsByTagName("tr").length;
    for (var i = 0; i < length; i++) {
        elem.deleteRow(-1);
    }
}

function updateTitleTimer() {
    timeoutID = window.setInterval(updateTitle, 1000);
}

updateTitleTimer();