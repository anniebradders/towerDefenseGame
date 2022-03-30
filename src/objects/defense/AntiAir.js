import Phaser from 'phaser';

export default class Turret extends Phaser.GameObjects.Image{
    constructor(scene, x, y, map){
        super(scene, x, y, 'defense1');

        this.scene = scene;
        this.map = map;
        this.nextTic = 0;

        //targetting both ground and flying units
        this.targetting = 2;

        //add AntiAir to game
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

    place(i, j){
        this.y = i * 64 + 32;
        this.x = j * 64 + 32;
        this.map[i][j] = 1;
    }

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
            var target = false;
            for (var i = 0; i < attackersInRange.length; i++){
                //fires at the closest flying attacker in range
                if (attackersInRange[i].flying === true){
                    target = true;
                    var closest = i;
                    break;
                }
            }
            if (target === true){
                var angle = Phaser.Math.Angle.Between(this.x, this.y, attackersInRange[closest].x, attackersInRange[closest].y);
                this.scene.addBullet(this.x, this.y, angle);
                this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
            }
        }
        
    }
}