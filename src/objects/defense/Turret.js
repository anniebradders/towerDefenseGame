import Phaser from 'phaser';

export default class Turret extends Phaser.GameObjects.Image{
    constructor(scene, x, y, map){
        super(scene, x, y, 'defense3');

        this.scene = scene;
        this.map = map;
        this.nextTic = 0;
        //targetting both ground and flying units
        this.targetting = 0;

        //add turret to game
        this.scene.add.existing(this);
        this.setScale(1.2);
    }

    update(time, delta){
        //time to shoot
        if(time > this.nextTic){
            this.fire();
            this.nextTic = time + 1000;
        }
    }
    //places on map
    place(i, j){
        this.y = i * 64 + 32;
        this.x = j * 64 + 32;
        this.map[i][j] = 1;
    }

    //returns the targetting when Bullet is created
    getTurret(x, y){
        if (this.x === x && this.y === y){
            return this.targetting;
        }
        return "no_result";
    }

    fire(){
        //returns attackers within the turrets range
        var attackersInRange = this.scene.getAttacker(this.x, this.y, 200);
        if (attackersInRange.length >= 1) {
            //fires at the closest attacker in range
            var angle = Phaser.Math.Angle.Between(this.x, this.y, attackersInRange[0].x, attackersInRange[0].y);
            this.scene.addBullet(this.x, this.y, angle, this.targetting);
            this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
        }
        
    }
}