import {
  getSelectedDate,
  renderCalender,
  renderCalenderMonth,
  setDateFact,
} from "./modules/calender.js";
import { renderTodoList, loadTodosFromLocalStorage } from "./modules/todo.js";

loadTodosFromLocalStorage();
setDateFact(new Date());
renderCalenderMonth();
renderCalender();
renderTodoList();
