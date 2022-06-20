import {
  renderCalender,
  renderCalenderMonth,
  setDateFact,
} from "./modules/calender.js";
import {
  renderTodoList,
  loadTodosFromLocalStorage,
} from "./modules/todos/todo.js";
import { renderClock } from "./modules/Clock.js";

loadTodosFromLocalStorage();
renderClock();
setDateFact(new Date());
renderCalenderMonth();
renderCalender();
renderTodoList();
