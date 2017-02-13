export default class GameAbstract extends Phaser.State {
  preload() {
    this.load.onLoadStart.add(this.loadStart, this);
    this.load.onFileComplete.add(this.fileComplete, this);
    this.load.onLoadComplete.add(this.loadComplete, this);
  }

  loadStart() {
    this.loadingText = this.add.text(20, this.world.height - 32, 'Loading...', { font: '20px Arial', fill: '#ffffff' });
  }

  fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.loadingText.setText('File Complete: ' + progress + '% - ' + totalLoaded + ' out of ' + totalFiles);
  }

  loadComplete() {
    game.world.remove(this.loadingText);

    this.time.advancedTiming = true;
  }

  create() {
    this.showDebug = false;
    game.input.keyboard.addKey(Phaser.KeyCode.D).onDown.add(() => {
      this.showDebug = !this.showDebug;
    });

    game.camera.x = game.world.centerX - game.width / 2;
  }

  update() {
  }

  render() {
    game.debug.text(game.time.fps, 5, 14, '#00ff00');
  }

  // loadSpriter(key) {
  //   if(!this.spriterLoader) this.spriterLoader = new Spriter.Loader();
  //
  //   let spriterFile = new Spriter.SpriterXml(game.cache.getXML(key + 'Animations'));
  //
  //   // process loaded xml/json and create internal Spriter objects - these data can be used repeatly for many instances of the same animation
  //   let spriter = this.spriterLoader.load(spriterFile);
  //
  //   return new Spriter.SpriterGroup(game, spriter, key, key);
  // }

  drawIsoGrid() {
    let isoGrid = new IsoGrid(game);
    isoGrid.drawGrid();
  }
}
