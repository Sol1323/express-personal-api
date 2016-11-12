var mongoose = require("mongoose");
 mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/artist-app" );
// module.exports.Campsite = require("./campsite.js.example");

module.exports.Artist = require("./artist.js");
module.exports.Artwork = require("./artwork.js");
