/* globals __DEV__ */
import Phaser from 'phaser'
import GameAbstract from './GameAbstract'
import Level2 from '../maps/Level2'

export default class extends GameAbstract {
  init () {}
  preload () {
    super.preload();
    game.load.tilemap('level2', '/assets/tilemap/level2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', '/assets/tilemap/tileset.png');
    game.load.image('tiles', '/assets/tilemap/tileset.png');
  }

  create () {
    super.create();

    Level2.initTilemap();

  }

  // initTilemap() {
  //   let map = game.add.tilemap('level2');
  //   this.map = map;
  //
  //   map.addTilesetImage('tiles', 'tiles');
  //   map.createLayer('Base');
  //
  //   let collisionLayer = map.createLayer('Collision');
  //   this.collisionLayer = collisionLayer;
  //
  //   collisionLayer.visible = false;
  //
  //   map.setCollisionByExclusion([], true, this.collisionLayer);
  //
  //   collisionLayer.resizeWorld();
  //
  //   // this.initPlayer();
  //
  //   // let exit = this.map.objects.Meta.find( o => o.name == 'exit');
  //   // this.exitRect = new Phaser.Rectangle(exit.x, exit.y, exit.width, exit.height);
  // }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
