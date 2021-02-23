$(document).ready(function() {
  
  //counts all items entered into form, including the number of backspace key presses needed to delete everything in form
  $("#tweet-text").on("input", function() {
    const max = 140;
    let length = $(this).val().length;
    let numOfCharsLeft = max - length;
    if (length >= max) {
      $("#counter").text(numOfCharsLeft);
      $("#counter").css("color", "red")
    } else {
      $("#counter").css("color", "#545149")
      $("#counter").text(`${numOfCharsLeft} characters left`)
    }
    console.log(this);
  });

  
  
});

// notifies you when you change where on page you're focused
  // $("#tweet-text").on("change", function() {
  //   console.log("change");
  // });

  //when you leave the input field
  // $("#tweet-text").on("blur", function() {
  //   console.log("blur");
  // });

  //will count as long as you have a key pressed
  // $("#tweet-text").on("keydown", function() {
  //   console.log("keydown");
  // });

  //will count as long as you have a key pressed
  // $("#tweet-text").on("keyup", function() {
  //   console.log("keyup");
  // });

  // will count the number of characters typed in, but not deleted from form
  // $("#tweet-text").on("keypress", function() {
  //   console.log("keypress");
  // });
