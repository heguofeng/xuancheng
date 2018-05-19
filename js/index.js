var fontSize;
initpage();
let musicFlag = true;
playMusic();

function initpage() {
    var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
    var _html = document.getElementsByTagName("html")[0];
    _html.style.fontSize = (view_width / 375) * 100 + "px";
    fontSize = (view_width / 375) * 100;
}
window.onresize = function() {
    initpage();
}
$("#start").click(function() {
    window.location.href = "./vote.html"
});
$("#music").click(function() {
    playMusic();
});

//音乐播放
function playMusic() {
    let player = $("#bgMusic")[0];
    if (musicFlag) {
        $("#music").removeClass("xuanzhuan");
        musicFlag = false;
        player.pause();
    } else {
        $("#music").addClass("xuanzhuan");
        musicFlag = true;
        player.play();
    }
}