/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // pair this with monitorEvents(document.getElementById("tweet-text")) written in browser's console to view details
$(() => {
  document.addEventListener("dblclick", (event) => {
    console.log(event);
  });
})