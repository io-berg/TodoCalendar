const calender = document.getElementById("calender");

let selectedDate;
let month = new Date();
const months = [
  "Januari",
  "Februari",
  "Marsh",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "Augusti",
  "September",
  "October",
  "November",
  "December",
];

function renderCalender() {
  calender.innerHTML = "";
  const startDate = new Date(month.getFullYear(), month.getMonth(), 1);

  // If the first date of the month is not a monday, make the startdate the previous monday.
  if (startDate.getDay() != 1) {
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
  }

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const date = new Date(startDate.getTime());
      date.setDate(startDate.getDate() + i * 7 + j);

      const day = document.createElement("div");
      day.classList.add("grid-item");

      if (date.getMonth() == month.getMonth()) {
        day.classList.add("current-month-item");
      }

      day.addEventListener("click", (e) => selectDate(e));

      if (
        date.getDate() === selectedDate?.getDate() &&
        date.getMonth() === selectedDate?.getMonth()
      ) {
        day.classList.add("highlight-grid-item");
      }

      const dayNr = document.createElement("p");
      dayNr.innerText = date.getDate();
      dayNr.classList.add("day-nr");
      day.appendChild(dayNr);

      day.dataset.id = date.getTime();
      calender.appendChild(day);
    }
  }
}

function selectDate(e) {
  const targetDate = new Date(Number(e.target.dataset.id));

  if (
    targetDate.getDate() === selectedDate?.getDate() &&
    targetDate.getMonth() === selectedDate?.getMonth()
  )
    selectedDate = null;
  else {
    selectedDate = targetDate;
  }

  renderCalender();
}

function getSelectedDate() {
  return selectedDate;
}

export { renderCalender, getSelectedDate };
