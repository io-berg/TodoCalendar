import {
  renderCalender,
  renderCalenderMonth,
  setDateFact,
} from "./modules/calender.js";
import { loadTodosFromLocalStorage } from "./modules/todos/todo.js";
import { renderTodoList } from "./modules/todos/renderTodoList.js";
import { getRandomUser } from "./modules/headerprofil.js";
import { renderClock } from "./modules/Clock.js";

loadTodosFromLocalStorage();
renderClock();
setDateFact(new Date());
renderCalenderMonth();
renderCalender();
renderTodoList();
getRandomUser();
