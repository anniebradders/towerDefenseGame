import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene{
    constructor(){
        super('Preloader');
    }

    init(){
        this.readyCount = 0;
    }

    preload(){
        //time event for logo 
        this.timedEvent = this.time.delayedCall(1, this.ready, [], this)
        this.createPreloader();
        this.loadAssests();
    
    } 

    createPreloader(){
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        //add logo image
        this.add.image(width / 2, height / 2 - 100, 'logo')

        //display progress bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();

        progressBox.fillStyle(0x222222,0.8);
        progressBox.fillRect(width / 2 -160, height / 2 + 80, 320, 50);

        //loading text
        var loadingText = this.make.text({
            x: width / 2 - 45,
            y: height / 2 + 50,
            text: 'Loading...',
            style:{
                font: '20px monospace',
                fill: '#ffffff'
            }
        });

        loadingText.setDisplayOrigin(0.5, 0.5);

        //percent text
        var percenText = this.make.text({
            x: width / 2,
            y: height / 2 + 100,
            text: '0%',
            style:{
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        percenText.setDisplayOrigin(0.5, 0.5);

        //loading assets text
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 125,
            text: '',
            style:{
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        assetText.setDisplayOrigin(0.5, 0.5);

        //update progress bar
        this.load.on('progress', function (value){
            percenText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff,1);
            progressBar.fillRect(width / 2 -150, height / 2 + 90, 300 * value, 30);
        });

        //update file progress text
        this.load.on('fileprogress', function (file){
            assetText.setText('Loading asset: ' + file.key);
        });

        //remove progress bar when complete
        this.load.on('complete', function(){
            progressBar.destroy();
            progressBox.destroy();
            assetText.destroy();
            loadingText.destroy();
            percenText.destroy();
            this.ready();
        }.bind(this));
    }

    loadAssests(){
        //load assets needed in our game
        //this.load.image('background', './assets/level/Background.png');
        this.load.image('AntiAirFire1', './assets/level/AntiAirFire1.png');
        this.load.image('defense1', './assets/defense/AntiAir.png');
        this.load.image('AntiAirFire2', './assets/level/AntiAirFire2.png');
        this.load.image('AntiAirFire3', './assets/level/AntiAirFire3.png');
        this.load.image('defense2', './assets/defense/Artillery.png');
        this.load.image('defense3', './assets/defense/MachineGun.png');
        this.load.image('MachineGunFire1', './assets/level/MachineGunFire1.png');
        this.load.image('MachineGunFire2', './assets/level/MachineGunFire2.png');
        this.load.image('defense4', './assets/defense/FlameThrower.png' )

        this.load.image('attack1', './assets/attack/Aerial.png');
        this.load.image('attack2', './assets/attack/Hacker.png');
        this.load.image('attack3', './assets/attack/Redhat.png');
        this.load.image('attack4', './assets/attack/Robot.png');
        this.load.image('attack5', './assets/attack/Standard.png');
        this.load.image('attack6', './assets/attack/Tank.png');

        this.load.image('cursor', './assets/ui/cursor.png')
        this.load.image('arrow', './assets/ui/arrow.png')

        //placeholder
        this.load.image('logo2', './assets/logo.png');

        //tile map in JSON format
        this.load.tilemapTiledJSON('level1', './assets/level/level1.json');
        this.load.spritesheet('terrainTiles_default', './assets/level/terrainTiles_default.png', { frameWidth: 64, frameHeight: 64});

        
    }

    ready(){
        this.readyCount++;
        if(this.readyCount === 2){
            this.scene.start('Game');
        }
    }

}