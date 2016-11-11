var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  artworks = require('./artworks');

  // var CharacterSchema = new Schema({
  //   name: String
  // });


var ArtistSchema = new Schema({
     name: String,
     artworks: {type: Schema.Types.ObjectId, ref: 'Artworks'},
     origin: String,
     isAlive: String,
    //  characters: [CharacterSchema]
});



var Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;
