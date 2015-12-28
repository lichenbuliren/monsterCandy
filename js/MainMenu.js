/**
 * Created by Heaven on 12/23/15.
 */
var MonsterCandy = MonsterCandy || {};

MonsterCandy.MainMenu = function() {
    this.isPaused = true;
    this.music = null;
    this.highScore = 0;
    this.overall = 0;
};

MonsterCandy.MainMenu.prototype = {
    init: function() {
        console.log('this is MenuMain state');
    },
    create: function() {
        // background
        var background = this.add.sprite(0, 0, 'background');
        var music = this.music = this.add.audio('audio-music', 1, true, true);
        var audioBtn = this.add.button(this.world.width - 121, 10, 'button-audio', this.handlerAudioBtnClick, this, 4, 3, 5, 3);

        var fontStyle = {
            font: 'italic 30px ComicBook',
            fill: '#FCC900',
            strokeThickness: 10
        };
        var highScoreText = this.add.sprite(10,150,'text-highscore');
        var highScoreBackground = this.add.sprite(10,230,'score-bg');
        // 显示 highScore
        this.add.text(160,240,this.highScore,fontStyle);
        var overallText = this.add.sprite(10,320,'text-overall');
        var overallBackground = this.add.sprite(10,370,'score-bg');
        // 显示 overall
        this.add.text(160,380,this.overall,fontStyle);
        var titleText = this.add.sprite(this.world.centerX - 75,135,'title');

        var monsterCover = this.add.sprite(-160,this.world.height - 500,'monster-cover');

        var startBtn = this.add.button(this.world.width - 410,this.world.height - 150,'button-start',this.handlerStartBtn,this,1,0,2,0);
        var achievementsBtn = this.add.button(this.world.width - 372,this.world.height - 290,'button-achievements',this.handlerAchievementsBtn,this,1,0,2,0);
    },
    handlerAudioBtnClick: function(btn) {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.music.pause();
        } else {
            this.music.currentTime > 0 ? this.music.resume() : this.music.play();
        }
        this.isPaused ? btn.setFrames(4, 3, 5, 3) : btn.setFrames(1, 0, 2, 0);
        this.isPaused ? btn.frame = 3 : btn.frame = 0;
    },
    handlerStartBtn: function(btn){
      console.log('click start');
      this.state.start('Game');
    },
    handlerAchievementsBtn: function(){
      console.log('click achievements');
    },
    render: function() {
        game.debug.soundInfo(this.music, 20, 32);
    }
};