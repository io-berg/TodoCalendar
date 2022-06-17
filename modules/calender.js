import { getTodos, renderTodoList } from "./todo.js";
import { getDateFact } from "./httpClient.js";

const calender = document.getElementById("calender");
const monthText = document.getElementById("month-text");
const nextMonthBtn = document.getElementById("next-month");
nextMonthBtn.addEventListener("click", () => {
  month.setMonth(month.getMonth() + 1);
  renderCalenderMonth();
  renderCalender();
});

const prevMonthBtn = document.getElementById("prev-month");
prevMonthBtn.addEventListener("click", () => {
  month.setMonth(month.getMonth() - 1);
  renderCalenderMonth();
  renderCalender();
});

function renderCalenderMonth() {
  monthText.innerText = months[month.getMonth()] + " " + month.getFullYear();
}

let selectedDate = null;
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

      const day = buildDayCell(date);
      addTodos(day, date);

      calender.appendChild(day);
    }
  }
}

function buildDayCell(date) {
  const day = document.createElement("div");
  day.classList.add("grid-item");

  if (date.getMonth() == month.getMonth()) {
    day.classList.add("current-month-item");
  }

  day.addEventListener("click", (e) => selectDate(e));

  if (date.getDay() == 0) {
    day.classList.add("weekend-grid-item");
  }

  if (
    date.getDate() === selectedDate?.getDate() &&
    date.getMonth() === selectedDate?.getMonth()
  ) {
    day.classList.add("highlight-grid-item");
  }

  const dayNr = document.createElement("p");
  dayNr.innerText = date.getDate();
  dayNr.classList.add("day-nr");
  dayNr.style.pointerEvents = "none";
  day.appendChild(dayNr);

  day.dataset.id = date.getTime();

  return day;
}

function addTodos(day, date) {
  const todos = getTodos();
  let todosToday = todos.filter((todo) => isSameDate(todo.date, date));

  if (!todosToday.length) return;

  const todoElem = document.createElement("p");
  todoElem.innerText =
    todosToday.length > 0
      ? todosToday.length > 1
        ? todosToday.length + " Todos"
        : todosToday.length + " Todo"
      : "";
  todoElem.classList.add("todo-count");
  todoElem.style.pointerEvents = "none";

  day.appendChild(todoElem);
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

  if (selectedDate) {
    setDateFact(selectedDate);
  } else {
    setDateFact(new Date());
  }
  renderTodoList(selectedDate);
  renderCalender();
}

function setDateFact(date) {
  const fact = getDateFact(date.getMonth() + 1, date.getDate());
  fact
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("date-fact").innerText = data;
    });
}

function isSameDate(date1, date2) {
  return (
    date1.getDate() == date2.getDate() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  );
}

function getSelectedDate() {
  return selectedDate;
}

export { renderCalender, getSelectedDate, isSameDate, renderCalenderMonth, setDateFact };
