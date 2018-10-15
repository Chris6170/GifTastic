

var heroes = ["Bruce Lee", "Jackie Chan", "Jet Li", "Donnie Yen", "Steven Seagal", "Jean-Claude Van Damme", "Chuck Norris", "Tony Jaa", "Iko Uwais", "Robin Shou"];
var gifResults = $("#gifResults");
function renderButtons() {
  $("#initialBttn").empty();

  for (var i = 0; i < heroes.length; i++) {
    var a = $("<button>");
    a.addClass("movie-btn");
    a.attr("data-name", heroes[i]);
    a.addClass("btn btn-success");
    a.text(heroes[i]);
    $("#initialBttn").append(a);
  }
}

$("#add-movie").on("click", function (event) {
  event.preventDefault();
  var hero = $("#hero-input").val().trim();
  heroes.push(hero);
  renderButtons();
});
renderButtons();

function displayMovieInfo() {
  var hero = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=HUOuIG8fZ9zsGq0poxvJTLT0eujOgUz1&limit=12";


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    gifResults.empty();



    var imgArr = response.data.length;


    for (i = 0; i < imgArr; i++) {

      var loop = response.data[i].images.original.url;
      var rating = response.data[i].rating;
      var imgDiv = $("<div>");
      var gif = $("<img>").attr('src', loop);
      var giftext = $("<p>").text(rating);
    
      // imgDiv.append(gif);
      // imgDiv.append(giftext);
      gifResults.append(gif);


      console.log(rating);



    }




  });
}

$(document).on("click", ".movie-btn", displayMovieInfo);