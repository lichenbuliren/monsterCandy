/**
 * Created by Heaven on 12/23/15.
 */
var MonsterCandy = MonsterCandy || {};
var game = new Phaser.Game(640,960,Phaser.CANVAS);
game.state.add('Boot',MonsterCandy.Boot);
game.state.add('Preload',MonsterCandy.Preload);
game.state.add('StoryHowto',MonsterCandy.StoryHowto);
game.state.add('Achievements',MonsterCandy.Achievements);
game.state.add('MainMenu',MonsterCandy.MainMenu);
game.state.add('Game',MonsterCandy.Game);
game.state.start('Boot');