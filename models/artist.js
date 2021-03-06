var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  Artwork = require('./artwork');

  // var CharacterSchema = new Schema({
  //   name: String
  // });


var ArtistSchema = new Schema({
     name: String,
     artwork: {type: Schema.Types.ObjectId, ref: 'Artwork'},
     origin: String,
     isAlive: Boolean,
     image: String,
     website: String
    //  characters: [CharacterSchema]
});



var Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;
