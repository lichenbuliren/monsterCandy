/**
 * Created by Heaven on 12/23/15.
 */
var MonsterCandy = MonsterCandy || {};

MonsterCandy.StoryHowto = function(){
    this.howToPlayText = null;
};

MonsterCandy.StoryHowto.prototype = {
    init: function(){
        console.log('this is state StoryHowto');
        this.game.state.add('StoryHowto2',MonsterCandy.StoryHowto2);
    },
    create: function(){
        // 添加 story 背景
        this.step1 = this.add.sprite(0,0,'screen-story');
        // continue 按钮
        this.continueBtn = this.add.button(this.world.width - 358 - 30,this.world.height-133,'button-continue',function(){
            console.log('you clicked continue button');
            // TODO step into next scene
            this.game.state.start('StoryHowto2');
        },this,1,0,2,0);

        this.add.tween(this.continueBtn).to({
            x: this.world.width - 358
        },100,null,true,0,0,false);
    }
};


MonsterCandy.StoryHowto2 = function(){};
MonsterCandy.StoryHowto2.prototype = {
    init: function(){
        console.log('this is state StoryHowto2');
    },
    create: function(){
        // 添加 story 背景
        this.background = this.add.sprite(0,0,'background');
        var fontStyle = {
            font: 'italic 45px ComicBook',
            fill: '#FCC900',
            stroke: '#662C09',
            strokeThickness: 10
        };
        var howToPlayText = this.add.text(this.world.centerX,0,'HOW TO PLAY ',{
            font: 'italic 55px ComicBook',
            fill: '#FCC900',
            stroke: '#662C09',
            strokeThickness: 10
        });
        howToPlayText.anchor.setTo(0.5,0);

        var step2 = this.add.sprite(this.world.centerX,75,'howto-path');
        step2.anchor.setTo(0.58,0);

        // 文案 S
        var tapTheCandyText = this.add.text(this.world.centerX,190,'Tap the candy ',fontStyle);
        tapTheCandyText.anchor.setTo(0.5,0);
        var toCollectItText = this.add.text(this.world.centerX + 10,240,'to collect it! ',fontStyle);
        toCollectItText.anchor.setTo(0.3,0);

        // 炸弹
        var bomb = this.add.sprite(this.world.centerX + 100,320,'howto-bomb');

        var watchOutText = this.add.text(50,345,'Watch out  ',fontStyle);
        var forTheBombText = this.add.text(50,395,'for the bomb! ',fontStyle);
        var ifTheCandyFellOffText = this.add.text(25,505,'If the candy fell off ',fontStyle);
        var theScreenText = this.add.text(25,555,'the screen! ',fontStyle);
        // 文案 E
        var leftFull1 = this.add.sprite(this.world.centerX,585,'life-full');
        leftFull1.scale.setTo(0.8,0.8);
        var leftFull2 = this.add.sprite(this.world.centerX + 64,585,'life-full');
        leftFull2.scale.setTo(0.8,0.8);
        var leftEmpty = this.add.sprite(this.world.centerX + 128,585,'life-empty');
        leftEmpty.scale.setTo(0.8,0.8);

        var youWillLoseText = this.add.text(this.world.centerX - 30,645,'you will lose ',fontStyle);
        var oneLifeText = this.add.text(this.world.centerX + 60,695,'one life! ',fontStyle);

        var howToMonster = this.add.sprite(0,this.world.height - 284,'howto-monster');
        howToMonster.scale.setTo(2,2);
        // continue 按钮
        var continueBtn = this.add.button(this.world.width - 358 - 30,this.world.height-133,'button-continue',function(){
            console.log('you clicked continue button');
            // TODO step into next scene
            this.state.start('MainMenu');
        },this,1,0,2,0);

        this.add.tween(continueBtn).to({
            x: this.world.width - 358
        },100,null,true,0,0,false);
    }
}