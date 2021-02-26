/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  
  // takes HTML formated tweet and puts it inside of container within page
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet)
      $("#tweets-container").prepend($tweet);
    }
  }
  
  const createTweetElement = function(tweet) {
    // prevent XSS attacks via use of escape below
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    // converts text from tweet to HTML template
    let $tweet = $(
      `<article class="other-tweets">
      <header>
        <span class="person-icon">
          <img class="icon" src=${tweet.user.avatars}>
          ${tweet.user.name}
        </span>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <div class="txt">${escape(tweet.content.text)}</div>
      <footer>
        <span class="timestamp">${dateOfTweet(tweet.created_at)}</span>
        <div>
          <i class="fas fa-flag fa-sm"></i>
          <i class="fas fa-retweet fa-sm"></i>
          <i class="fas fa-heart fa-sm"></i>
        </div>
      </footer>
    </article>`
    )
    return $tweet;
  };
  

  // this function uses AJAX to post tweets to database
  // listen to form submission with JQuery's submit handler
  $("#new-tweet").on("submit", function(event) {
    // prevent the default form submission process
    event.preventDefault();
    // serialize() turns form data into query string because our server is configured to receive that data format
    const serializeData = $(this).serialize();

    // converts message to how it was input before we can apply conditions
      const textLength = $("#tweet-text").val().length;
      if (!textLength) {
        // inserts custom message in HTML
        $("#error-msg").text("Your tweet must contain a message");
        // makes error message appear on page
        $("div#error").slideDown();
        return;
      } 
      if (textLength > 140) {
        $("#error-msg").text("Your tweet is longer than 140 characters");
        $("div#error").slideDown();
        return;
      }
      $.ajax({ 
        url:"/tweets", 
        data: serializeData, 
        method: "POST",
      }).then(() => loadTweets()) 
        //clear the message from the box after submit box is hit
        $("#new-tweet").trigger("reset");
        // resets counter to 140
        $("#counter").text('140'); 
        // hides error message when problem is corrected, after submit button hit
        $("div#error").slideUp(); 
        // activates cursor in text box automatically
        $("#tweet-text").focus(); 
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


const dateOfTweet = function(timestamp) {
  const howLongAgoMilliseconds = Date.now() - timestamp;
  const millsecondsPerMin = 1000*60;
  const millsecondsPerHour = 1000*60*60;
  const millsecondsPerDay = 1000*60*60*24;
  if (howLongAgoMilliseconds > millsecondsPerDay) {
    const howLongAgoDays = Math.ceil(howLongAgoMilliseconds / millsecondsPerDay);
    return `${howLongAgoDays} days ago`;
  }
  if (howLongAgoMilliseconds > millsecondsPerHour) {
    const howLongAgoHours = Math.ceil(howLongAgoMilliseconds / millsecondsPerHour);
    return `${howLongAgoHours} hours ago`;
  }
  if (howLongAgoMilliseconds > millsecondsPerMin) {
    const howLongAgoMins = Math.ceil(howLongAgoMilliseconds / millsecondsPerMin);
    return `${howLongAgoMins} minutes ago`
  }
  return "just now"
}