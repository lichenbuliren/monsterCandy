/**
 * Created by Heaven on 12/23/15.
 */
var MonsterCandy = MonsterCandy || {};

MonsterCandy.Boot = function (game) {
};

MonsterCandy.Boot.prototype = {
    init: function () {
        console.log('this is Boot state');
    }
    ,
    preload: function () {
        this.load.image('loadingBg', '../assets/screen-loading.png');
        this.load.image('loadingBar','../assets/screen-loading.png')
    }
    ,
    create: function () {

    }
};