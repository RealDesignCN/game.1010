/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/18
 */
game._Utils = {};

game._Utils.goToHomePage = function(){
    if(game._Config.language == game._Enum.language.en){
        window.location.href="http://ookor.com";
    }else {
        window.location.href="http://www.59600.com";
    }
};

