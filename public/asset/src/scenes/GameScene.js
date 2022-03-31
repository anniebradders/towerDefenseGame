//import map from '../config/map.js';
import Turret from '../objects/Turret.js';
import AntiAir from '../objects/AntiAir.js';
import Artillery from '../objects/Artillery.js';
import FlameThrower from '../objects/FlameThrower.js';

var option = 0;

let mapData, data;

$.ajax({
    type: 'GET',
    url: '/getGame',
    data,
    success: function(data) {
        for(var i = 0; i < data.length; i++){
            console.log(data[i].email);
            if(data[i].email == getCookie('email')){
                mapData = data[i].map;
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
      this.createGroups();
    }

    createGroups(){
        this.turrets = this.add.group({ classType: Turret, runChildUpdate: true });
        this.AntiAir = this.add.group({ classType: AntiAir, runChildUpdate: true });    
        this.Artillery = this.add.group({ classType: Artillery, runChildUpdate: true });
        this.FlameThrower = this.add.group({ classType: FlameThrower, runChildUpdate: true });

        for(var i = 0; i < 8; i++){
            for(var j = 0; j < 10; j++){
                var turret = this.turrets.getFirstDead();
                if(this.map[i][j] == 1){
                    turret = new Turret(this, 32, 32, this.map);
                }
            }
        }

        this.input.on('pointerdown', this.placeTurret.bind(this));
    }

    createInventory(){
        var defenseArray;

        var x = 50;

        for(var i = 1; i < 5; i++){
            let defense = this.add.image(x+=100,550,"defense" + i);

            defense.index = i;

            defense.alpha = 0.5;

            defense.setScale(2);

            /*if(i == 1 && datasci > 0){
                defense.setInteractive();
                defense.alpha = 1;
            }else if(i == 2 && blockchain > 0){
                defense.setInteractive();
                defense.alpha = 1;
            }else if(i == 3 && health > 0){
                defense.setInteractive();
                defense.alpha = 1;
            }else if(i == 4 && AI > 0){
                defense.setInteractive();
                defense.alpha = 1;
            }*/

            defenseArray += defense.index;
        }

        this.input.on('gameobjectdown', this.InvenClick.bind(this));

        const saveButton = this.add.text(525, 550, 'Save Game', { fill: '#FFFFFF' });
        saveButton.setInteractive().on('pointerdown', () => this.saveGameData());
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
    }

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

    canPlaceTurret(i, j){
        if(i < 8 && j < 10){
            return this.map[i][j] === 0;
        }
    }

    createMap(){
        //create our map
        this.bgMap = this.make.tilemap({key: 'level1'});
        //add tileset image
        this.tiles = this.bgMap.addTilesetImage('terrainTiles_default');
        //create our background layer
        this.backgroundLayer = this.bgMap.createStaticLayer('Background', this.tiles, 0, 0);
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