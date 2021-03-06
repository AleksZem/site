var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {y: 300},
        debug: false

      }
    },
    parent: 'gameID',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var score = 0;
    var scoretext;
    var gameOver=false;
    var bombs;
    var stars;
    var player;

    

    function preload ()
    {
		this.load.image('sky', 'bin/sky.png');
		this.load.image('ground', 'bin/platform.png');
		this.load.image('star', 'bin/star.png');
		this.load.image('bomb', 'bin/bomb.png');
		this.load.spritesheet('dude','bin/dude.png',{ frameWidth: 32, frameHeight: 48 });
    }

    function create ()
    {
      scoreText = this.add.text(16,16,'Score: 0' , {fontSize: '32px', fill: '#000'});
      this.add.image(400,300,'sky');
      stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
      });
      stars.children.iterate(
        function (child) {
          child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        }
      );
      platforms = this.physics.add.staticGroup();
      platforms.create(400,568,'ground').setScale(2).refreshBody();
      platforms.create(600,400,'ground');
      platforms.create(50,250,'ground');
      platforms.create(750,220,'ground');

      cursors = this.input.keyboard.createCursorKeys();

      player = this.physics.add.sprite(100,450,'dude');
      this.physics.add.collider(player,platforms);
      this.physics.add.collider(stars,platforms);
      this.physics.add.overlap(player, stars, collectStar, null, this);
      player.setBounce(0.1);
      player.setCollideWorldBounds(true);

      bombs = this.physics.add.group();
      this.physics.add.collider(bombs, platforms);
      this.physics.add.collider(player, bombs, hitBomb, null, this);

      scoreText = this.add.text(16,16,'Score: 0' , {fontSize: '32px', fill: '#000'});
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn',
        frames: [{key: 'dude', frame: 4}],
        frameRate: 20
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
      });
    }

    function hitBomb (player, bomb){
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      gameOver = true;
    }

    function collectStar (player, star){
      star.disableBody(true, true);
      score+=10;
      scoreText.setText('Score: '+score);
      if(stars.countActive(true)===0)
      {
        stars.children.iterate(function (child)
        {
          child.enableBody(true, child.x, 0, true, true);
        });
        var xPos = (player.x < 400) ? Phaser.Math.Between(400,800) : Phaser.Math.Between(0,399);
        var bomb = bombs.create(xPos, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200,200),20);
        bomb.allowGravity = false;
      }
    }

    function update ()
    {
      if(cursors.left.isDown){
        player.setVelocityX(-160);
        player.anims.play('left', true);
      }
      else if(cursors.right.isDown){
        player.setVelocityX(160);
        player.anims.play('right', true);
      }
      else{
        player.setVelocityX(0);
        player.anims.play('turn', true);
      }
      if(cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-350);
      }
    }
