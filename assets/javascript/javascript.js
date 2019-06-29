var apiKey = "gwT2VMfNzRtihqZZVNGafuh0VS0DvnLB";
var query = "";
var queryURL = "";
var limit = 10;

var topics = ["Friends", "Frasier", "Rick and Morty", "Dexter", "Firefly", "Family Guy", "The Simpsons", "Archer", "Marvelous Mrs. Maisel", "Orange is the New Black"];

renderElements();

$(document).on("click", ".topicBtn", function ()
{
    query = $(this).text();
    queryURL = "http://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + query + "&limit=" + limit + "&rating=pg";
    
    console.log(query);
    console.log(queryURL);

    $(".results").html("");

//http://api.giphy.com/v1/gifs/search?api_key=gwT2VMfNzRtihqZZVNGafuh0VS0DvnLB&q=Dexter&limit=10&rating=pg&callback=jQuery1111046778063012826965_1561841544009&_=1561841544010

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: 'jsonp',
        contentType: 'application/json'
      }).then(function(response) 
      {
        console.log(response);
        for (var i=0; i<limit; i++)
        {
            var div = $("<figure>");
            div.addClass("m-2");
            div.addClass("figure");

            var img = $("<img>");
            img.attr("src", response.data[i].images.fixed_height_still.url);
            img.attr("data-still", response.data[i].images.fixed_height_still.url);
            img.attr("data-animate", response.data[i].images.fixed_height.url);
            img.attr("data-state", "still");
            img.addClass("gif");
            div.append(img);

            var caption = $("<figcaption>");
            caption.addClass("font-weight-bold");
            caption.addClass("text-dark");
            caption.addClass("h4");
            caption.text("Rating: " + response.data[i].rating.toUpperCase());
            div.append(caption);

            $(".results").append(div);
        }
      });
});

function renderElements()
{
  $(".topicDiv").html("");
  for (var i=0; i<topics.length; i++)
  {
    $(".topicDiv").append($("<button>").addClass("m-2 btn btn-info topicBtn").html(topics[i]));
  }
}

$(document).on("click", ".gif", function(event)
{
  var $clickedElement = $(event.target);
  var state = $clickedElement.attr("data-state");
  console.log(state);

  if (state == "still")
  {
      $clickedElement.attr("src", $clickedElement.attr("data-animate"));
      $clickedElement.attr("data-state", "animate");
  }
  else if (state == "animate")
  {
    $clickedElement.attr("src", $clickedElement.attr("data-still"));
    $clickedElement.attr("data-state", "still");
  }
});

$("#add-topic").on("click", function(event) 
{
    event.preventDefault();
    var topic = $("#search-input").val().trim();
    topics.push(topic);
    renderElements();
    $("#search-input").val("");
});
