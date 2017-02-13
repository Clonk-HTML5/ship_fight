export default class LevelAbstract {
  constructor(tilemapName = 'level2', tilesetImageName = 'tiles', baseLayerName = 'Base', collisionLayerName = 'Collision') {
    this.tilemapName = tilemapName;
    this.tilesetImageName = tilesetImageName;
    this.baseLayerName = baseLayerName;
    this.collisionLayerName = collisionLayerName;
  }

  initTilemap() {
    let map = game.add.tilemap(this.tilemapName);
    this.map = map;

    map.addTilesetImage(this.tilesetImageName, this.tilesetImageName);
    map.createLayer(this.baseLayerName);

    let collisionLayer = map.createLayer(this.collisionLayerName);
    this.collisionLayer = collisionLayer;

    collisionLayer.visible = false;

    map.setCollisionByExclusion([], true, this.collisionLayer);

    collisionLayer.resizeWorld();

    // this.initPlayer();

    // let exit = this.map.objects.Meta.find( o => o.name == 'exit');
    // this.exitRect = new Phaser.Rectangle(exit.x, exit.y, exit.width, exit.height);
  }
}
