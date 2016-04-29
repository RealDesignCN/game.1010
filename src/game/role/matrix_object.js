/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/16
 */

game.MatrixObject = game.BaseRole.extend({



    _config : [
        {
            w : 1,
            h : 1,
            color : cc.color(125, 142, 212),
            matrix : [
                1
            ],
        },
        {
            w : 1,
            h : 2,
            color : cc.color(255, 198, 62),
            matrix : [
                1,
                1
            ],
        },
        {
            w : 1,
            h : 3,
            color : cc.color(237, 149, 75),
            matrix : [
                1,
                1,
                1
            ],
        },

        {
            w : 1,
            h : 4,
            color : cc.color(232, 106, 130),
            matrix : [
                1,
                1,
                1,
                1
            ],
        },

        {
            w : 1,
            h : 5,
            color : cc.color(221, 101, 85),
            matrix : [
                1,
                1,
                1,
                1,
                1
            ],
        },


        {
            w : 2,
            h : 1,
            color : cc.color(255, 198, 62),
            matrix : [
                1, 1
            ],
        },


        {
            w : 2,
            h : 2,
            color : cc.color(152, 220, 85),
            matrix : [
                1, 1,
                1, 1
            ],
        },

        {
            w : 2,
            h : 2,
            color : cc.color(91, 202, 134),
            matrix : [
                1, 0,
                1, 1
            ],
        },

        {
            w : 2,
            h : 2,
            color : cc.color(91, 202, 134),
            matrix : [
                1, 1,
                0, 1
            ],
        },

        {
            w : 2,
            h : 2,
            color : cc.color(91, 202, 134),
            matrix : [
                1, 1,
                1, 0
            ],
        },


        {
            w : 3,
            h : 1,
            color : cc.color(237, 149, 75),
            matrix : [
                1, 1, 1
            ],
        },


        {
            w : 3,
            h : 3,
            color : cc.color(77, 213, 175),
            matrix : [
                1, 1, 1,
                1, 1, 1,
                1, 1, 1
            ],
        },

        {
            w : 3,
            h : 3,
            color : cc.color(92, 190, 229),
            matrix : [
                1, 1, 1,
                0, 0, 1,
                0, 0, 1
            ],
        },

        {
            w : 3,
            h : 3,
            color : cc.color(92, 190, 229),
            matrix : [
                1, 1, 1,
                1, 0, 0,
                1, 0, 0
            ],
        },

        {
            w : 3,
            h : 3,
            color : cc.color(92, 190, 229),
            matrix : [
                0, 0, 1,
                0, 0, 1,
                1, 1, 1
            ],
        },
        {
            w : 3,
            h : 3,
            color : cc.color(92, 190, 229),
            matrix : [
                1, 0, 0,
                1, 0, 0,
                1, 1, 1
            ],
        },

        {
            w : 4,
            h : 1,
            color : cc.color(232, 106, 130),
            matrix : [
                1, 1, 1, 1
            ],
        },





        {
            w : 5,
            h : 1,
            color : cc.color(221, 101, 85),
            matrix : [
                1, 1, 1, 1, 1
            ],
        },


    ],

    _rectW : 22,
    _rectH : 22,
    _interval : 2,

    //_maxWidth : null,

    _layer : null,
    _rectList : null,
    _matrix : null,
    _origin : null,
    _beginPos : null,
    _node : null,

    ctor:function(pos){
        this._super();
        this._beginPos = pos;
        this._origin = cc.p(0, 0);
        this._matrix = this.getRandomMatrix();
        //cc.log(this._matrix);
        this._rectList = [];
        //this._maxWidth = this._rectW * 3 + this._interval * 3;
        this._node = new cc.Node();
        this._node.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            width : this._matrix.w * (this._rectW + this._interval),
            height : this._matrix.h * (this._rectH + this._interval),
            x : pos.x,
            y : pos.y,
            scaleX : 0.7,
            scaleY : 0.7,
        });


        for(var col = 0; col < this._matrix.w; col++){
            for(var row = 0; row < this._matrix.h; row++){
                var index = col * this._matrix.h + row;
                var item = this._matrix.matrix[index];
                if(item){
                    var rect = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('rect.png'));
                    rect.attr({
                        anchorX : 0,
                        anchorY : 0,
                        x : this._origin.x + col * this._rectW + col * this._interval,
                        y : this._origin.y + row * this._rectH + row * this._interval,
                        color : this._matrix.color,
                    });
                    this._rectList.push(rect);
                    this._node.addChild(rect);
                    rect._col = col;
                    rect._row = row;
                }
            }
        }


        //var drawNode = new cc.DrawNode();
        //this._node.addChild(drawNode);
        //drawNode.drawRect(
        //    cc.p(0, 0),
        //    cc.p(this._node.width, this._node.height),
        //    //cc.p(this._node.x - this._node.width / 2, this._node.y - this._node.height / 2),
        //    //cc.p(this._node.x + this._node.width / 2, this._node.y + this._node.height / 2),
        //    null,
        //    1,
        //    cc.color(0, 0, 0)
        //);


    },


    getRandomMatrix : function(){
        var i = Math.floor(Math.random() * this._config.length);
        return this._config[i];
    },

    getOriginPos : function(){
        var pos = this._node.getPosition();
        var cSize = this._node.getContentSize();
        var originPos = pos;
        originPos.x -= cSize.width / 2;
        originPos.y -= cSize.height / 2;
        return originPos;
    },


    addToLayer : function(layer){
        this._layer = layer;
        layer.addChild(this._node, 2);
        this._node.attr({
            x : this._node.x + cc.winSize.width,
        });
        this._node.runAction(new cc.MoveBy(0.2, cc.p(-cc.winSize.width, 0)));
    },

    removeFromLayer : function(){
        this._node.removeFromParent();
    },


    isTouched : function(touchPos){
        //var half = this._maxWidth / 2;
        var half_w = this._node.width / 2;
        var half_h = this._node.height / 2;
        return Math.abs(touchPos.x - this._node.x) < half_w && Math.abs(touchPos.y - this._node.y) < half_h;
    },


    moveTo : function(touchPos){

        this._node.x = touchPos.x;
        this._node.y = touchPos.y + this._node.height / 2 + 70;
    },

    takeUp : function(touchPos){
        var endPos = touchPos;
        endPos.y += this._node.height / 2 + 70;

        this._node.runAction(new cc.Spawn(
            new cc.MoveTo(0.2, endPos),
            new cc.ScaleTo(0.2, 1)
        ));
    },

    restore : function(){
        // TODO
        this._node.runAction(new cc.Spawn(
            new cc.MoveTo(0.2, this._beginPos),
            new cc.ScaleTo(0.2, 0.7)
        ));
    },




});