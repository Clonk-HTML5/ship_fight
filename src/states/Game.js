/* globals __DEV__ */
import Phaser from 'phaser'
import GameAbstract from './GameAbstract'
import Level2 from '../maps/Level2'
import Ship from '../sprites/Ship'

export default class extends GameAbstract {
  init () {}
  preload () {
    super.preload();
    game.load.tilemap('level2', '/assets/tilemap/level2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', '/assets/tilemap/tileset.png');
    game.load.atlasJSONHash('ship1', '/assets/sprites/ship-1.png', '/assets/sprites/ship-1.json');
    // game.load.image('tiles', '/assets/tilemap/tileset.png');
  }

  create () {
    super.create();

    this.level2 = new Level2()
    this.level2.initTilemap();

    this.ship = new Ship({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'ship1',
      assetpath: 'Ship_10001',
      level: this.level2
    })

    this.game.add.existing(this.ship)

  }

  render () {
    if (__DEV__) {
      this.game.debug.body(this.ship)
      this.game.debug.spriteInfo(this.ship, 32, 32)
    }
  }
}
