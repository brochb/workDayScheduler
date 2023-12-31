$(document).ready(function () {

  function updateCurrentDate() {
    const currentDate = dayjs().format("MMMM DD, dddd");
    $("#currentDate").text(currentDate);
  }

  updateCurrentDate();
  setInterval(updateCurrentDate, 1000);


  function createSchedule() {
    var container = document.getElementById("schedule-container");

    for (var hour = 9; hour <= 17; hour++) {
      var div = document.createElement("div");
      div.id = "hour-" + hour;
      div.className = "row time-block";

      var hourDiv = document.createElement("div");
      hourDiv.className = "col-2 col-md-1 hour text-center py-3";
      hourDiv.textContent = (hour > 12 ? hour - 12 : hour) +
        ((hour >= 12 && hour < 24) ? "PM" : "AM");
      div.appendChild(hourDiv);

      var textarea = document.createElement("textarea");
      textarea.className = "col-8 col-md-10 toDo";
      textarea.rows = 3;
      textarea.style.backgroundColor = getBackgroundColor(hour);
      textarea.setAttribute("data-hour", hour);
      var storedValue = localStorage.getItem("hour-" + hour);
      if (storedValue) {
        textarea.value = storedValue
      }
      div.appendChild(textarea);


      var button = document.createElement("button");
      button.className = "btn saveBtn col-2 col-md-1";
      button.setAttribute("aria-label", "save");
      button.setAttribute("data-hour", hour)

      var icon = document.createElement("i");
      icon.className = "fas fa-save";
      icon.setAttribute("aria-hidden", "true");

      button.appendChild(icon);
      div.appendChild(button);
      container.appendChild(div);

      container.addEventListener("click", function (event) {
        if (event.target.classList.contains("saveBtn")) {
          var hour = event.target.getAttribute("data-hour");
          var textarea = document.querySelector("textarea[data-hour='" + hour + "']");
          var userInput = textarea.value.trim();

          if (userInput !== "") {
            localStorage.setItem("hour-" + hour, userInput);
            console.log("User input saved for hour", hour, ":", userInput);
          } else {
            localStorage.removeItem("hour-" + hour, userInput)
            console.log("If you previously had a Todo item here, it has been cleared, otherwise please input an item!");
          }
        }
      });
    }
  }

  function getBackgroundColor(hour) {
    var currentHour = new Date().getHours();
    if (hour < currentHour) {
      return "beige";
    } else if (hour === currentHour) {
      return "red";
    } else {
      return "green";
    }
  }

  createSchedule();

});