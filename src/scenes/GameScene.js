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
import Bullet from '../objects/misc/Bullet';
import levelConfig from '../config/levelConfig';


var option = 0;
var attackerOption = 0; 
var rand = 0;

export default class GameScene extends Phaser.Scene{
    constructor(){
        super('Game');
    }


    init(){
        this.map = map.map(function (arr){
            return arr.slice();
        });
        this.nextAttacker = 0;
    } 

    create(){
      this.createMap();
      this.createInventory();
      this.createAttackerInventory();
      this.createCursor();
      this.createPath();
      this.createArrow();
      this.createGroups();
    }

    createGroups(){

        this.robots = this.physics.add.group({ classType: Robot, runChildUpdate: true });
        this.aerial = this.physics.add.group({ classType: Aerial, runChildUpdate: true });
        this.hacker = this.physics.add.group({ classType: Hacker, runChildUpdate: true });
        this.redhat = this.physics.add.group({ classType: Redhat, runChildUpdate: true });
        this.standard = this.physics.add.group({ classType: Standard, runChildUpdate: true });
        this.tank = this.physics.add.group({ classType: Tank, runChildUpdate: true });

        this.turrets = this.add.group({ classType: Turret, runChildUpdate: true });
        this.AntiAir = this.add.group({ classType: AntiAir, runChildUpdate: true });    
        this.Artillery = this.add.group({ classType: Artillery, runChildUpdate: true });
        this.FlameThrower = this.add.group({ classType: FlameThrower, runChildUpdate: true });
        this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    
        this.physics.add.overlap(this.robots, this.bullets, this.damageUnit.bind(this));
        this.input.on('pointerdown', this.placeTurret.bind(this));
    }


    update(time, delta) {
        if(time > this.nextAttacker) {
            var attacker = this.robots.getFirstDead();
            rand = Phaser.Math.Between(0, 3);
            attackerOption = Phaser.Math.Between(0, 3);
                if(attackerOption === 0){
                    if (rand === 0){
                        attacker = new Robot(this, 0, 0, this.path);
                    }else if(rand === 1){
                        attacker = new Robot(this, 0, 0, this.path2);
                    }else if(rand === 2){
                        attacker = new Robot(this, 0, 0, this.path3);
                    }else if(rand === 3){
                        attacker = new Robot(this, 0, 0, this.path4);
                    }
                    
                }else if(attackerOption === 1){
                    if (rand === 0){
                        attacker = new Aerial(this, 0, 0, this.path);
                    }else if(rand === 1){
                        attacker = new Aerial(this, 0, 0, this.path2);
                    }else if(rand === 2){
                        attacker = new Aerial(this, 0, 0, this.path3);
                    }else if(rand === 3){
                        attacker = new Aerial(this, 0, 0, this.path4);
                    }
                }else if(attackerOption === 2){
                    if (rand === 0){
                        attacker = new Hacker(this, 0, 0, this.path);
                    }else if(rand === 1){
                        attacker = new Hacker(this, 0, 0, this.path2);
                    }else if(rand === 2){
                        attacker = new Hacker(this, 0, 0, this.path3);
                    }else if(rand === 3){
                        attacker = new Hacker(this, 0, 0, this.path4);
                    }
                }else if(attackerOption == 3){
                    if (rand === 0){
                        attacker = new Standard(this, 0, 0, this.path);
                    }else if(rand === 1){
                        attacker = new Standard(this, 0, 0, this.path2);
                    }else if(rand === 2){
                        attacker = new Standard(this, 0, 0, this.path3);
                    }else if(rand === 3){
                        attacker = new Standard(this, 0, 0, this.path4);
                    }
                }else if(attackerOption == 4){
                    if (rand === 0){
                        attacker = new Tank(this, 0, 0, this.path);
                    }else if(rand === 1){
                        attacker = new Tank(this, 0, 0, this.path2);
                    }else if(rand === 2){
                        attacker = new Tank(this, 0, 0, this.path3);
                    }else if(rand === 3){
                        attacker = new Tank(this, 0, 0, this.path4);
                    }
                }else if(attackerOption == 5){
                    if (rand === 0){
                        attacker = new Redhat(this, 0, 0, this.path);
                    }else if(rand === 1){
                        attacker = new Redhat(this, 0, 0, this.path2);
                    }else if(rand === 2){
                        attacker = new Redhat(this, 0, 0, this.path3);
                    }else if(rand === 3){
                        attacker = new Redhat(this, 0, 0, this.path4);
                    }
                }
                
                this.robots.add(attacker);
                attacker.startOnPath();
                this.nextAttacker = time + 200;
        }
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

        var attacker = this.robots.getFirstDead();

        attacker = new Robot(this, 0, 0, this.path);
        console.log(attacker)
    }

    // InvenSwap(){

    // }

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

    createPath(){
        this.graphics = this.add.graphics();
        //the path the enemies follow
        this.path = this.add.path(700, 32);
        this.path.lineTo(32, 32);
        
        //visualises the path
        this.graphics.lineStyle(3, 0xffffff, 1);
        this.path.draw(this.graphics);

        this.path2 = this.add.path(700, 96);
        this.path2.lineTo(32, 96);

        this.path2.draw(this.graphics);
        
        this.path3 = this.add.path(700, 160);
        this.path3.lineTo(32, 160);

        this.path3.draw(this.graphics);
        
        this.path4 = this.add.path(700, 224);
        this.path4.lineTo(32, 224);

        this.path4.draw(this.graphics);
    }

    createMap(){
        //create our map
        this.bgMap = this.make.tilemap({key: 'level1'});
        //add tileset image
        this.tiles = this.bgMap.addTilesetImage('terrainTiles_default');
        //create our background layer
        this.backgroundLayer = this.bgMap.createStaticLayer('Background', this.tiles, 0, 0);
    }

    getAttacker(x, y, distance) {
        var attackUnits = this.robots.getChildren();
        var attackInRange = [];
        for (var i = 0; i < attackUnits.length; i++){
            if (attackUnits[i].active && Phaser.Math.Distance.Between(x, y, attackUnits[i].x, attackUnits[i].y) <= distance){
                return attackUnits[i];
            }
        }
        return false;
    }

    addBullet(x, y, angle){
        var bullet = this.bullets.getFirstDead();
        if (!bullet) {
            bullet = new Bullet(this, 0, 0);
            this.bullets.add(bullet);
        }
        bullet.fire(x, y, angle);
    }

    damageUnit(attacker, bullet){
        if (attacker.active === true && bullet.active === true ) {
            bullet.setActive(false);
            bullet.setVisible(false);

            //decrease hp
            attacker.recieveDamage(levelConfig.default.damage); //bullet.damage
        }
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
