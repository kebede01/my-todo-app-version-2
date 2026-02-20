import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super({ popupSelector });

    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {
    const values = {};
    this._inputlists.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._handleSubmit(values);
      super.close();
    });
  }
}
export default PopupWithForm;
