export default {


    default: {
        speed: 1/10000,
        health: 50,
        damage: 50,
        count: 10
    },
    total: {
        initialattackCount: 0,
        initialdefenseCount: 0,
        attackCount: 0,
        defenseCount: 0
    },
    //attack
    aerial: {
        speed: 2/10000,
        range: 3,
        firerate: 1,
        health: 200,
        damage: 15,
        count: 50
    },
    hacker: {
        speed: 1/10000,
        range: 4,
        firerate: 5,
        health: 600,
        damage: 120,
        count: 50
    },
    redhat: {
        speed: 1/10000,
        range: 1,
        firerate: 0.5,
        health: 100,
        damage: 10,
        count: 20
    },
    robot: {
        speed: 1/10000,
        range: 2,
        firerate: 0.5,
        health: 350,
        damage: 5,
        count: 50
    },
    standard: {
        speed: 1/10000,
        range: 2,
        firerate: 1,
        health: 300,
        damage: 10,
        count: 50
        
    },
    tank: {
        speed: 0.5/10000,
        range: 3,
        firerate: 2,
        health: 450,
        damage: 40,
        count: 40
    },
    //defense

    antiAir: {
        range: 6,
        firerate: 0.5,
        health: 600,
        damage: 40,
        count: 0
    },
    artillery: {
        range: 5,
        firerate: 3,
        health: 600,
        damage: 80,
        count: 0
    },
    flamethrower: {
        range: 4,
        firerate: 0.5,
        health: 400,
        damage: 40,
        count: 0
        
    },
    turret: {
        range: 5,
        firerate: 0.5,
        health: 600,
        damage: 30,
        count: 0
    }
};