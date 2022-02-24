import Phaser from 'phaser';

export default class Robot extends Phaser.GameObjects.Image{
    constructor(scene, x, y, map){
        super(scene, x, y, 'attack2');

        this.scene = scene;
        this.map = map;

    }
}