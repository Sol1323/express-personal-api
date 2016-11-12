var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArtworksSchema = new Schema({
  title: String,
  medium: String,
  date: String,
  image: String
});

var Artist = mongoose.model('Artworks', ArtworksSchema);

module.exports = Arworks;
