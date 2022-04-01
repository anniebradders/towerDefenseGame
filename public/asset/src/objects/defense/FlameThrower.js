
import levelConfig from '../../config/levelConfig.js';

export default class Turret extends Phaser.GameObjects.Image{
    constructor(scene, x, y, map){
        super(scene, x, y, 'defense4');

        this.scene = scene;
        this.map = map;
        this.nextTic = 0;
        this.hp = 0;
        //targetting ground units
        this.targetting = 2;

        //add FlameThrower to game
        this.scene.add.existing(this);
        this.setScale(1.2);
    }

    update(time, delta){
        //time to shoot
        if(time > this.nextTic){
            this.fire();
            this.nextTic = time + 1000 * levelConfig.flamethrower.firerate;
        }
    }

    place(i, j){
        this.y = i * 64 + 32;
        this.x = j * 64 + 32;
        this.hp = levelConfig.flamethrower.health;
        this.map[i][j] = 4;
    }

    //returns the targetting when Bullet is created
    getTurretTargetting(x, y){
        if (this.x === x && this.y === y){
            return this.targetting;
        }
        return "no_result";
    }

    recieveDamage(damage) {
        this.hp -= damage;
    
        // if hp drops below 0 we deactivate the attacker
        if (this.hp <= 0) {
            this.setActive(false);
            this.setVisible(false);
            //TODO: update our score
        }
    }

    fire(){
        //returns attackers within the turrets range
        var attackersInRange = this.scene.getAttacker(this.x, this.y, (50 * levelConfig.flamethrower.range));
        if (attackersInRange.length >= 1) {
            //fires at the closest attacker in range
            var angle = Phaser.Math.Angle.Between(this.x, this.y, attackersInRange[0].x, attackersInRange[0].y);
            this.scene.addBullet(this.x, this.y, angle, this.targetting);
            this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
        }
        
    }
}