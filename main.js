import {
  getSelectedDate,
  renderCalender,
  renderCalenderMonth,
  setDateFact,
} from "./modules/calender.js";
import { renderTodoList, loadTodosFromLocalStorage } from "./modules/todo.js";
import { renderClock } from "./modules/Clock.js";

loadTodosFromLocalStorage();
renderClock();
setDateFact(new Date());
renderCalenderMonth();
renderCalender();
renderTodoList();
