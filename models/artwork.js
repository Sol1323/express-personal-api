var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArtworkSchema = new Schema({
  title: String
});

var Artwork = mongoose.model('Artwork', ArtworkSchema);

module.exports = Artwork;

// Other properties for ArtworkSchema
// medium: String,
// year: String,
// image: String,
// link: String
