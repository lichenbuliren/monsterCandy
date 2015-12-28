/**
 * Created by Heaven on 12/23/15.
 */
var MonsterCandy = MonsterCandy || {};

MonsterCandy.Boot = function(game) {};

MonsterCandy.Boot.prototype = {
    init: function() {
        console.log('this is Boot state');
    },
    preload: function() {
        // 加载背景和进度条资源
        this.load.image('loadingBackground', '../assets/screen-loading.png');
        this.load.image('loading-bar', '../assets/loading-bar.png');
    },
    create: function() {
        // 设置单点触摸
        this.input.maxPointers = 1;
        // 设置舞台背景色
        this.game.stage.backgroundColor = '#0d0222';
        // 设置全屏适配模式
        // EXACT_FIT 全屏拉伸适配
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // 强制竖屏
        this.scale.forcePortrait = true;
        // 开启 Physics.ARCADE 物理引擎
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('Preload');
    }
};