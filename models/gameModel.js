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
  datasci : {
      type: Number,
      required: true,
      default: 0
  },
  block : {
    type: Number,
    required: true,
    default: 0
  },
  health : {
    type: Number,
    required: true,
    default: 0
  },
  AI : {
    type: Number,
    required: true,
    default: 0
  },
  capstone : {
    type: Number,
    required: true,
    default: 0
  },
  auto : {
    type: Number,
    required: true,
    default: 0
  },
  cloud : {
    type: Number,
    required: true,
    default: 0
  },
  security : {
    type: Number,
    required: true,
    default: 0
  },
  Z : {
    type: Number,
    required: true,
    default: 0
  },
  law : {
    type: Number,
    required: true,
    default: 0
  },
  power : {
    type: Number,
    required: true,
    default: 0
  },
  power : {
    type: Number,
    required: true,
    default: 0
  },
  red : {
    type: Number,
    required: true,
    default: 0
  },
  quantum : {
    type: Number,
    required: true,
    default: 0
  }
});

const GameModel = mongoose.model('gameData', gameSchema);
module.exports = GameModel;