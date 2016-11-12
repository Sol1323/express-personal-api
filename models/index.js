var mongoose = require("mongoose");
 mongoose.connect( process.env.MONGODB_URI || "YOUR CURRENT LOCALHOST DB CONNECTION STRING HERE" );
// module.exports.Campsite = require("./campsite.js.example");

module.exports.Artist = require("./artists.js");
module.exports.Artwork = require("./artworks.js");
