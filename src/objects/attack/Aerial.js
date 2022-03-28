import Phaser from 'phaser';

export default class Robot extends Phaser.GameObjects.Image{
    constructor(scene, x, y, path){
        super(scene, x, y, 'attack1');

        this.scene = scene;
        this.path = path; 
        this.hp = 0;
        this.enemySpeed = 0;
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };


        //add enemy to scene
        this.scene.add.existing(this);
    }
    update(time, delta) {
        this.follower.t += this.enemySpeed * delta;
 
        //get x and y of the give t point
        this.path.getPoint(this.follower.t, this.follower.vec);

        //set the x and y of attacker
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        if (this.follower.t >= 1){
            this.setActive(false);
            this.setVisible(false);
            //TODO update player health
        }
{

}    }
    
    startOnPath() {
        //set health
        this.hp = 100;
        //set speed
        this.enemySpeed = 100;


        //set teh t parameter at the start of the path
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


}