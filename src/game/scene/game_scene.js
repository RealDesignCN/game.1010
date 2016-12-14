/**
 * Created by zhaojm on 15/4/1.
 */
game.GameScene = cc.Scene.extend({
    _gameLayer : null,
    onEnter : function(){
        this._super();

        var self = this;


        this._gameLayer = new game.GameLayer();
        this.addChild(this._gameLayer);

        //this.addChild(new game.GameOverLayer({score : 10}));

    },
});