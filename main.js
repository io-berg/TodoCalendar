import {
  getSelectedDate,
  renderCalender,
  renderCalenderMonth,
} from "./modules/calender.js";
import { renderTodoList, loadTodosFromLocalStorage } from "./modules/todo.js";
import { getRandomUser } from "./modules/headerprofil.js";

loadTodosFromLocalStorage();
renderCalenderMonth();
renderCalender();
renderTodoList();

getRandomUser();

//export { getRandomUser, };
