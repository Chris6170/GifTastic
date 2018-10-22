

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

    console.log(response);



    var imgArr = response.data.length;


    for (i = 0; i < imgArr; i++) {
      var loop = response.data[i].images.original.url;
      var still = response.data[i].images.original_still.url;
      var rating = response.data[i].rating;
      var favBttn = $("<button>").html("Add to favorites");
      var imgDiv = $("<div>");
      imgDiv.addClass("yes");
      var gif = $("<img>").attr('src', still);
      gif.attr('data-state', 'still');
      gif.attr('data-still', still);
      gif.attr('data-animate', loop);
      gif.addClass('gif');
      var giftext = $("<p>").html(rating);



      favBttn.addClass("btn btn-success");
      imgDiv.append(gif);
      imgDiv.append(giftext);
      imgDiv.append(favBttn);
      gifResults.prepend(imgDiv);

      console.log(rating);



    }




  });
}

$(document).on('click',".gif", function () {

  console.log("yes");

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");


  }





})

$(document).on("click", ".movie-btn", displayMovieInfo);
