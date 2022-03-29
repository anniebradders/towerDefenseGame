import Phaser from 'phaser';

export default class Turret extends Phaser.GameObjects.Image{
    constructor(scene, x, y, map){
        super(scene, x, y, 'defense3');

        this.scene = scene;
        this.map = map;
        this.nextTic = 0;

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

    place(i, j){
        this.y = i * 64 + 32;
        this.x = j * 64 + 32;
        this.map[i][j] = 1;
    }

    fire(){
        var attacker = this.scene.getAttacker(this.x, this.y, 200);
        if (attacker) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, attacker.x, attacker.y);
            this.scene.addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
        }
        
    }
}