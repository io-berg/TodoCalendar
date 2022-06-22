import {
  renderCalendar,
  renderCalendarMonth,
  setDateFact,
} from "./modules/calendar.js";
import { loadTodosFromLocalStorage } from "./modules/todos/todo.js";
import { renderTodoList } from "./modules/todos/renderTodoList.js";
import { getRandomUser } from "./modules/headerprofil.js";
import { renderClock } from "./modules/Clock.js";

loadTodosFromLocalStorage();
renderClock();
setDateFact(new Date());
renderCalendarMonth();
renderCalendar();
renderTodoList();
getRandomUser();
