var fontSize;
initpage();

function initpage() {
    var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
    var _html = document.getElementsByTagName("html")[0];
    _html.style.fontSize = (view_width / 375) * 100 + "px";
    fontSize = (view_width / 375) * 100;
}
window.onresize = function() {
    initpage();
}