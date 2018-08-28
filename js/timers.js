function configListener(unit, amount, total, elem) {
    var triggerTime = 60; //seconds
    var idCircle = elem.attr("id").substr(-1);
    var circles = document.getElementsByClassName("circle");

    if (total == triggerTime) {
        if (total % 2 == 0) {
            circles[idCircle].style.backgroundColor = "red";
        }
        else {
            circles[idCircle].style.backgroundColor = "white";
        }
    }
    if (total == 0) {
        elem.TimeCircles().destroy();
    }
}

$(document).ready(function () {
    var nbTimers = 9;
    var nomId;
    var i;
    for (i = 0; i < nbTimers; i++) {
        nomId = "#timer" + i;
        $(nomId).TimeCircles({
            time: {
                Days: { color: "#C0C8CF", show: false }
            }
        }).addListener(function (unit, amount, total) { configListener(unit, amount, total, $(this)) });
    }
});