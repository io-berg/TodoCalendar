import {
  getSelectedDate,
  renderCalender,
  renderCalenderMonth,
} from "./modules/calender.js";
import { renderTodoList, loadTodosFromLocalStorage } from "./modules/todo.js";
import { renderClock } from "./modules/Clock.js";

loadTodosFromLocalStorage();
renderClock();
renderCalenderMonth();
renderCalender();
renderTodoList();
