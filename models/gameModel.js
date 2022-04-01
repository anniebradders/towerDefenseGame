const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const gameSchema = new Schema({
  email : {
    type : String,
    required : true,
  },
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
  units : {
    type : Array,
    required : true,
    default: 
        [ 0,0, 0, 0, 0, 0, 0, 0, 0],
  },

  unit1 : {
    type: Number,
    required: true,
    default: 0
  },
  unit2 : {
    type: Number,
    required: true,
    default: 0
  },
  unit3 : {
    type: Number,
    required: true,
    default: 0
  },
  unit4 : {
    type: Number,
    required: true,
    default: 0
  },
  unit5 : {
    type: Number,
    required: true,
    default: 0
  },
  unit6 : {
    type: Number,
    required: true,
    default: 0
  },
  unit7 : {
    type: Number,
    required: true,
    default: 0
  },
  unit8 : {
    type: Number,
    required: true,
    default: 0
  },
  unit9 : {
    type: Number,
    required: true,
    default: 0
  }
});

const GameModel = mongoose.model('gameData', gameSchema);
module.exports = GameModel;