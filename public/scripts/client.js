const createTweetElement = function(tweet) {
  // Prevent XSS attacks via use of escape in HTML template below
  const escape =  function(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  
  // Converts text from tweet to HTML template
  const $tweet = $(
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
  
// Takes HTML formated tweet and puts it inside of container within page
const renderTweets = function(tweets) {
  $("#tweets-container").empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet)
    $("#tweets-container").prepend($tweet);
  }
}

// show recent tweets on page
const loadTweets = function() {
  $.ajax({
    url: "/tweets", 
    method: 'GET',
    success: "this get request was a success"
  }).then((tweets) => renderTweets(tweets))
}

// converts the datestamp to length of time ago, in various increments
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



$(document).ready(function () {
  
  // Listen to form submission with JQuery's submit handler
  $("#new-tweet").on("submit", function(event) {
    // Prevent the default form submission process
    event.preventDefault();
    // Serialize() turns form data into query string because our server is configured to receive that data format
    const serializeData = $(this).serialize();
    
    // Control post result depending on user input
    // First convert message to original format input 
    const textLength = $("#tweet-text").val().length;
    if (!textLength) {
      // Inserts custom message in HTML & show message on page
      $("#error-msg").text("Your tweet must contain a message");
      $("div#error").slideDown();
      return;
    } 
    if (textLength > 140) {
      $("#error-msg").text("Your tweet is longer than 140 characters");
      $("div#error").slideDown();
      return;
    }
    // Use AJAX to post tweets to database & immediately render on page without refreshing
    $.ajax({ 
      url:"/tweets", 
      data: serializeData, 
      method: "POST",
    }).then(() => loadTweets()) 
      //Reset counter to 140, hide error messages & activate cursor in cleared form field after successful posts
      $("#new-tweet").trigger("reset");
      $("#counter").text('140'); 
      $("div#error").slideUp(); 
      $("#tweet-text").focus(); 
  });

  loadTweets();

});
