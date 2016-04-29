/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/14
 */
game.MenuLayer = cc.Layer.extend({
    ctor:function(callback){
        this._super();
        var winSize = cc.winSize;
        var logo = new cc.Sprite(res.logo_png);
        logo.attr({
            x : winSize.width / 2,
            y : winSize.height - logo.getContentSize().height / 2 - 10,
        });
        this.addChild(logo);




        var self = this;
        var restart_frame = cc.spriteFrameCache.getSpriteFrame('gameover/restart.png');
        var restartItem = new cc.MenuItemImage(restart_frame, restart_frame, restart_frame, function(){

            callback();

            this.removeFromParent();

        }, this);
        restartItem.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.1));
        restartItem.setAnchorPoint(cc.p(0.5,0.5));





        var menu = new cc.Menu(restartItem);
        //menu.alignItemsVertically();
        menu.setPosition( cc.p(0, 0));
        //menu.setContentSize(bgSize);
        this.addChild(menu);

    },
});