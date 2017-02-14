import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset, assetpath, level }) {
    super(game, x, y, asset, assetpath)

    this.level = level;
    this.anchor.setTo(0.5)
    // this.angle = 2;

    this.MOVE_SPEED = 150;
    // this.scale.set(0.5);
    this.animations.add('idle', Phaser.Animation.generateFrameNames('Ship_1000', 3, 3, '', 0), 5, true, false);
    this.animations.add('move', Phaser.Animation.generateFrameNames('Ship_1000', 1, 13, '', 0), 10, true, false);
    this.play('idle');

    this.game.physics.arcade.enable(this);
    // this.body.allowRotation = false;

    this.body.setSize(40, 20, 15, 17);

    this.initKeyboard();

    // this.game.input.onDown.add(this.move, this);
    this.game.camera.follow(this);

    this.reset();
  }

  initKeyboard() {
   this.keyboardCursors = this.game.input.keyboard.createCursorKeys();
   this.moveSpeed = { x: 0, y: 0 }

   this.wasd = {
     up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
     down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
     left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
     right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
   };
 }

  update () {
    // this.angle += 1
    this.updatePlayer()

    this.game.physics.arcade.collide(this, this.level.collisionLayer)
  }

  move (pointer) {
    if (this.tween && this.tween.isRunning) {
        this.tween.stop();
      }
    this.rotation = this.game.physics.arcade.angleToPointer(this, pointer);    //  300 = 300 pixels per second = the speed the sprite will move at, regardless of the distance it has to travel
    var duration = (this.game.physics.arcade.distanceToPointer(this, pointer) / 300) * 1000;
    this. tween = this.game.add.tween(this).to({ x: pointer.x, y: pointer.y }, duration, Phaser.Easing.Linear.None, true);
  }

  updatePlayer() {
    // shorthand so i don't have to reference this all the time
    let keyboardCursors = this.keyboardCursors;
    let wasd = this.wasd;
    let player = this;
    let moveSpeed = this.moveSpeed;
    let joystick = this.joystick;

    // set our player's velocity to 0
    // so the sprite doesn't move when there is no input from our player
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    // keyboard movement
    // left and right keyboard movement
    if (keyboardCursors.left.isDown || wasd.left.isDown) moveSpeed.x = -player.MOVE_SPEED;
    else if (keyboardCursors.right.isDown || wasd.right.isDown) moveSpeed.x = player.MOVE_SPEED;
    else moveSpeed.x = 0;

    // up and down keyboard movement
    if (keyboardCursors.up.isDown || wasd.up.isDown) moveSpeed.y = -player.MOVE_SPEED;
    else if (keyboardCursors.down.isDown || wasd.down.isDown) moveSpeed.y = player.MOVE_SPEED;
    else moveSpeed.y = 0;

    if(Math.abs(moveSpeed.x) > 0 || Math.abs(moveSpeed.y) > 0) {
      player.body.velocity.x = moveSpeed.x;
      player.body.velocity.y = moveSpeed.y;

      // set direction using Math.atan2
      let targetPos = { x: player.x + moveSpeed.x, y: player.y + moveSpeed.y };
      player.rotation = Math.atan2(targetPos.y - player.y, targetPos.x - player.x);
    }

    if (game.input.activePointer.isDown) {
      this.rotation = game.physics.arcade.moveToPointer(this, this.MOVE_SPEED, game.input.activePointer, 800);
    }


    // check if player is moving
    if(Math.abs(player.body.velocity.x) > 0 || Math.abs(player.body.velocity.y) > 0) {
      // play the animation, phaser just returns when it's currently animating
      // so it's fine to call it on every frame
      player.play('move');
    } else {
      player.play('idle');
    }
  }

  reset() {
    let player1Start = this.level.map.objects.Meta.find( o => o.name == 'Player1Start');
    this.position.set(player1Start.x, player1Start.y);
    this.angle = 0;
  }

}
