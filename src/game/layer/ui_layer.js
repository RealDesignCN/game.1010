/**
 * Created by zhaojm on 15/4/14.
 */
game.UILayer = cc.Layer.extend({

    _scoreLbl : null,

    _bestScoreLbl : null,
    ctor:function(){
        this._super();
        var winSize = cc.winSize;
        var self = this;

        var logo = new cc.Sprite(res.logo_png);
        logo.attr({
            x : winSize.width * 0.5,
            y : winSize.height - 10,
            anchorY : 1,
        });
        this.addChild(logo);



        this._scoreLbl = cc.LabelTTF.create('0', 'Arial', 36);
        this._scoreLbl.setColor(new cc.Color(91, 191, 227));
        this._scoreLbl.setPosition(cc.p(winSize.width * 0.3, winSize.height  - 100));
        this._scoreLbl.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._scoreLbl);

        var cup = new cc.Sprite(res.cup_png);
        cup.attr({
            x : winSize.width * 0.5,
            y : winSize.height - 100,
            //scale : 0.5,
        });
        this.addChild(cup);


        this._bestScoreLbl = cc.LabelTTF.create('0', 'Arial', 36);
        this._bestScoreLbl.setColor(new cc.Color(91, 191, 227));
        this._bestScoreLbl.setPosition(cc.p(winSize.width * 0.7, winSize.height  - 100));
        this._bestScoreLbl.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._bestScoreLbl);


        var pauseItem = new cc.MenuItemImage(res.pause_png, res.pause_png, res.pause_png, function(){
            self.addChild(new game.PauseLayer());
        }, this);
        pauseItem.attr({
            x : winSize.width - 40,
            y : winSize.height - 100,
        });
        var menu = new cc.Menu(pauseItem);
        menu.attr({
            x : 0,
            y : 0,
            width : winSize.width,
            height : winSize.height,
        });
        this.addChild(menu);



    },


    setScore : function(score){
        this._scoreLbl.setString(score.toFixed(0) + '');
    },

    setBestScore : function(score){
        this._bestScoreLbl.setString(score.toFixed(0) + '');
    },








});