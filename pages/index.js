import { initialTodos, validationConfig} from "../utils/constants.js";
// import { enableValidation } from "../scripts/validate.js";
import { Todos } from "../components/Todo.js";
import  FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";

import TodoCounter from "../components/TodoCounter.js"
const todoCounterInstanceObject = new TodoCounter(
  initialTodos,
  ".counter__text"
);

function handleCompletion(completed) {
  todoCounterInstanceObject.updateCompleted(completed);
}

function handleTotal(increment) {
  todoCounterInstanceObject.updateTotal(increment);
}

function handleDeletion(completed) {
  handleTotal(false);
  if (completed) {
    todoCounterInstanceObject.updateCompleted(false);
  }
}

const addTodoPopupEl = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleSubmit: (values) => { 
   const id = uuidv4();
    values["id"] = id;
    console.log(values);
    renderTodo(values, "todo-template", handleCompletion, handleDeletion);
    handleTotal(true);
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
   const myTodo = new Todos(item, "todo-template", handleCompletion, handleDeletion );
    const elemen = myTodo.gateView();
    section.addItem(elemen);
   }
}, ".todos__list");

section.renderItems();

function todoCreator(data, selector, handleCompletion, handleDeletion) {
  const todoInstance = new Todos(
    data,
    selector,
    handleCompletion,
    handleDeletion
   );
  const todoElement = todoInstance.gateView();
  return todoElement;
}

// todo card element creator
const renderTodo = (data, selector, handleCompletion, handleDeletion) => {
  const todo = todoCreator(data, selector, handleCompletion, handleDeletion);
  section.addItem(todo);
};







const formValidate = new FormValidator(validationConfig);
formValidate.enableValidation();



