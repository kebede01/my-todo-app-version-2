export class Todos {
  constructor(data, cardSelector, handleCompletion, handleDeletion) {
    this._id = data.id;
    this._name = data.name;
    this._completed = data.completed;
    this._date = data.date;
    this._cardTemplate = document.querySelector(`#${cardSelector}`);
    this._handleCompletion = handleCompletion;
    this._handleDeletion = handleDeletion;
  }

  _setEventListeners() {
    this._todoCompleted.addEventListener("click", () => {
      this._completed = !this._completed;
      this._handleCompletion(this._completed);
    });

    this._delBut.addEventListener("click", () => {
      this._element.remove();
      this._handleDeletion(this._completed);
    });
  }
  _generateCheckedBoxEl() {
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
    this._todoCompleted.id = `todo-${this._id}`;

    this._todoCompleted.checked = this._completed;
  }

  gateView() {
    this._element = this._cardTemplate.content
      .querySelector(".todo")
      .cloneNode(true);
    this._todoCompleted = this._element.querySelector(".todo__completed");
    this._todoLabel = this._element.querySelector(".todo__label");
    this._delBut = this._element.querySelector(".todo__delete-btn");
    const dateTaken = this._element.querySelector(".todo__date");
    this._element.querySelector(".todo__name").textContent = this._name;
    const date = new Date(this._date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const formatted = `Due: ${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;

    dateTaken.textContent = formatted;

    this._generateCheckedBoxEl();
    this._setEventListeners();
    return this._element;
  }
}
