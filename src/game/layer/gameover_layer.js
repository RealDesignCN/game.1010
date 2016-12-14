/**
 * Created by zhaojm on 15/4/5.
 */
game.GameOverLayer = cc.Layer.extend({

    _score : null,
    _node : null,
    ctor:function(data){
        this._super();
        var self = this;
        var winSize = cc.winSize;

        cc.log('data...', data);
        this.setHighScore('1010!_data', data);



        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true   ,       // true 为不向下传递
            onTouchBegan: function(touch, event){return true;},
        }, this);










        this._node = new cc.Node();

        var scoreSpr = new cc.Sprite(res.score_png);
        var scoreLbl = cc.LabelTTF.create(data.score + '', 'Arial', 36);
        var shareItem = new cc.MenuItemImage(res.share_png, res.share_png, res.share_png, function(){
            game._Utils.goToHomePage();
        }, this);
        var homeItem = new cc.MenuItemImage(res.home_png, res.home_png, res.home_png, function(){
            game._Utils.goToHomePage();
        }, this);
        var restartItem = new cc.MenuItemImage(res.restart_png, res.restart_png, res.restart_png, function(){
            cc.director.runScene(new game.GameScene());
        }, this);
        this._menu = new cc.Menu(homeItem, restartItem, shareItem);
        scoreSpr.addChild(scoreLbl);
        this._node.addChild(scoreSpr);
        this._node.addChild(this._menu);
        this.addChild(this._node);


        this._node.attr({
            x:winSize.width / 2,
            y:0,
            width : scoreSpr.width,
            height : scoreSpr.height + shareItem.height + homeItem.height,
            anchorX : 0.5,
            anchorY : 0.5,
        });

        scoreSpr.attr({
            x : 0,
            y : this._node.height,
            anchorX : 0,
            anchorY : 1,
        });

        scoreLbl.attr({
            x : scoreSpr.width / 2,
            y : 0,
            anchorX : 0.5,
            anchorY : 0,
            color : cc.color(255, 255, 255),
        });

        shareItem.attr({
            anchorX : 0.5,
            anchorY : 0,
            x : this._node.width / 2,
            y : 0,
        });


        homeItem.attr({
            anchorX : 0,
            anchorY : 0,
            x : 0,
            y : shareItem.height,
        });

        restartItem.attr({
            anchorX : 1,
            anchorY : 0,
            x : this._node.width,
            y : shareItem.height,
        });

        this._menu.attr({
            x : 0,
            y : 0,
            anchorX : 0,
            anchorY : 0,
            width : this._node.width,
            height : shareItem.height + homeItem.height,

        });




        this._node.runAction(new cc.Sequence(
            new cc.MoveTo(0.4, cc.p(winSize.width / 2, winSize.height * 0.5)).easing(cc.easeBackOut()),
            new cc.CallFunc(function(){
                cc.log('pause..');
            })
        ));





    },



    setHighScore : function(key, value){
        var temp = cc.sys.localStorage.getItem(key);
        temp = JSON.parse(temp);

        cc.log('temp==', temp, 'value=', value);

        if(temp == null || temp == "" || temp == 'undefined'){
            cc.sys.localStorage.setItem(key, JSON.stringify(value));
        }else{
            if(!temp.score){
                cc.sys.localStorage.setItem(key, JSON.stringify(value));
            }else if(temp.score < value.score) {
                cc.sys.localStorage.setItem(key, JSON.stringify(value));
            }
        }

        return JSON.parse(cc.sys.localStorage.getItem(key)).score;
    },

    getHighScore : function(key){
        var temp = cc.sys.localStorage.getItem(key);
        temp = JSON.parse(temp);

        cc.log('temp==', temp, 'value=', value);

        if(temp == null || temp == "" || temp == 'undefined'){
            return null;
        }else{
            return temp.score;
        }
    },


});