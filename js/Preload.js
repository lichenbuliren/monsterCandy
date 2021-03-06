/**
 * Created by Heaven on 12/23/15.
 */
var MonsterCandy = MonsterCandy || {};

MonsterCandy.Preload = function() {};

MonsterCandy.Preload.prototype = {
    init: function() {
        console.log('this is state preload');
    },
    preload: function() {
        this.stage.backgroundColor = '#B4D9E7';
        this.loadingBackground = this.add.sprite(0, 0, 'loadingBackground');
        this.loadingBar = this.add.sprite(this.world.centerX, this.world.centerY + 120, 'loading-bar');
        // 设置中心点
        this.loadingBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.loadingBar);

        // 加载静态资源
        this.load.image('background', '../assets/background.png'); // 背景
        this.load.image('title', '../assets/title.png'); // 标题
        this.load.image('floor', '../assets/floor.png'); // 地面
        this.load.image('score-bg', '../assets/score-bg.png'); // 得分面板背景
        this.load.image('screen-overlay', '../assets/screen-overlay.png'); // 蒙层
        this.load.image('text-highscore', '../assets/text-highscore.png'); // 得分title
        this.load.image('text-overall', '../assets/text-overall.png'); // 最高得分title
        this.load.image('text-paused', '../assets/text-paused.png'); // 暂停text
        this.load.image('monster-cover', '../assets/monster-cover.png'); // 怪物封面
        this.load.image('monster-sleeps', '../assets/monster-sleeps.png');

        // 生命值
        this.load.image('life-empty', '../assets/life-empty.png');
        this.load.image('life-full', '../assets/life-full.png');

        // 糖果资源
        this.load.image('candy-bomb', '../assets/candy-bomb.png'); // 炸弹
        this.load.image('candy-cake', '../assets/candy-cake.png'); // 炸弹
        this.load.image('candy-chocolate', '../assets/candy-chocolate.png'); // 巧克力
        this.load.image('candy-cupcake', '../assets/candy-cupcake.png'); // 纸杯蛋糕
        this.load.image('candy-donut', '../assets/candy-donut.png'); // 甜甜圈
        this.load.image('candy-icecream', '../assets/candy-icecream.png'); // 冰激凌
        this.load.image('candy-jelly', '../assets/candy-jelly.png'); // 果冻
        this.load.image('candy-lollipop', '../assets/candy-lollipop.png'); // 棒棒糖
        this.load.image('candy-marshmallow', '../assets/candy-marshmallow.png'); // 棉花糖
        this.load.image('candy-pink', '../assets/candy-pink.png');
        this.load.image('candy-red', '../assets/candy-red.png');
        this.load.image('candy-super', '../assets/candy-super.png');
        this.load.image('candy-teddy', '../assets/candy-teddy.png');

        // 故事引导页面资源
        this.load.image('howto-bomb', '../assets/howto-bomb.png');
        this.load.image('howto-monster', '../assets/howto-monster.png');
        this.load.image('howto-path', '../assets/howto-path.png');
        this.load.image('howto-super', '../assets/howto-super.png');
        this.load.image('screen-story', '../assets/screen-story.png');

        // other
        this.load.image('explosion', '../assets/explosion.png'); // 爆炸
        this.load.image('message-newcandy', '../assets/message-newcandy.png'); // 升级提示

        // load spritesheet
        this.load.spritesheet('button-achievements', '../assets/button-achievements.png', 363, 131, 3); // 成就按钮
        this.load.spritesheet('button-audio', '../assets/button-audio.png', 111, 96, 6); // 音乐图标
        this.load.spritesheet('button-back', '../assets/button-back.png', 358, 133, 3); // 返回按钮
        this.load.spritesheet('button-continue', '../assets/button-continue.png', 358, 133, 3); // 继续按钮
        this.load.spritesheet('button-pause', '../assets/button-pause.png', 96, 98, 3);
        this.load.spritesheet('button-restart', '../assets/button-restart.png');
        this.load.spritesheet('button-start', '../assets/button-start.png', 401, 143, 3);

        // load monster spritesheet
        this.load.spritesheet('monster-basic-eats', '../assets/monster-basic-eats.png', 111, 136, 4);
        this.load.spritesheet('monster-basic-idle', '../assets/monster-basic-idle.png', 103, 131, 13);
        this.load.spritesheet('monster-cape-eats', '../assets/monster-cape-eats.png');
        this.load.spritesheet('monster-cape-idle', '../assets/monster-cape-idle.png');
        this.load.spritesheet('monster-crown-eats', '../assets/monster-crown-eats.png');
        this.load.spritesheet('monster-crown-idle', '../assets/monster-crown-idle.png');
        this.load.spritesheet('monster-king-eats', '../assets/monster-king-eats.png');
        this.load.spritesheet('monster-king-idle', '../assets/monster-king-idle.png');

        this.load.audio('audio-click', '../audio/click.ogg', true);
        this.load.audio('audio-eating', '../audio/eating.ogg', true);
        this.load.audio('audio-music', '../audio/music.ogg', true);
        this.load.audio('audio-newlevel', '../audio/newlevel.ogg', true);
    },
    create: function() {
        MonsterCandy.clickMusic = this.add.audio('audio-click', 1, true, true);
        MonsterCandy.eatMusic = this.add.audio('audio-eating', 1, true, true);
        MonsterCandy.backgroundMusic = this.add.audio('audio-music', 1, true, true);
        MonsterCandy.newlevelMusic = this.add.audio('audio-newlevel', 1, true, true);
    },
    update: function(){
        this.cache.isSoundDecoded('audio-click') && this.cache.isSoundDecoded('audio-eating') && this.cache.isSoundDecoded('audio-music') && this.cache.isSoundDecoded('audio-newlevel') && this.state.start('StoryHowto');
        // console.log(this.cache.isSoundDecoded('audio-click') && this.cache.isSoundDecoded('audio-eating') && this.cache.isSoundDecoded('audio-music') && this.cache.isSoundDecoded('audio-newlevel'));
    }
};