
import levelConfig from '../../config/levelConfig.js';

export default class Robot extends Phaser.GameObjects.Image{
    constructor(scene, x, y, path){
        super(scene, x, y, 'attack4');

        this.scene = scene;
        this.path = path; 
        this.hp = 0;
        this.nextTic = 0;
        this.enemySpeed = 0;
        this.flying = false;
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };


        //add enemy to scene
        this.scene.add.existing(this);
        this.setScale(1.2);
    }
    update(time, delta) {
        //move the t point along the path
        this.follower.t += this.enemySpeed * delta;
 
        //get x and y of the give t point
        this.path.getPoint(this.follower.t, this.follower.vec);

        //set the x and y of attacker    
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        //time to shoot
        if(time > this.nextTic){
            this.fire();
            this.nextTic = time + 1000 * levelConfig.robot.firerate;
        }
        else {
            this.enemySpeed = levelConfig.robot.speed;
        }

        if (this.follower.t >= 1){
            this.setActive(false);
            this.setVisible(false);
            //TODO update player health
        }
{

}    }
    
    startOnPath() {
        //TODO 
        //Adding user stats such as a userConfig file or something 
        
        //set health
        this.hp = levelConfig.robot.health;
        //set speed
        this.enemySpeed = levelConfig.robot.speed;


        //set the t parameter at the start of the path
        this.follower.t = 0;

        //get x and y of the give t point
        this.path.getPoint(this.follower.t, this.follower.vec);


        //set the x and y of attacker
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
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
        var turretInRange = this.scene.getTurret(this.x, this.y, (50 * levelConfig.robot.range) );
        if (turretInRange.length >= 1) {
            //fires at the closest attacker in range
            var angle = Phaser.Math.Angle.Between(this.x, this.y, turretInRange[0].x, turretInRange[0].y);
            this.scene.addAttackerBullet(this.x, this.y, angle, this.targetting);
            this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
        }
    }


}