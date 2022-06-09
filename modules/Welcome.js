const timeText = document.querySelector(".localTime");
const dayText = document.querySelector(".dayToday");
const dateText = document.querySelector(".date");
const weekDays = [
  "Söndag",
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
];

function updateClock() {
  const dateInfo = new Date();
  timeText.innerHTML = "";
  dayText.innerHTML = "";
  dateText.innerHTML = "";

  //LocalTime
  timeText.append(
    `${dateInfo.getHours()}:${String(dateInfo.getMinutes()).padStart(2, 0)}`
  );

  //Day information
  dayText.append(weekDays[dateInfo.getDay()]);

  //Date information
  dateText.append(
    `${dateInfo.getFullYear()}-${dateInfo.getMonth() + 1}-${dateInfo.getDate()}`
  );
}
updateClock();

setInterval(updateClock, 1000);
