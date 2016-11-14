// require express and other modules
//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');


// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));


// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// // Serve static files from the `/public` directory:
// // i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));
//
// // // body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

/*
 * HTML Endpoints
 */
 app.get('/', function (req, res) {
   res.sendFile('views/index.html' , { root : __dirname});
 });
// app.get('/', function homepage(req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });

app.get('/api/profile', function profile_show(req, res){
  res.json({
    name: "Sol",
    class: "WDI 33",
    location: "San Francisco, CA",
    hobbies: ["arts", "swimming"],
    github_url: "https://www.github.com/Sol1323",
    portfolio_url: "https://www.github.com/Sol1323/Sol1323.github.io",
    favorite_iceCream: "Chocolate"
  });
});

/*
 * JSON API Endpoints
 */

 app.get('/api', function api_index(req, res) {
   // TODO: Document all your api endpoints below
   res.json({
     woopsIForgotToDocumentAllMyEndpoints: false, // CHANGE ME ;)
     message: "Welcome to my personal api! Here's what you need to know!",
     documentationUrl: "https://github.com/Sol1323/express-personal-api/README.md", // CHANGE ME
     baseUrl: "http://aqueous-bayou-93408.herokuapp.com", // CHANGE ME
     endpoints: [
       {method: "GET", path: "/api", description: "Describes all available endpoints"},
       {method: "GET", path: "/api/profile", description: "About me"}, // CHANGE ME
       {method: "GET", path: "/api/artists", description: "Get all artist"}, // CHANGE ME
       {method: "GET", path: "/api/artworks", description: "Get all artworks"} // CHANGE ME
     ]
   })
 });

// get all artists
app.get('/api/artists', function (req, res) {
  // send all artists as JSON response
  db.Artist.find().populate('artwork')
    .exec(function(err, artists) {
      if (err) { return console.log("index error: " + err); }
      res.json(artists);
  });
});

// get one artist
app.get('/api/artists/:id', function (req, res) {
  var artistId = req.params.id;
  db.Artist.findOne({_id: artistId}, function(err, data) {
    if (err) { return console.log("Error: " + err); }
    res.json(data);
  });
});

// create new artist
app.post('/api/artists', function (req, res) {
  // create new book with form data (`req.body`)
  var newArtist = new db.Artist({
    name: req.body.name,
    origin: req.body.origin,
    isAlive: req.body.isAlive,
    image: req.body.image,
    website: req.body.website
  });


  // find the artwork from req.body
  db.Artwork.findOne({title: req.body.artwork}, function(err, artwork){
    if (artwork === null) {
      var artwork = new db.Artwork({title: req.body.artwork});
      artwork.save();
      return console.log(err);
    }
    // add this author to the book
    newArtist.artwork = artwork;


    // save newArtist to database
    newArtist.save(function(err, artist){
      if (err) {
        return console.log("save error: " + err);
      }
      console.log("saved ", artist.name);
      // send back the book!
      res.json(artist);
    });
  });
});


// delete artist
app.delete('/api/artists/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('artists delete', req.params);
  var artistId = req.params.id;
  // find the index of the artist we want to remove
  db.Artist.findOneAndRemove({ _id: artistId }, function (err, deletedArtist) {
    res.json(deletedArtist);
  });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
