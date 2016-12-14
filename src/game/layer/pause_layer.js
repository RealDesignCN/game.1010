/**
 * Created by zhaojm on 15/4/6.
 */
game.PauseLayer = cc.Layer.extend({

    _menu : null,
    ctor:function(){
        this._super();

        var winSize = cc.winSize;
        var self = this;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true   ,       // true 为不向下传递
            onTouchBegan: function(touch, event){return true;},
        }, this);





        var homeItem = new cc.MenuItemImage(res.home_png, res.home_png, res.home_png, function(){

        }, this);

        var startItem = new cc.MenuItemImage(res.start_png, res.start_png, res.start_png, function(){
            self.removeFromLayer();


        }, this);

        this._menu = new cc.Menu(homeItem, startItem);
        this._menu.alignItemsHorizontally();
        this.addChild(this._menu);
        this._menu.attr({
            x : winSize.width / 2,
            y : 0,
            //scale : 0.7,
        });
        this._menu.runAction(new cc.Sequence(
            new cc.MoveTo(0.4, cc.p(winSize.width / 2, winSize.height / 2)).easing(cc.easeBackOut()),
            new cc.CallFunc(function(){
                cc.log('pause..');
                cc.director.pause();
            })
        ));



    },


    removeFromLayer : function(){
        var self = this;
        var winSize = cc.winSize;
        cc.director.resume();
        this._menu.runAction(new cc.Sequence(
            new cc.MoveTo(0.4, cc.p(winSize.width / 2, -10)).easing(cc.easeBackIn()),
            new cc.CallFunc(function(){
                self.removeFromParent();
            })
        ));
    },


});