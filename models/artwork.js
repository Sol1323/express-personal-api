var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArtworkSchema = new Schema({
  title: String,
  medium: String,
  year: String,
  image: String,
  link: String
});

var Artwork = mongoose.model('Artwork', ArtworksSchema);

module.exports = Artwork;
