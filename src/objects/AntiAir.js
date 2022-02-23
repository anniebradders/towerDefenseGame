import Phaser from 'phaser';

export default class Turret extends Phaser.GameObjects.Image{
    constructor(scene, x, y, map){
        super(scene, x, y, 'defense1');

        this.scene = scene;
        this.map = map;

        //add AntiAir to game
        this.scene.add.existing(this);
        this.setScale(1.2);
    }

    place(i, j){
        this.y = i * 64 + 32;
        this.x = j * 64 + 32;
        this.map[i][j] = 1;
    }
}