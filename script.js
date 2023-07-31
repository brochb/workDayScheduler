// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function(){

    function updateCurrentDate() {
      const currentDate = dayjs().format("MMMM DD, dddd");
      $("#currentDate").text(currentDate);
    }
    updateCurrentDate();
    setInterval(updateCurrentDate, 1000);

    var currentHour = new Date().getHours();

    // // Loop through each time-block div
    // $(".time-block").each(function () {
    //   var blockHour = parseInt($(this).attr("id"));

    //   // Compare the block hour with the current hour
    //   if (blockHour < currentHour) {
    //     // Add the "past" class
    //     $(this).addClass("past");
    //   } else if (blockHour === currentHour) {
    //     // Add the "present" class
    //     $(this).addClass("present");
    //   } else {
    //     // Add the "future" class
    //     $(this).addClass("future");
    //   }
    // });

  function createSchedule() {
    var container = document.getElementById("schedule-container");

    for (var hour = 9; hour <= 17; hour++) {
      var div = document.createElement("div");
      div.id = "hour-" + hour;
      div.className = "row time-block";

      var hourDiv = document.createElement("div");
      hourDiv.className = "col-2 col-md-1 hour text-center py-3";
      hourDiv.textContent = hour + "AM";
      div.appendChild(hourDiv);

      var textarea = document.createElement("textarea");
      textarea.className = "col-8 col-md-10 description";
      textarea.rows = 3;
      textarea.style.backgroundColor = getBackgroundColor(hour); // Set inline style
      div.appendChild(textarea);

      var button = document.createElement("button");
      button.className = "btn saveBtn col-2 col-md-1";
      button.setAttribute("aria-label", "save");
      var icon = document.createElement("i");
      icon.className = "fas fa-save";
      icon.setAttribute("aria-hidden", "true");
      button.appendChild(icon);
      div.appendChild(button);

      container.appendChild(div);
    }
  }

  function getBackgroundColor(hour) {
    // Determine the appropriate background color based on the hour
    var currentHour = new Date().getHours();
    if (hour < currentHour) {
      return "red"; // Past hours
    } else if (hour === currentHour) {
      return ""; // Current hour
    } else {
      return "green"; // Future hours
    }
  }

  // Call the function to create the schedule
  createSchedule();

});









   
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // $("#button").click(function() {
  //   var campListItems = $("input[name=campItem]").val();
  //   $("ol").append("<li>" +  campListItem + "</li>");
  // })


  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
