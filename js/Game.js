/**
 * Created by Heaven on 12/23/15.
 */
var MonsterCandy = MonsterCandy || {};
MonsterCandy.Game = function() {
    this.STATUS_EAT = 1;
    this.STATUS_IDLE = 0;
    this.monsterStatus = this.STATUS_IDLE;
    this.LIFE = 3;
};

MonsterCandy.Game.prototype = {
    init: function() {
        console.log('this is game state');
        this.monsterStatus = this.STATUS_IDLE;
    },
    create: function() {
        var viewH = this.world.height,
            viewW = this.world.width;
        //background
        this.add.sprite(0, 0, 'background');
        //floor
        var floor = this.add.sprite(0, viewH - 162, 'floor');
        floor.anchor.setTo(0.6, 0);

        // monster
        this.monsterIdle = this.add.sprite(0, viewH - 330, 'monster-basic-idle', 0);
        this.monsterIdle.scale.setTo(2);
        this.monsterIdle.animations.add('shake');
        this.monsterIdle.play('shake', 13, true);
        // 吃的动作
        this.monsterEat = this.add.sprite(15, viewH - 345, 'monster-basic-eats', 0);
        this.monsterEat.scale.setTo(2);
        this.monsterEat.visible = false;
        this.monsterEat.animations.add('eats');
        // 结束回调事件
        this.monsterEat.events.onAnimationComplete.add(this.handleMonterEatComplete, this);
        this.input.onDown.add(this.handleMonterEat, this); // 绑定点击事件

        // 顶部状态栏
        this.pauseBtn = this.add.button(viewW - 106, 10, 'button-pause', this.handPauseBtnClick, this, 1, 0, 2, 0);
        this.pauseBtn.scale.setTo(1, 0.8);
        // 生命值
        var lifeFullGroup = this.add.group();
        var lifeEmptyGroup = this.add.group();
        for (var i = this.LIFE; i > 0; i--) {
            console.log(viewW - 160 - (i-1) * 80);
            var lifeEmpty = this.add.sprite(viewW - 160 - (i-1) * 84, 43, 'life-empty', 0, this.lifeEmptyGroup);
            var lifeFull = this.add.sprite(viewW - 160 - (i-1) * 84, 43, 'life-full', 0, this.lifeFullGroup);
            lifeEmpty.anchor.setTo(0.5);
            lifeEmpty.scale.setTo(0.8, 0.8);
            lifeFull.scale.setTo(0, 0);
            lifeFull.anchor.setTo(0.5);

            // 第一步
            var lifeFullTween1 = this.add.tween(lifeFull.scale).to({
                x: 1,
                y: 1
            }, 300, null, true, 300 * i, 0, false);

            var lifeFullTween2 = this.add.tween(lifeFull.scale).to({
                x: 0.8,
                y: 0.8
            },300,null,false,300*i,0,false);

            lifeFullTween1.onComplete.add(function(){
                lifeFullTween2.start();
            },lifeFull)

            // 第二部
            // this.add.tween(lifeFull.scale).to({
            //     x: 0.8,
            //     y: 0.8
            // }, 300, null, true, 300 * (i+1), 0, false);

            // // 第三部
            // this.add.tween(lifeFull.scale).to({
            //     x: 0.8,
            //     y: 0.8
            // }, 300, null, true, 300 * (i+2), 0, false);
        }
    },
    handleMonterEat: function() {
        this.monsterIdle.animations.stop('shake');
        this.monsterIdle.visible = false;
        this.monsterEat.visible = true;
        this.monsterEat.play('eats', 13);
    },
    handleMonterEatComplete: function() {
        this.monsterIdle.play('shake');
        this.monsterEat.animations.stop('eat', true);
        this.monsterEat.visible = false;
        this.monsterIdle.visible = true;
    },
    update: function() {},
    preRender: function() {

    }
};