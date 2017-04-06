
var show = false;

function showTips() {
    var x = document.getElementById("snackbar")

    if (!show) {
        x.className = "show";
        show = true;
    } else {
        x.className = "unshow";
        show = false;
    }
}