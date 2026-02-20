import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super({ popupSelector });
    console.log(handleSubmit);
  }
}
export default PopupWithForm;