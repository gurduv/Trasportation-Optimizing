function CustomAlert() {
    this.render = function (dialog) {
        var winWidth = window.innerWidth;
        var winHight = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winHight + "px";
        dialogbox.style.left = (winWidth / 2) - (550 * .5) + "px";
        dialogbox.style.top = "250px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = "הודעה חשובה";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
    }
    this.ok = function () {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
}
var Alert = new CustomAlert();