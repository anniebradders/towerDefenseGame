//import map from '../config/map.js';
import Turret from '../objects/defense/Turret.js';
import AntiAir from '../objects/defense/AntiAir.js';
import Artillery from '../objects/defense/Artillery.js';
import FlameThrower from '../objects/defense/FlameThrower.js';

import Robot from '../objects/attack/Robot.js';
import Aerial from '../objects/attack/Aerial.js';
import Hacker from '../objects/attack/Hacker.js';
import Redhat from '../objects/attack/Redhat.js';
import Standard from '../objects/attack/Standard.js';
import Tank from '../objects/attack/Tank.js';
import Bullet from '../objects/misc/Bullet.js';
import AttackBullet from '../objects/misc/AttackBullet.js';
import levelConfig from '../config/levelConfig.js';

var option = 0;
var attackerOption = 0; 
var rand = 0;
var counter = 0;

let mapData, data, unlockData;
let check = true;

$.ajax({
    type: 'GET',
    url: '/getGame',
    data,
    success: function(data) {
        for(var i = 0; i < data.length; i++){
            console.log(data[i].email);
            if(data[i].email == getCookie('email')){
                mapData = data[i].map;
                unlockData = data[i].units;

                for(var x = 0; x < unlockData.length; x++){
                    if(unlockData[x] > 0){
                        check = true;
                    }
                }
            }
        }
    },
    error: function(xhr) {
    console.log(xhr);
    }
});

export default class GameScene extends Phaser.Scene{
    constructor(){
        super('Game');
    }

    init(){
        this.map = mapData;
    } 

    create(){
      this.createMap();
      this.createInventory();
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
        this.attackBullets = this.physics.add.group({ classType: AttackBullet, runChildUpdate: true });
    
        this.physics.add.overlap(this.robots, this.bullets, this.damageUnit.bind(this));
        this.physics.add.overlap(this.turrets, this.attackBullets, this.damageDefense.bind(this));

        for(var i = 0; i < 8; i++){
            for(var j = 0; j < 10; j++){
                var turret = this.turrets.getFirstDead();
                if(this.map[i][j] == 1){
                    console.log(this.map[i][j]);
                    turret = new Turret(this, 32, 32, this.map);
                    turret.setActive(true);
                    turret.setVisible(true);
                    turret.place(i, j);
                    this.turrets.add(turret);
                }else if(this.map[i][j] == 2){
                    turret = new AntiAir(this, 0, 0, this.map);
                    turret.setActive(true);
                    turret.setVisible(true);
                    turret.place(i, j);
                    this.turrets.add(turret);
                }else if(this.map[i][j] == 3){
                    turret = new Artillery(this, 0, 0, this.map);
                    turret.setActive(true);
                    turret.setVisible(true);
                    turret.place(i, j);
                    this.turrets.add(turret);
                }else if(this.map[i][j] == 4){
                    turret = new FlameThrower(this, 0, 0, this.map);
                    turret.setActive(true);
                    turret.setVisible(true);
                    turret.place(i, j);
                    this.turrets.add(turret);
                }
            }
        }

        

        this.input.on('pointerdown', this.placeTurret.bind(this));
    }

