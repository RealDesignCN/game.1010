/**
 * Created by zhaojm on 15/4/1.
 */


game.GameLayer = cc.LayerColor.extend({

    _interval : 2,
    _col : 10,
    _row : 10,
    _rectW : 22,
    _rectH : 22,

    _origin : null,
    _matrixSize : null,


    _matrixList : null, // 10 * 10

    _matrixObjs : null,

    _takedObj : null,


    _uiLayer : null,


    _bestScore : null,
    _score : null,
    ctor:function () {
        this._super(cc.color(255, 255, 255));

        var self = this;
        var winSize = cc.winSize;


        cc.spriteFrameCache.addSpriteFrame(res.rect_png, 'rect.png');

        var width  = this._col * this._rectW + (this._col - 1) * this._interval;
        var height = width;
        var x = (winSize.width - width) / 2;
        var y = (winSize.height - height) / 2;
        this._origin = cc.p(x, y);
        this._matrixSize = cc.size(width, height);


        this._matrixList = [];

        this._init();

        this._matrixObjs = [];

        this.addThreeMatrixObj();



        this._addTouchEvent();



        this._uiLayer = new game.UILayer();
        this.addChild(this._uiLayer, 2);



        var bestScore = this.getHighScore('1010!_data');
        //cc.log(bestScore);
        if(!bestScore) {
            bestScore = 0;
        }
        //cc.log(bestScore);
        this._bestScore = bestScore;
        this._score = 0;
        this._uiLayer.setScore(this._score);
        this._uiLayer.setBestScore(this._bestScore);



    },

    addScore : function(score){
        this._score += score;
        this._uiLayer.setScore(this._score);

        if(this._score > this._bestScore){
            this._bestScore = this._score;
            this._uiLayer.setBestScore(this._bestScore);
        }
    },


    getHighScore : function(key){
        var temp = cc.sys.localStorage.getItem(key);
        temp = JSON.parse(temp);

        //cc.log('temp==', temp, 'value=', value);

        if(temp == null || temp == "" || temp == 'undefined'){
            return null;
        }else{
            return temp.score;
        }
    },


    _getMatrixItem : function(col, row){
        var i = col * this._row + row;

        return this._matrixList[i];
    },
    _setMatrixItem : function(col, row, value){
        var i = col * this._row + row;

        this._matrixList[i] = value;
    },


    _init : function(){
        for(var col = 0; col < this._col; col++){
            for(var row = 0; row < this._row; row++){

                // init bg
                var rect = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('rect.png'));
                rect.attr({
                    anchorX : 0,
                    anchorY : 0,
                    x : this._origin.x + col * this._rectW + col * this._interval,
                    y : this._origin.y + row * this._rectH + row * this._interval,
                    color : cc.color(225, 225, 225),
                });
                this.addChild(rect);

                // init matrix
                this._setMatrixItem(col, row, null);

            }
        }
    },

    addRole : function(role){
        role.addToLayer(this);
    },


    addThreeMatrixObj : function(){
        var winSize = cc.winSize;


        var y = winSize.height * 0.1;


        for(var i = 0; i < 3; i++){
            var x = winSize.width / 4 * (i + 1);
            var mo = new game.MatrixObject(cc.p(x, y));
            this._matrixObjs.push(mo);
            mo.addToLayer(this);
        }

        //cc.log(this._matrixObjs.length);

    },


    _addTouchEvent : function(){
        var self = this;
        var winSize = cc.winSize;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true   ,       // true 为不向下传递
            onTouchBegan: function(touch, event){
                //cc.log('touchbegan');
                var pos = touch.getLocation();
                //var pos2 = touch.getLocationInView();
                if(!self._takedObj){
                    self.checkIsTake(pos);
                }else{

                }


                return true;
            },
            onTouchMoved: function(touch, event){
                //cc.log('touch moved');
                var pos = touch.getLocation();
                if(!self._takedObj){
                    self.checkIsTake(pos);
                }else{
                    self._takedObj.moveTo(pos);
                }
            },
            onTouchEnded: function(touch, event){
                //cc.log('touch ended');
                var pos = touch.getLocation();
                // TODO check is right
                // TODO put down or restore
                if(!self._takedObj) {
                }else{
                    self._takedObj.moveTo(pos);
                    self.checkIsRight();
                }
            },
            //onTouchCancel: this.onTouchCancel
        });
        this._touchListener = listener;

        cc.eventManager.addListener(this._touchListener, this);
    },

    checkIsTake : function(pos){
        for(var i = 0; i < this._matrixObjs.length; i++){
            var mo = this._matrixObjs[i];
            var isTouch = mo.isTouched(pos);
            if (isTouch) {
                this.takeUp(mo,  pos);
                break;
            }
        }
    },


    takeUp : function(matrixObj, touchPos){
        this._takedObj = matrixObj;
        // TODO
        matrixObj.takeUp(touchPos);

    },


    checkIsRight : function() {
        //var isRight = true;
        var mo = this._takedObj;

        var originPos = mo.getOriginPos();
        // TODO 获取起始位置重合的位置

        //if (originPos.x < this._origin.x - this._rectW / 2 ||
        //    originPos.x + cSize.width > this._origin.x + this._matrixSize.width + this._rectW / 2 ||
        //    originPos.y < this._origin.y - this._rectH / 2 ||
        //    originPos.y + cSize.height > this._origin.y + this._matrixSize.height + this._rectH / 2) {
        //
        //    isRight = false;
        //    this.restore();
        //    return isRight;
        //}

        var col = Math.floor((originPos.x - (this._origin.x - this._rectW / 2)) / (this._rectW + this._interval));
        var row = Math.floor((originPos.y - (this._origin.y - this._rectH / 2)) / (this._rectH + this._interval));

        //cc.log('col....row....', col, row);

        if(0 <= col && col < 10 && 0<= row && row < 10){

            if (this.checkIsCanDown(this._takedObj, col, row)) {
                this.putDown(col, row);
                return;
            }

        }

        this.restore();

    },


    restore : function(){
        this._takedObj.restore();
        this._takedObj = null;
    },


    checkIsCanDown : function(obj, col, row){
        var list = obj._rectList;
        var originPos = obj.getOriginPos();
        var matrix = obj._matrix;
        for(var i = 0; i < list.length; i++){
            var rect = list[i];
            var m_row = rect._row;
            var m_col = rect._col;

            m_col += col;
            m_row += row;

            if(m_row >= this._row || m_col >= this._col){
                return false;
            }

            var item = this._getMatrixItem(m_col, m_row);
            if (item) {
                return false;
            }

        }

        return true;
    },



    putDown : function(col, row){
        var list = this._takedObj._rectList;
        var originPos = this._takedObj.getOriginPos();
        var matrix = this._takedObj._matrix;
        for(var i = 0; i < list.length; i++){
            var rect = list[i];
            rect.removeFromParent();
            this.addChild(rect);
            rect.x += originPos.x;
            rect.y += originPos.y;

            //var m_row = Math.floor(i / matrix.w);
            //var m_col = i % matrix.w;
            var m_row = rect._row;
            var m_col = rect._col;

            m_col += col;
            m_row += row;

            var x = this._origin.x + m_col * (this._rectW + this._interval);
            var y = this._origin.y + m_row * (this._rectH + this._interval);

            rect.runAction(new cc.MoveTo(0.1, cc.p(x, y)));

            this._setMatrixItem(m_col, m_row, rect);

            this.addScore(1);

        }

        this._matrixObjs.remove(this._takedObj);
        this._takedObj.removeFromLayer();
        this._takedObj = null;


        this.checkRemove();


        if (this._matrixObjs.length == 0) {
            this.addThreeMatrixObj();
        }else{
            this.checkGameOver();
        }

    },





    checkRemove:function(){
        // TODO check is need remove
        var self = this;
        //cc.log('check remove');
        //this._matrixList
        var remove_col_list = [];
        for(var i = 0; i < this._col; i++){
            var isAll = true;
            for(var j = 0; j < this._row; j++){
                var item = this._getMatrixItem(i, j);
                if(!item){
                    isAll = false;
                    break;
                }
            }
            if(isAll){
                remove_col_list.push(i);
            }
        }

        //cc.log(remove_col_list);


        var remove_row_list = [];
        for(var i = 0; i < this._row; i++){
            var isAll = true;
            for(var j = 0; j < this._col; j++){
                var item = this._getMatrixItem(j, i);
                if(!item){
                    isAll = false;
                    break;
                }
            }
            if (isAll) {
                remove_row_list.push(i);
            }
        }

        //cc.log(remove_row_list);

        for(var i = 0; i < remove_col_list.length; i++){
            for(var j = 0; j < self._row; j++){
                var item = self._getMatrixItem(remove_col_list[i], j);
                self._setMatrixItem(remove_col_list[i], j, null);

                item.runAction(new cc.Sequence(
                    new cc.ScaleTo(0.1, 0),
                    new cc.CallFunc(function(sender){
                        sender.removeFromParent();

                    })
                ));


            }
        }



        for(var i = 0; i < remove_row_list.length; i++){
            for(var j = 0; j < self._col; j++){
                var item = self._getMatrixItem(j, remove_row_list[i]);
                if(item) {
                    self._setMatrixItem(j, remove_row_list[i], null);
                    item.runAction(new cc.Sequence(
                        new cc.ScaleTo(0.1, 0),
                        new cc.CallFunc(function(sender){
                            sender.removeFromParent();
                        })
                    ));

                }
            }
        }

    },

    checkGameOver:function(){
        var isGameOver = true;
        for(var i = 0; i < this._matrixObjs.length; i++){
            var obj = this._matrixObjs[i];


            for(var col = 0; col < this._col; col++){
                for(var row = 0; row < this._row; row++){

                    var isCanDown = this.checkIsCanDown(obj, col, row);

                    if(isCanDown){
                        isGameOver = false;
                        return;
                    }

                }
            }
        }

        if(isGameOver){
            this.gameOver();
        }

    },







    gameOver : function(){
        cc.log('game over.....');
        this.addChild(new game.GameOverLayer({score : this._score}), 2);
    },





});