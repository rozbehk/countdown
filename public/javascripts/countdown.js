function timeReamining() {
  var countdownEl = document.querySelectorAll(".countdown");
  for (let i = 0; i < countdownEl.length; i++) {
    let countdownId = countdownEl[i].getAttribute("id");
    let endTime = new Date(countdownId);
    let currentTime = new Date();
    let remainTime = Math.floor(endTime - currentTime);
    let days = Math.floor(remainTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (remainTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((remainTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remainTime % (1000 * 60)) / 1000);
    if (remainTime < 0) {
      document.getElementById(countdownId).innerHTML = "Status: Released";
    } else {
      document.getElementById(countdownId).innerHTML =
        "Status: " +
        days +
        "d " +
        hours +
        "h " +
        minutes +
        "m " +
        seconds +
        "s" +
        " remaining";
    }
  }
}

function initCountdowns() {
  const countdownElements = document.querySelectorAll(".countdown");

  countdownElements.forEach((element) => {
    const dateString = element.getAttribute("data-date");

    if (
      !dateString ||
      dateString === "null" ||
      dateString === "undefined" ||
      dateString.trim() === ""
    ) {
      element.innerHTML = '<div class="no-date">Date Not Available</div>';
      element.setAttribute("data-countdown-disabled", "true");
      return;
    }

    const targetDate = new Date(dateString).getTime();

    if (isNaN(targetDate)) {
      element.innerHTML = '<div class="no-date">Date Not Available</div>';
      element.setAttribute("data-countdown-disabled", "true");
      return;
    }

    let intervalId;

    function updateCountdown() {
      if (element.getAttribute("data-countdown-disabled") === "true") {
        if (intervalId) clearInterval(intervalId);
        return;
      }

      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        element.innerHTML = '<div class="aired">Already Aired</div>';
        element.setAttribute("data-countdown-disabled", "true");
        if (intervalId) clearInterval(intervalId);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      element.innerHTML = `
          <div class="countdown-display">
            <div class="countdown-item">
              <span class="countdown-number">${days}</span>
              <span class="countdown-label">days</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-number">${hours}</span>
              <span class="countdown-label">hrs</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-number">${minutes}</span>
              <span class="countdown-label">min</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-number">${seconds}</span>
              <span class="countdown-label">sec</span>
            </div>
          </div>
        `;
    }

    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
  });
}

document.addEventListener("DOMContentLoaded", initCountdowns);

timeReamining();
setInterval(function () {
  timeReamining();
}, 1000);
