import 'phaser';

export default class Demo extends Phaser.Scene {
    player: any;
    platforms: any;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    velocity:number = 200;
    frameRate:number = 15;
    isLookingLeft: boolean;
    isCrouched:boolean;
    constructor() {
        super('demo');
    }

    //var player;
    //var platforms;
    //var cursors;
    preload() {
        this.load.image('sky', 'assets/sky.jpg');
        this.load.image('ground', 'assets/ground.png');
        this.load.spritesheet('mario', 'assets/mario.png', { frameWidth: 30, frameHeight: 32 });
    }

    create() {
        this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(1).refreshBody();

        this.player = this.physics.add.sprite(100, 450, 'mario').setScale(4).refreshBody();

        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'crouchLeft',
            frames: [{ key: 'mario', frame: 0 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'jumpLeft',
            frames: [{ key: 'mario', frame: 1 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mario', { start: 3, end: 5 }),
            frameRate: this.frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'turnLeft',
            frames: [{ key: 'mario', frame: 6 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'turnRight',
            frames: [{ key: 'mario', frame: 7 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mario', { start: 8, end: 10 }),
            frameRate: this.frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'jumpRight',
            frames: [{ key: 'mario', frame: 12 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'crouchRight',
            frames: [{ key: 'mario', frame: 13 }],
            frameRate: 1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.platforms);
    }
    update() {

        if(this.player.body.velocity.x == 0)
        {
            this.player.anims.play(this.isLookingLeft ? 'turnLeft' : 'turnRight');
        }

        if(this.cursors.down.isDown) {
            this.player.anims.play(this.isLookingLeft ? 'crouchLeft': 'crouchRight');
            this.isCrouched = true
        } else {
            this.isCrouched = false;
        }

        if (this.cursors.left.isDown)
        {
            this.isLookingLeft = true;
            this.player.setVelocityX(-this.velocity);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.isLookingLeft = false;
            this.player.setVelocityX(this.velocity);
            this.player.anims.play('right', true);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-750);
            if(!this.isCrouched){

            this.player.anims.play(this.isLookingLeft ? 'jumpLeft' : 'jumpRight');
            }
        }
        else if (!this.player.body.touching.down)
        {
            if(!this.isCrouched){

            this.player.anims.play(this.isLookingLeft ? 'jumpLeft' : 'jumpRight');
            }
        }


        if(Math.abs(this.player.body.velocity.x) > 0) {
            this.player.setVelocityX(this.player.body.velocity.x + (20 * (this.isLookingLeft ? 1 : -1)));
        }

    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: Demo,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            debug: false
        }
    },
};

const game = new Phaser.Game(config);
