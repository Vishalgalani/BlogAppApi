const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title : {
    type : String,
    unique : true
  },
  description: String,
  images : [String],
  category : {type: Schema.Types.ObjectId, ref: 'category'}
});

const  BLOG = mongoose.model('blog',  blogSchema);

module.exports =  BLOG
