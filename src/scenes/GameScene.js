import Phaser from 'phaser';
import map from '../config/map';
import Turret from '../objects/defense/Turret';
import AntiAir from '../objects/defense/AntiAir';
import Artillery from '../objects/defense/Artillery';
import FlameThrower from '../objects/defense/FlameThrower';
import Robot from '../objects/attack/Robot';
import Aerial from '../objects/attack/Aerial';
import Hacker from '../objects/attack/Hacker';
import Redhat from '../objects/attack/Redhat';
import Standard from '../objects/attack/Standard';
import Tank from '../objects/attack/Tank';


var option = 0;

export default class GameScene extends Phaser.Scene{
    constructor(){
        super('Game');
    }


    init(){
        this.map = map.map(function (arr){
            return arr.slice();
        });
    } 

    create(){
      this.createMap();
      this.createInventory();
      this.createAttackerInventory();
      this.createCursor();
      this.createArrow();
      this.createGroups();
    }

    createGroups(){
        this.turrets = this.add.group({ classType: Turret, runChildUpdate: true });
        this.AntiAir = this.add.group({ classType: AntiAir, runChildUpdate: true });    
        this.Artillery = this.add.group({ classType: Artillery, runChildUpdate: true });
        this.FlameThrower = this.add.group({ classType: FlameThrower, runChildUpdate: true });
    
        this.input.on('pointerdown', this.placeTurret.bind(this));
    }

    createAttackerInventory(){
        var attackArray;

        var x = -50;

        for(var i = 1; i < 7; i++){
            let attack = this.add.image(x+=100,650,"attack" + i);

            attack.index = i;

            attack.setScale(2);

            attack.setInteractive();

            attackArray += attack.index;
        }
    }



    createInventory(){
        var defenseArray;

        var x = 50;

        for(var i = 1; i < 5; i++){
            let defense = this.add.image(x+=100,550,"defense" + i);
            
            
            defense.index = i;

            defense.setScale(2);

            defense.setInteractive();

            defenseArray += defense.index;
        }

        this.input.on('gameobjectdown', this.InvenClick.bind(this));
    }

    InvenClick(pointer, defense){
        option = defense.index-1;
    }

    InvenSwap(){

    }

    createCursor(){
        this.cursor = this.add.image(32, 32, 'cursor');
        this.cursor.setScale(2);
        this.cursor.alpha = 1;

        this.input.on('pointermove', function (pointer){
            var i = Math.floor(pointer.y /64);
            var j = Math.floor(pointer.x / 64);

            if(this.canPlaceTurret(i,j)){
                this.cursor.setPosition(j * 64 + 32, i * 64 + 32);
                this.cursor.alpha = 0.8;
            }else{
                this.cursor.alpha = 0;
            }
        }.bind(this));
    }

    createArrow(){
        this.add.image(32, 550, 'arrow')

    }

    canPlaceTurret(i, j){
        if(i < 8 && j < 10){
            return this.map[i][j] === 0;
        }
    }

    createMap(){
        //create our map
        this.bgMap = this.make.tilemap({key: 'level1'});
        //add tileset image
        this.tiles = this.bgMap.addTilesetImage('terrainTiles_default');
        //create our background layer
        this.backgroundLayer = this.bgMap.createStaticLayer('Background', this.tiles, 0, 0);
    }

    placeTurret(pointer){
        var i = Math.floor(pointer.y /64);
        var j = Math.floor(pointer.x / 64);

        if(this.canPlaceTurret(i, j)){
            var turret = this.turrets.getFirstDead();
            if(!turret){
                if(option === 0){
                    turret = new AntiAir(this, 0, 0, this.map);
                }else if(option === 1){
                    turret = new Artillery(this, 0, 0, this.map);
                }else if(option === 2){
                    turret = new Turret(this, 0, 0, this.map);
                }else if(option == 3){
                    turret = new FlameThrower(this, 0, 0, this.map);
                }
                this.turrets.add(turret);
            }
            turret.setActive(true);
            turret.setVisible(true);
            turret.place(i, j);
            //TODO: ADD LOGIC TO UPDATE NUM OF TURRETS
        }
    }
}
