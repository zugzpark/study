const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence')(mongoose)

const postSchema = new mongoose.Schema({
  id : {
    type: Number, default:0
  },
  title:{
    type: String,
  },
  content : {
    type: String,
  },
  createAt:{
    type: Date, default:Date.now
  },
  updateAt:{
    type: Date,
  }
});

postSchema.plugin(AutoIncrementFactory,{
  inc_field: 'id',

});

module.exports = mongoose.model('Post',postSchema)
