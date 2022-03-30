const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const testSchema = new Schema({
  colour : {
    type : String,
    required : true,
    unique : true
  },
   shape : {
    type : String,
    required : true,
    unique : true
  }
  
});
testSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
const UserModel = mongoose.model('testcolor', testSchema);
module.exports = UserModel;