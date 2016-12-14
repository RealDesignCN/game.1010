



var loadingRes = {
    //loading_png : "res/" + game._Config.language + "/loading.png"
};

var loaderRes = {
    //loader_plist : "res/" + game._Config.language + "/plist/loader.plist",
    //loader_png : "res/" + game._Config.language + "/plist/loader.png",
    //loader_bg_jpg : "res/" + game._Config.language + "/jpg/loader_bg.jpg",
    //loading_bar_png : "res/common/loading_bar.png",
    //loading2_png : "res/" + game._Config.language + "/loading2.png",
};

var res = {
    rect_png : "res/common/rect.png",
    pause_png : "res/common/pause.png",
    cup_png : "res/common/cup.png",
    logo_png : "res/common/logo.png",
    home_png : "res/common/home.png",
    start_png : "res/common/start.png",
    restart_png : "res/common/restart.png",
    share_png : "res/common/share.png",
    score_png : "res/common/score.png",
};


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

//cc.log(g_resources);


var g_loaderResources = [];
//for (var i in loaderRes) {
//    g_loaderResources.push(loaderRes[i]);
//}
