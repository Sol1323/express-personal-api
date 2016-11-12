console.log("Sanity Check: JS is working!");
var template;
var $artistsList;
var allArtists = [];

$(document).ready(function(){

  $artistsList = $('#artistTarget');

  // compile handlebars template
  var source = $('#artists-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/artists',
    success: handleSuccess,
    error: handleError
  });

  $('#newArtistForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new artist serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/artists',
      data: $(this).serializeArray(),
      success: newArtistSuccess,
      error: newArtistError
    });
  });

  $artistsList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/artists/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/artists/'+$(this).attr('data-id'),
      success: deleteArtistSuccess,
      error: deleteArtistError
    });
  });

//WATCH HERE THE CLOSING
//   });
//
// });

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $artistsList.empty();

  // pass `allBooks` into the template function
  var artistsHtml = template({ artists: allArtists});

  // append html to the view
  $artistsList.append(artistsHtml);
}

function handleSuccess(json) {
  allArtists = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#artistTarget').text('Failed to load artists, is the server working?');
}

function newBookSuccess(json) {
  $('#newArtistForm input').val('');
  allArtists.push(json);
  render();
}

function newArtistError() {
  console.log('newartist error!');
}

function deleteArtistSuccess(json) {
  var artist = json;
  console.log(json);
  var artistId = artist._id;
  console.log('delete artist', artistId);
  // find the artist with the correct ID and remove it from our allBooks array
  for(var index = 0; index < allartists.length; index++) {
    if(allArtists[index]._id === artistId) {
      allArtists.splice(index, 1);
      break;  // we found our artist - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteArtistError() {
  console.log('deleteartist error!');
}

// function newCharacterSuccess(json) {
//   var book = json;
//   var bookId = book._id;
//   // find the book with the correct ID and update it
//   for(var index = 0; index < allBooks.length; index++) {
//     if(allBooks[index]._id === bookId) {
//       allBooks[index] = book;
//       break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
//     }
  // }
  render();
}
//
// function newCharacterError() {
//   console.log('adding new character error!');
// }
