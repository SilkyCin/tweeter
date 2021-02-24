/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // pair this with monitorEvents(document.getElementById("tweet-text")) written in browser's console to view details
// $(() => {
//   document.addEventListener("dblclick", (event) => {
//     console.log(event);
//   });
// })


$(document).ready(function () {
  
  
  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet)
      $("#tweets-container").prepend($tweet);
    }
  }
  
  const createTweetElement = function(tweet) {
    // converts given tweet object to HTML template
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
      <div class="txt">${tweet.content.text}</div>
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
  
  // const $tweet = createTweetElement(tweetdata);
  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $("#tweets-container").prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  renderTweets(data);

});