    update(time, delta) {
        if(time > this.nextAttacker) {
            if (levelConfig.total.attackCount == 0 ){
                
            }
            else{

            var attacker = this.robots.getFirstDead();
            rand = Phaser.Math.Between(0, 3);

            console.log(levelConfig.total.attackCount)

            attackerOption = Phaser.Math.Between(1, levelConfig.total.attackCount);
            console.log(unlockData);
            if(((attackerOption < levelConfig.robot.count && attackerOption >= 1) && levelConfig.robot.count > 0) && unlockData[2] > 0){
                levelConfig.robot.count -= 1;
                levelConfig.total.attackCount -= 1;
                if (rand === 0){
                    attacker = new Robot(this, 0, 0, this.path);
                }else if(rand === 1){
                    attacker = new Robot(this, 0, 0, this.path2);
                }else if(rand === 2){
                    attacker = new Robot(this, 0, 0, this.path3);
                }else if(rand === 3){
                    attacker = new Robot(this, 0, 0, this.path4);
                }
                
            }else if(((attackerOption < (levelConfig.aerial.count + levelConfig.robot.count)  && attackerOption >= levelConfig.robot.count) && levelConfig.aerial.count > 0) && unlockData[0] > 0){
                console.log("success");
                levelConfig.aerial.count -= 1;
                levelConfig.total.attackCount -= 1;
                if (rand === 0){
                    attacker = new Aerial(this, 0, 0, this.path);
                }else if(rand === 1){
                    attacker = new Aerial(this, 0, 0, this.path2);
                }else if(rand === 2){
                    attacker = new Aerial(this, 0, 0, this.path3);
                }else if(rand === 3){
                    attacker = new Aerial(this, 0, 0, this.path4);
                }
            }else if(((attackerOption < (levelConfig.hacker.count + levelConfig.aerial.count + levelConfig.robot.count) && attackerOption >= levelConfig.aerial.count) && levelConfig.hacker.count > 0) && unlockData[3] > 0){
                levelConfig.hacker.count -= 1;
                levelConfig.total.attackCount -= 1;
                if (rand === 0){
                    attacker = new Hacker(this, 0, 0, this.path);
                }else if(rand === 1){
                    attacker = new Hacker(this, 0, 0, this.path2);
                }else if(rand === 2){
                    attacker = new Hacker(this, 0, 0, this.path3);
                }else if(rand === 3){
                    attacker = new Hacker(this, 0, 0, this.path4);
                }
            }else if(((attackerOption < (levelConfig.standard.count + levelConfig.hacker.count + levelConfig.aerial.count + levelConfig.robot.count) && attackerOption >= levelConfig.aerial.count) && levelConfig.standard.count > 0)){
                levelConfig.standard.count -= 1;
                levelConfig.total.attackCount -= 1;
                if (rand === 0){
                    attacker = new Standard(this, 0, 0, this.path);
                }else if(rand === 1){
                    attacker = new Standard(this, 0, 0, this.path2);
                }else if(rand === 2){
                    attacker = new Standard(this, 0, 0, this.path3);
                }else if(rand === 3){
                    attacker = new Standard(this, 0, 0, this.path4);
                }
            }else if(((attackerOption < (levelConfig.tank.count + levelConfig.standard.count + levelConfig.hacker.count + levelConfig.aerial.count + levelConfig.robot.count) && attackerOption >= levelConfig.aerial.count) && levelConfig.tank.count > 0) && unlockData[1] > 0){
                levelConfig.tank.count -= 1;
                levelConfig.total.attackCount -= 1;
                if (rand === 0){
                    attacker = new Tank(this, 0, 0, this.path);
                }else if(rand === 1){
                    attacker = new Tank(this, 0, 0, this.path2);
                }else if(rand === 2){
                    attacker = new Tank(this, 0, 0, this.path3);
                }else if(rand === 3){
                    attacker = new Tank(this, 0, 0, this.path4);
                }
            }else if((attackerOption < (levelConfig.redhat.count + levelConfig.tank.count + levelConfig.standard.count + levelConfig.hacker.count + levelConfig.aerial.count + levelConfig.robot.count) && levelConfig.redhat.count > 0)  && unlockData[6] > 0){
                levelConfig.redhat.count -= 1;
                levelConfig.total.attackCount -= 1;
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
            else{
                if (rand === 0){
                    attacker = new Standard(this, 0, 0, this.path);
                }else if(rand === 1){
                    attacker = new Standard(this, 0, 0, this.path2);
                }else if(rand === 2){
                    attacker = new Standard(this, 0, 0, this.path3);
                }else if(rand === 3){
                    attacker = new Standard(this, 0, 0, this.path4);
                }
                attacker.setActive(false);
            }
                
                this.robots.add(attacker);
                attacker.startOnPath();
                this.nextAttacker = time + 200;
            }   
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

            defense.alpha = 0.5;

            defense.setScale(2);
        
                if(i == 1){
                    defense.setInteractive();
                    defense.alpha = 1;
                }else if(i == 2 ){
                    defense.setInteractive();
                    defense.alpha = 1;
                }else if(i == 3 && unlockData[4] > 0){
                    defense.setInteractive();
                    defense.alpha = 1;
                }else if(i == 4 && unlockData[5] > 0){
                    defense.setInteractive();
                    defense.alpha = 1;
                }
            
            defenseArray += defense.index;
        }

        this.input.on('gameobjectdown', this.InvenClick.bind(this));

        const saveButton = this.add.text(525, 550, 'Save Game', { fill: '#FFFFFF' });
        saveButton.setInteractive().on('pointerdown', () => this.saveGameData());

        const attackButton = this.add.text(25, 550, 'Attack', { fill: '#FFFFFF' });
        attackButton.setInteractive().on('pointerdown', () => this.launchAttack());
    }

    saveGameData(){
        $.ajax({
            type: 'POST',
            url: '/saveGame',
            data: {
                email: getCookie('email'),
                mapLoad: JSON.stringify(this.map)
            },
            success: function(data) {},
            error: function(xhr) {
            console.log(xhr);
            }
        });
    }

    InvenClick(pointer, defense){
        option = defense.index-1;

       // var attacker = this.robots.getFirstDead();

        //attacker = new Robot(this, 0, 0, this.path);
    }

    createCursor(){
        this.cursor = this.add.image(32, 32, 'cursor');
        this.cursor.setScale(2);
        this.cursor.alpha = 1;

        this.input.on('pointermove', function (pointer){
            var i = Math.floor(pointer.y /64);
            var j = Math.floor(pointer.x / 64);

            if(this.canPlaceTurret(i,j) ){
                this.cursor.setPosition(j * 64 + 32, i * 64 + 32);
                this.cursor.alpha = 0.8;
            }else{
                this.cursor.alpha = 0;
            }
        }.bind(this));
    }

    createArrow(){
        //this.add.image(32, 550, 'arrow')

    }
    

    canPlaceTurret(i, j){
        if((i < 8 && j < 10) && check == true){
            return this.map[i][j] === 0;
        }
    }

    createPath(){
        this.graphics = this.add.graphics();
        //the path the enemies follow
        this.path = this.add.path(700, 160);
        this.path.lineTo(32, 160);

        this.path2 = this.add.path(700, 224);
        this.path2.lineTo(32, 224);

        this.path3 = this.add.path(700, 288);
        this.path3.lineTo(32, 288);

        this.path4 = this.add.path(700, 352);
        this.path4.lineTo(32, 352);

    }

    createMap(){
        //create our map
        this.bgMap = this.make.tilemap({key: 'level1'});
        //add tileset image
        this.tiles = this.bgMap.addTilesetImage('terrainTiles_default');
        //create our background layer
        this.backgroundLayer = this.bgMap.createStaticLayer('Background', this.tiles, 0, 0);
    }

    getTurret(x, y, distance) {
        //gets all turret units
        var defense = this.turrets.getChildren();
        var turretsInRange = [];
        for (var i = 0; i < defense.length; i++){
            if (defense[i].active && Phaser.Math.Distance.Between(x, y, defense[i].x, defense[i].y) <= distance){
                //adds to the turrets in range
                turretsInRange.push(defense[i]);
            }
        }
        return turretsInRange;
    }

    getAttacker(x, y, distance) {
        //gets all attacking units
        var attackUnits = this.robots.getChildren();
        var attackersInRange = [];
        for (var i = 0; i < attackUnits.length; i++){
            if (attackUnits[i].active && Phaser.Math.Distance.Between(x, y, attackUnits[i].x, attackUnits[i].y) <= distance){
                //adds to the attackers in range
                attackersInRange.push(attackUnits[i]);
            }
        }
        return attackersInRange;
    }

    addBullet(x, y, angle){
        var bullet = this.bullets.getFirstDead();
        if (!bullet) {
            bullet = new Bullet(this, 0, 0);
            this.bullets.add(bullet);

        }
    
        bullet.fire(x, y, angle);

        //gets all turrets
        var Turret = this.turrets.getChildren();
        for(var i = 0; i < Turret.length; i++){
            if (Turret[i].getTurretTargetting(bullet.x, bullet.y) !== "no_result"){
                //assigns targetting from the turret it was fired from
                var targetting = Turret[i].getTurretTargetting(bullet.x, bullet.y)
                break;
            }
        }
        //updates bullet class by putting a value of which turret it was fired from
        bullet.firedFrom = targetting;
    
    }

    addAttackerBullet(x, y, angle){
        var attackerBullet = this.attackBullets.getFirstDead();
        if (!attackerBullet) {
            attackerBullet = new AttackBullet(this, 0, 0);
            console.log("hi");
            this.attackBullets.add(attackerBullet);
        }
    
        attackerBullet.fire(x, y, angle);

        //updates bullet class by putting a value of which turret it was fired from    
    }

    damageUnit(attacker, bullet){
        if (attacker.active === true && bullet.active === true) {
            //attacker flying and the turret can hit flying units
            if (attacker.flying === true && (bullet.firedFrom === 2  || bullet.firedFrom === 0) ){

                bullet.setActive(false);
                bullet.setVisible(false);
                //decrease hp
                attacker.recieveDamage(levelConfig.default.damage);
                
            }
            if (attacker.flying === false && bullet.firedFrom !== 2){
                bullet.setActive(false);
                bullet.setVisible(false);
                //decrease hp
                attacker.recieveDamage(levelConfig.default.damage);
            }
            
            console.log("not killed")
            
        }
    }

    damageDefense(turret, bullet){
        if (turret.active === true && bullet.active === true) {
            //attacker flying and the turret can hit flying units
        
            bullet.setActive(false);
            bullet.setVisible(false);
            //decrease hp
            turret.recieveDamage(levelConfig.default.damage);
        }
            
    }

    placeTurret(pointer){
        var i = Math.floor(pointer.y /64);
        var j = Math.floor(pointer.x / 64);

        if(this.canPlaceTurret(i, j)){
            var turret = this.turrets.getFirstDead();
            if(!turret){
                if(option === 0){
                    turret = new Turret(this, 0, 0, this.map);
                }
                else if(option === 1){
                    turret = new AntiAir(this, 0, 0, this.map);
                }else if(option === 2){
                    turret = new Artillery(this, 0, 0, this.map);
                }
                else if(option == 3){
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

    launchAttack(){
        
        this.nextAttacker = 0;
        levelConfig.total.attackCount = levelConfig.robot.count + levelConfig.aerial.count + levelConfig.hacker.count + levelConfig.standard.count + levelConfig.tank.count + levelConfig.redhat.count;
    } 

}