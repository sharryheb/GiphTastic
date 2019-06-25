var apiKey = "gwT2VMfNzRtihqZZVNGafuh0VS0DvnLB";
var query = "";
var queryURL = "";

var topics = ["Friends", "Frasier", "Handmaid's Tale", "Dexter", "Intervention", "Family Guy", "The Simpsons", "Archer", "Transparent", "Orange is the New Black"];


for (var i=0; i<topics.length; i++)
{
    $(".topicBtn").append($("<button>").addClass("m-2 btn btn-info").html(topics[i]));
}

$(".topicBtn").click(function ()
{
    query = $(event.target).text().replace(" ", "+");
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + query + "&limit=10";
    $(".results").html("");
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) 
      {
          console.log(response);
          for (var i=0; i<response.data.length; i++)
          {
              var temp = $("<a>").attr("href", response.data[i].images.downsized_medium.url);
              temp.html($("<img>").attr("src", response.data[i].images.downsized_still.url));
              
            $(".results").append(temp);
          }
      });
});