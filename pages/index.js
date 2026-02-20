import { initialTodos, validationConfig} from "../utils/constants.js";
// import { enableValidation } from "../scripts/validate.js";
import { Todos } from "../components/Todo.js";
import  FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";




const addTodoPopupEl = new PopupWithForm({
  popupSelector: ".popup",
  handleSubmit: (values) => { 
   const id = uuidv4();
 values["id"] = id;
renderTodo(values, "todo-template");
    formValidate.resetValidation(); 
  }
});
// closing popups with "Escape" key included;
addTodoPopupEl.setEventListeners();

 const addTodoButton = document.querySelector(".button_action_add");
 addTodoButton.addEventListener("click", () => {
      addTodoPopupEl.open();
 });
    
const section = new Section({
  data: initialTodos,
  renderer: (item) => {
   const myTodo = new Todos(item, "todo-template");
    const elemen = myTodo.gateView();
    section.addItem(elemen);
   }
}, ".todos__list");

section.renderItems();

function todoCreator(data, selector) {
  const todoInstance = new Todos(
    data,
    selector,
   );
  const todoElement = todoInstance.gateView();
  return todoElement;
}

// todo card element creator
const renderTodo = (data, selector) => {
  const todo = todoCreator(data, selector);
  section.addItem(todo);
};







const formValidate = new FormValidator(validationConfig);
formValidate.enableValidation();



