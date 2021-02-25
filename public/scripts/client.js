/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//  pair this with monitorEvents(document.getElementById("tweet-text")) written in browser's console to view details
// $(() => {
//   document.addEventListener("dblclick", (event) => {
//     console.log(event);
//   });
// })


$(document).ready(function () {
  
  
  // takes HTML formated tweet and puts it inside of container within page
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet)
      $("#tweets-container").prepend($tweet);
    }
  }
  
  const createTweetElement = function(tweet) {

    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    // converts given tweet object to HTML
    let $tweet = $(`<article class="other-tweets">
      <header>
        <div>
          <span>
            <img src=${tweet.user.avatars}>
            ${tweet.user.name}
          </span>
        </div>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <div class="txt">${escape(tweet.content.text)}</div>
      <footer>
        <span class="timestamp">${tweet.created_at}</span>
        <div>
          <i class="fas fa-flag fa-sm"></i>
          <i class="fas fa-retweet fa-sm"></i>
          <i class="fas fa-heart fa-sm"></i>
        </div>
      </footer>
    </article>`)
    
    return $tweet;
  };
  
  // renderTweets();

  // this function uses AJAX to post tweets to database
  // listen to form submission with JQuery's submit handler
  $("#new-tweet").on("submit", function(event) {
    // prevent the default form submission process
    event.preventDefault();
    // serialize() turns form data into query string because our server is configured to receive that data format
    const serializeData = $(".tweet-box").serialize();
    //serialized data needs to be sent to the server via the data field of the AJAX post request
    console.log("before $.ajax: ", serializeData);
    if (serializeData === "text=") {
      alert("Please add text to tweet before submitting");
    } 
    if (serializeData.length > 145) {
      alert("Please keep your tweet under 140 characters");
    } else {
      $.ajax({ 
        url:"/tweets", 
        data: serializeData, 
        method: "POST",
        // success: function() {
        //   console.log("success");
        // }
      }).then(() => loadTweets())
      $(".tweet-box").trigger("reset");
      $("#counter").text(`140`);
      $("#tweet-text").focus();
    } 
  });

  const loadTweets = function() {
    $.ajax({
      url: "/tweets", 
      method: 'GET',
      success: "this get request was a success"
    }).then((tweets) => renderTweets(tweets))
  }
  loadTweets();
  
  

});