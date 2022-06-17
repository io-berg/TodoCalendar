import {
  getSelectedDate,
  renderCalender,
  renderCalenderMonth,
  setDateFact,
} from "./modules/calender.js";
import { renderTodoList, loadTodosFromLocalStorage } from "./modules/todo.js";
import { getRandomUser } from "./modules/headerprofil.js";

loadTodosFromLocalStorage();
setDateFact(new Date());
renderCalenderMonth();
renderCalender();
renderTodoList();

getRandomUser();

//export { getRandomUser, };
