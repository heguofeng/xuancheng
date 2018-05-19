var fontSize;
initpage();
let musicFlag = true;
playMusic();
let pageNum = 0;

function initpage() {
    var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
    var _html = document.getElementsByTagName("html")[0];
    _html.style.fontSize = (view_width / 375) * 100 + "px";
    fontSize = (view_width / 375) * 100;
}
window.onresize = function() {
        initpage();
    }
    //所有的数据数组
let dataArr = [];
let btnFlag = true;
let msg;
//点击图片弹出弹框
$("#cardBox").on('click', ".mainPic", function() {
    let id = $(this).children('img').data("id");
    let data = dataArr[(id - 1)]; //对应的数据
    console.log(data.vote_info.url)
    $("#dImg img").attr("src", data.vote_info.url);
    $("#dImg img").attr("alt", data.vote_info.name);
    $("#dTitle").text(data.vote_info.name);
    $("#content").text(data.vote_info.intro);
    $("#dBtn").attr("data-id", data.vote_id);
    $("#details").fadeIn();
    $("#cover").fadeIn();
    $("#cover").css("height", $(document).height());
});
//投票按钮
$("#cardBox").on("click", ".btn", function() {
    if (btnFlag == true) {
        console.log("ajax", btnFlag)
        let id = $(this).data("id");
        vote(id);
    } else {
        console.log("禁止", btnFlag)
        $.toptip(msg, 'error')
    }

});
//弹出层按钮
$("#dBtn").click(function() {
    if (btnFlag == true) {
        console.log("ajax", btnFlag)
        let id = $(this).data("id");
        vote(id);
    } else {
        console.log("禁止", btnFlag)
        $.toptip(msg, 'error')
    }
});
//投票
function vote(id) {
    $.showLoading();
    $.ajax({
        url: "http://vote.zjqq.local/vote/vote",
        type: "GET",
        data: {
            "vote_id": id
        },
        dataType: "json",
        success: res => {
            $.hideLoading();
            //成功
            if (res.code == 0) {
                btnFlag = true;
                $.toptip(res.msg, 1500, 'success');
                //静态+1
                let count = $(`.btn[data-id='${id}']`).prev().children("span").text();
                $(`.btn[data-id='${id}']`).prev().children("span").text(count++);

            } else if (res.code == -1) { //投票不成功
                btnFlag = false;
                msg = res.msg;
                $.toptip(res.msg, 'error');
                $(".btn").css("color", "#505050");
                $("#dBtn").css("color", "#505050");

            } else if (res.code == 1) { //需要关注
                $.toptip(res.msg, 5000, 'warning');
                $("#success").fadeIn("slow");
            }
        },
        error: err => {
            console.log(err);
        }
    });
}
//点击遮罩层
$("#cover").on("click", function() {
    $("#cover").fadeOut();
    $("#details").fadeOut();
    $("#success").fadeOut();
});
//禁止遮罩层滚动
$("#cover").on('touchmove', function(e) {
    e.preventDefault();
});
//第一次获取所有数据
$(document).ready(function() {
    $.ajax({
        url: "http://vote.zjqq.info/vote/get-vote-res",
        type: "GET",
        dataType: "json",
        success: res => {
            console.log(res);

            dataArr = res.data;
            loadPage();
        },
        error: err => {
            console.log(err)
        }
    })
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
var loading = false; //状态标记
$(document.body).infinite(100).on("infinite", function() {
    if (loading) return;
    loading = true;
    if (pageNum < 4) {
        loadPage();
    } else {
        $(".weui-loadmore").hide();
    }
});

function loadPage() {
    console.log("当前页面是", pageNum)
    let box = $("#cardBox");
    for (let i = (10 * pageNum); i < (10 + 10 * pageNum); i++) {
        let ret = /\（/
        if (ret.test(dataArr[i].vote_info.name)) {
            box.append(
                `
                        <div class="card">
                            <div class="c-title small">${dataArr[i].vote_info.name}</div>
                            <div class="mainPic" id="mainPic">
                                <img src="${dataArr[i].vote_info.url}" data-id="${dataArr[i].vote_id}" alt="${dataArr[i].vote_info.name}">
                            </div>
                            <div class="info">
                                <img src="./imgs/nums.png" alt="票数">
                                <span>${dataArr[i].vote_count}</span>
                            </div>
                            <div class="btn" data-id="${dataArr[i].vote_id}">投他一票</div>
                        </div>
                    `
            )
        } else {
            box.append(
                `
                        <div class="card">
                            <div class="c-title">${dataArr[i].vote_info.name}</div>
                            <div class="mainPic" id="mainPic">
                                <img src="${dataArr[i].vote_info.url}" data-id="${dataArr[i].vote_id}" alt="${dataArr[i].vote_info.name}">
                            </div>
                            <div class="info">
                                <img src="./imgs/nums.png" alt="票数">
                                <span>${dataArr[i].vote_count}</span>
                            </div>
                            <div class="btn" data-id="${dataArr[i].vote_id}">投他一票</div>
                        </div>
                    `
            )
        }

    }

    pageNum++;

    loading = false;
}