var timeoutID;  
var index = 0;

function updateTitle(){
    var elemTitle = document.getElementById("titleSlide");
    var listTitles = ['Incidents','Alarms','Faults','Changes'];
    elemTitle.innerHTML = listTitles[index];
    index++;
    if(index == 4){
        index = 0;
    }
}

function updateTitleTimer(){
    timeoutID = window.setInterval(updateTitle,2000);
}

updateTitleTimer();