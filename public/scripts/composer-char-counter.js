const characterCounter = function (){
  $("#tweet-text").on("input", function() {
    const max = 140;
    const length = $(this).val().length;
    const numOfCharsLeft = max - length;
    if (length > max) {
      $("#counter").text(numOfCharsLeft);
      $("#counter").css("color", "red")
    } else {
      $("#counter").css("color", "#545149")
      $("#counter").text(`${numOfCharsLeft} characters left`)
    }
  });
}

$(document).ready(function () {
  characterCounter();
});