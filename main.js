import {
  getSelectedDate,
  renderCalender,
  renderCalenderMonth,
} from "./modules/calender.js";
import { renderTodoList, loadTodosFromLocalStorage } from "./modules/todo.js";

loadTodosFromLocalStorage();
renderCalenderMonth();
renderCalender();
renderTodoList();
