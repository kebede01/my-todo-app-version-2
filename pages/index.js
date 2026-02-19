import { initialTodos, validationConfig} from "../utils/constants.js";
// import { enableValidation } from "../scripts/validate.js";
import { Todos } from "../components/Todo.js";
import  FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import Section from "../components/section.js";
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");




const section = new Section({
  data: initialTodos,
  renderer: (item) => {
   const myTodo = new Todos(item, "todo-template");
    const elemen = myTodo.gateView();
    section.addItem(elemen);
   }
}, ".todos__list");

section.renderItems();

const openModal = (modal) => {
  modal.classList.add("popup_visible");
 const form = modal.querySelector(".popup__form");
  if (form) form.reset();
  formValidate.resetValidation();


};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};



addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});



addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;
  const id = uuidv4();
  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { id, name, date };

  renderTodo(values);
  closeModal(addTodoPopup);
});

const formValidate = new FormValidator(validationConfig);
formValidate.enableValidation();



