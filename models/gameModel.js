const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const gameSchema = new Schema({
  email : {
    type : String,
    required : true,
  },
  //map array object, used for determining the location of defensive turrets in the game scene
  map : {
    type : Array,
    required : true,
    default: [
        [ 0,0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0,0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0],
        [ 0, 0, 0, 0, 0, 0, 0,0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0,0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0,0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0,0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0,0, 0, 0]
       ]
  },
  //array where LinkedIn links that are submitted as evidence of completion can be stored for later duplication checking
  //- as of yet there is no true verification of the contents of the linkedin list, this would likely require a manual step to achieve
  links: {
    type: Array,
    required: false
  },
  no_wins : {
    type: Number,
    required: true,
    default: 0
  },
  no_losses : {
    type: Number,
    required: true,
    default: 0
  },
  high_score : {
      type: Number,
      required: true,
      default: 0
  },
  //stores a record of which in game units the given user has unlocked by submitting badges
  units : {
    type : Array,
    required : true,
    default: 
        [ 0,0, 0, 0, 0, 0, 0, 0, 0],
  }
});

const GameModel = mongoose.model('gameData', gameSchema);
module.exports = GameModel;