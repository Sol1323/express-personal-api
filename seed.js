

var db = require('./models');

var artists_list = [
  {
  name: "Pipilotti Rist",
  artwork: "Ever is Over All",
  origin: "June 21, 1962, Grabs, Switzerland",
  isAlive: true,
  image: "https://s-media-cache-ak0.pinimg.com/originals/ac/ad/6f/acad6fa7136b0cfed2e1d10ddb4d6be4.jpg",
  website: "http://pipilottirist.net/"

  },
  {
    name: "Bill Viola",
    artwork: "Ascension",
    origin: "January 25, 1951, Queens, New York City, NY",
    isAlive: true,
    image: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjUluOpo6LQAhWGjFQKHd6XCc0QjRwIBw&url=http%3A%2F%2Fwww.jamescohan.com%2Fartists%2Fbill-viola&psig=AFQjCNEjKH8Dm32oJu-VQRTcZhCWpcl7fA&ust=1479007722533987",
    website: "http://www.billviola.com/"

  },
  {
    name: "Dhara Rivera",
    artwork: "Cosiendo Agua",
    origin: "1952, Vega Baja, Puerto Rico",
    isAlive: true,
    image: "http://www.artnet.com/Magazine/people/mendelsohn/Images/mendelsohn9-20-4.jpg",
    website: "http://www.dhararivera.com/"

  },
  {
    name: "Lee Bontecou",
    artwork: "Untitled",
    origin: "January 15, 1931,Providence, Rhode Island",
    isAlive: true,
    image: "http://1.bp.blogspot.com/_I5F4U2tYwmk/TF7v-35Vj0I/AAAAAAAACpo/4XNknWYpOUM/w1200-h630-p-nu/Studio+Wooster+ST+1963+Namuth.jpg",
    website: "https://www.moma.org/artists/670"

  },
  {
    name: "Ann Hamilton",
    artwork: "ghost... a border act",
    origin: " 1956, Lima, Ohio",
    isAlive: true,
    image: "http://www.annhamiltonstudio.com/images/projects/still_life/j%20simon-63-still%20life.jpg",
    website: "http://www.annhamiltonstudio.com/"

  }
];

var artworks_list = [
  {
    title: "Ever is Over All",
    medium: "Audio video installation",
    year: "1997",
    image:"https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwiOw9fboaLQAhXjlFQKHYtWD8kQjRwIBw&url=http%3A%2F%2Fwww.fact.co.uk%2Fprojects%2Fpipilotti-rist%2Fever-is-over-all.aspx&psig=AFQjCNF4VjVwXerYPuScHrAPApj8Ad7Peg&ust=1479007249385372" ,
    link: "https://www.youtube.com/watch?v=a56RPZ_cbdc"
  },
  {
    title: "Ascension",
    medium: "Audio video installation",
    year: "2000",
    image:"https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwiwlZCVpaLQAhXhjlQKHdT4DYgQjRwIBw&url=http%3A%2F%2Fpictify.saatchigallery.com%2F647111%2Fbill-viola-ascension&psig=AFQjCNGUfXojrAvERvEri5xLVh0TNxcvng&ust=1479008216955481",
    link: "https://thewadsworth.org/exhibitions/past/bill-viola-ascension/"
  },
  {
    title: "Cosiendo Agua",
    medium: "Multimedia project",
    year: "2011",
    image:"http://i.imgur.com/XHVtp.jpg" ,
    link: "https://vimeo.com/22618485"
  },
  {
    title: "Untitled",
    medium: "Welded steel, canvas, black fabric, rawhide, copper wire, and soot",
    year: "1961",
    image:"https://www.moma.org/media/W1siZiIsIjE4NDI1MSJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDEyODB4MTI4MFx1MDAzZSJdXQ.jpg?sha=2690762d65c7aad5",
    link: "https://www.moma.org/collection/works/81442?locale=en"
  },
  {
    title: "ghost... a border act",
    medium: "Video installation",
    year: "2000",
    image:"http://www.annhamiltonstudio.com/images/projects/ghost_a_border_act/ghost_table.jpg" ,
    link: "http://www.annhamiltonstudio.com/projects/ghostaborderact.html"
  }
];

db.Artwork.remove({}, function(err, artworks) {
  console.log('removed all artworks');
  db.Artwork.create(artworks_list, function(err, artworks){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all artworks');
    console.log("created", artworks.length, "artworks");


    db.Artist.remove({}, function(err, artist){
      console.log('removed all artists');
    artists_list.forEach(function (artistData) {
        var artist = new db.Artist({
          name: artistData.name,
          origin: artistData.origin,
          isAlive: artistData.isAlive,
          image: artistData.image,
          website: artistData.website
        });
        db.Artwork.findOne({title: artistData.artwork}, function (err, foundArtwork) {
          console.log('found artwork ' + foundArtwork.title + ' for artist ' + artist.name);
          if (err) {
            console.log(err);
            return;
          }
          artist.artwork = foundArtwork;
          artist.save(function(err, savedArtist){
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + savedArtist.name + 'created' + foundArtwork.title);
          });
        });
      });
    });

  });
});
