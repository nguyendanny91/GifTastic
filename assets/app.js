$(document).ready(function() {

      // Initial array of singers
      var singers = ["Tony Braxton","Linkin Park", "Backstreet Boys", "Britney Spears", "NSync","Foo Fighters","LFO","TLC","Spice Girls","Destiny Child"];

      var last5singers = 
        localStorage.getItem("LSArray") == null ? 
        last5singers = [] : last10singers = JSON.parse(localStorage.getItem("LSArray"));

        if ($(".listresult").length >= 1) {
          $(".listresult").remove()
        }

        $.each(last5singers, function(index, value){
            var listtag = $("<li>");
            listtag.addClass("listresult list-group-item")
            listtag.text(value);
            $(".listprevsingers").append(listtag)
        });      


      // displaySingerInfo function re-renders the HTML to display the appropriate content


      function displaySingerInfo() {
        $(".imgDiv").remove();

        var singer = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + singer + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific singer button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        console.log(response)

        var results = response.data;

        

        for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        gifDiv.addClass("imgDiv")

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height_still.url);
        personImage.attr("data-state","still")
        personImage.attr("src-still",results[i].images.fixed_height_still.url);
        personImage.attr("src-animate",results[i].images.fixed_height.url);
        personImage.addClass("imgClass");

        gifDiv.append(p);
        gifDiv.append(personImage);

        $("#singer-view").append(gifDiv);

}
    $(".imgClass").on("click", function() {
      
          var state = $(this).attr("data-state");
          var animate = $(this).attr("src-animate");
          var still = $(this).attr("src-still");

          if (state == "still") {
            $(this).attr("src",animate);
            $(this).attr("data-state","animate");
          } else
          {
            $(this).attr("src",still);
            $(this).attr("data-state","still");
          }

          });
        });






      }

      // Function for displaying singer data
      function renderButtons() {

        // Deleting the singers prior to adding new singers
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of singers
        for (var i = 0; i < singers.length; i++) {

          // Then dynamicaly generating buttons for each singer in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of singer-btn to our button
          a.addClass("singer-btn btn btn-primary");
          // Adding a data-attribute
          a.attr("data-name", singers[i]);
          // Providing the initial button text
          a.text(singers[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a singer button is clicked
      $("#add-singer").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var singer = $("#singer-input").val().trim();

        // Adding singer from the textbox to our array
        singers.push(singer);
        
        
        // Add last 5 searches
        last5singers.push(singer);

        if (last5singers.length > 5) {
          last5singers.shift()
        }

        localStorage.setItem("LSArray", JSON.stringify(last5singers));

        if ($(".listresult").length >= 1) {
          $(".listresult").remove()
        }

        $.each(last5singers, function(index, value){
            var listtag = $("<li>");
            listtag.addClass("listresult list-group-item")
            listtag.text(value);
            $(".listprevsingers").append(listtag)
        });
                
        
        
        

        // Calling renderButtons which handles the processing of our singer array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "singer-btn"
      $(document).on("click", ".singer-btn", displaySingerInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

    });