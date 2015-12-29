/**
 * Created by Heaven on 12/23/15.
 */
var MonsterCandy = MonsterCandy || {};
MonsterCandy.Game = function() {
    this.STATUS_EAT = 1;
    this.STATUS_IDLE = 0;
    this.monsterStatus = this.STATUS_IDLE;
    this.LIFE = 3;
    this.isPaused = false;
};

MonsterCandy.Game.prototype = {
    init: function() {
        console.log('this is game state');
        this.monsterStatus = this.STATUS_IDLE;
    },
    preload: function() {
        game.time.advancedTiming = true;
    },
    create: function() {
        this.VIEW_H = this.world.height;
        this.VIEW_W = this.world.width;
        //background
        this.add.sprite(0, 0, 'background');
        //floor
        var floor = this.add.sprite(0, this.VIEW_H - 162, 'floor');
        floor.anchor.setTo(0.6, 0);

        // monster
        this.monsterIdle = this.add.sprite(0, this.VIEW_H - 330, 'monster-basic-idle', 0);
        this.monsterIdle.scale.setTo(2);
        this.monsterIdle.animations.add('shake');
        this.monsterIdleReferance = this.monsterIdle.play('shake', 13, true);
        // 吃的动作
        this.monsterEat = this.add.sprite(15, this.VIEW_H - 345, 'monster-basic-eats', 0);
        this.monsterEat.scale.setTo(2);
        this.monsterEat.visible = false;
        this.monsterEat.animations.add('eats');
        // 结束回调事件
        this.monsterEat.events.onAnimationComplete.add(this.handleMonterEatComplete, this);
        // this.input.onDown.add(this.handleMonterEat, this); // 绑定点击事件

        // 顶部状态栏
        this.pauseBtn = this.add.button(this.VIEW_W - 106, 10, 'button-pause', this.handPauseBtnClick, this, 1, 0, 2, 0);
        this.pauseBtn.scale.setTo(1, 0.8);
        // 生命值
        var lifeFullGroup = this.add.group();
        var lifeEmptyGroup = this.add.group();

        // 生命值血条
        for (var i = this.LIFE; i > 0; i--) {
            console.log(this.VIEW_W - 160 - (i - 1) * 80);
            var lifeEmpty = this.add.sprite(this.VIEW_W - 175 - (i - 1) * 82, 43, 'life-empty', 0, this.lifeEmptyGroup);
            var lifeFull = this.add.sprite(this.VIEW_W - 175 - (i - 1) * 82, 43, 'life-full', 0, this.lifeFullGroup);
            lifeEmpty.anchor.setTo(0.5);
            lifeEmpty.scale.setTo(1, 0.8);
            lifeFull.scale.setTo(0, 0);
            lifeFull.anchor.setTo(0.5);

            (function(i, _this) {
                // 第一步
                var lifeFullTween1 = _this.add.tween(lifeFull.scale).to({
                    x: 1.2,
                    y: 1
                }, 300, null, true, 300 * (3 - i), 0, false);

                var lifeFullTween2 = _this.add.tween(lifeFull.scale).to({
                    x: 1,
                    y: 0.8
                }, 200, null, false, 0, 0, false);

                lifeFullTween1.chain(lifeFullTween2);
            })(i, this);
        }

        var scoreBar = this.add.sprite(10, 10, 'score-bg');
        scoreBar.scale.setTo(1, 0.8);

        // paused background
        this.screenOverlay = this.add.sprite(0, 0, 'screen-overlay');
        this.screenOverlay.visible = false;

        // audio button
        // 显示位置为y轴10px,默认隐藏
        this.audioBtn = this.add.button(this.VIEW_W - 120, -96, 'button-audio', this.handAudioBtnClick, this, 4, 3, 5, 3);
        this.audioBtn.scale.setTo(1,0.8);

        this.pausedSprite = this.add.sprite(this.VIEW_W / 2, 250, 'text-paused');
        this.pausedSprite.anchor.setTo(0.5);
        this.pausedSprite.visible = false;

        // continue button
        this.continueBtn = this.add.button(this.VIEW_W + 10, 650, 'button-continue', this.handleContinueBtnClick, this, 1, 0, 2, 0);
        this.continueBtn.anchor.setTo(0.5);
        this.continueBtn.scale.setTo(1, 0.8);
        this.continueBtn.visible = false;
        // back to main button
        this.backToMainBtn = this.add.button(-60, 780, 'button-back', this.handleBackBtnClick, this, 1, 0, 2, 0);
        this.backToMainBtn.anchor.setTo(0.5);
        this.backToMainBtn.scale.setTo(1, 0.8);
        this.backToMainBtn.visible = false;

        // are you ready ?
        this.startGame();
    },
    handPauseBtnClick: function(btn){
        // stop all animation
        this.monsterIdleReferance.isPaused = true;
        MonsterCandy.clickMusic.play('',0,1,false);
        // TODO stop candyGroup animations and click handle function
        this.screenOverlay.visible = this.continueBtn.visible = this.backToMainBtn.visible = this.pausedSprite.visible = true;
        this.add.tween(this.pausedSprite).to({
            alpha: 1
        }, 300, null, true, 0, 0, false);
        this.add.tween(this.continueBtn).to({
            x: this.VIEW_W / 2
        }, 300, null, true, 0, 0, false);
        this.add.tween(this.backToMainBtn).to({
            x: this.VIEW_W / 2
        }, 300, null, true, 0, 0, false);

        // set current frames
        if(MonsterCandy.backgroundMusic.isPlaying){
            this.audioBtn.setFrames(1,0,2,0);
        }else{
            this.audioBtn.setFrames(4,3,5,3);
        }
        this.add.tween(this.audioBtn).to({
            y: 10
        },300,Phaser.Easing.Bounce.Out,true,0,0,false);
        this.isPaused = true;
    },
    handleMonterEat: function() {
        MonsterCandy.eatMusic.play('',0,1,false);
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
    handAudioBtnClick: function(btn) {
        console.log('handle audio btn');
        MonsterCandy.clickMusic.play('',0,1,false);
        if(MonsterCandy.backgroundMusic.isPlaying){
            this.audioBtn.setFrames(4,3,5,3);
            MonsterCandy.backgroundMusic.pause();
        }else{
            this.audioBtn.setFrames(1,0,2,0);
            console.log(MonsterCandy.backgroundMusic.currentTime);
            MonsterCandy.backgroundMusic.currentTime > 0 ? MonsterCandy.backgroundMusic.resume() : MonsterCandy.backgroundMusic.play();
        }
    },
    handleContinueBtnClick: function(btn) {
        console.log('handle continueBtn');
        MonsterCandy.clickMusic.play('',0,1,false);
        this.add.tween(this.continueBtn).to({
            x: this.VIEW_W + 10
        }, 300, null, true, 0, 0, false);
        this.add.tween(this.backToMainBtn).to({
            x: -this.backToMainBtn.width / 2
        }, 300, null, true, 0, 0, false);
        this.add.tween(this.pausedSprite).to({
            alpha: 0
        }, 300, null, true, 0, 0, false);
        this.add.tween(this.audioBtn).to({
            y: -96
        },300,Phaser.Easing.Bounce.Out,true,0,0,false);
        this.time.events.add(300, function() {
            this.screenOverlay.visible = this.continueBtn.visible = this.backToMainBtn.visible = this.pausedSprite.visible = false;
            this.monsterIdleReferance.isPaused = false;
        }, this);
        this.isPaused = false;
    },
    handleBackBtnClick: function(btn) {
        MonsterCandy.clickMusic.play('',0,1,false);
        this.state.start('MainMenu');
    },
    startGame: function(){
        console.log('start game');
    },
    update: function() {},
    render: function() {
        game.debug.soundInfo(MonsterCandy.backgroundMusic, 32, 32);
        game.debug.text(game.time.fps || '--', 20, 100, "#00ff00", 'bold 45px Arial');
    }
};