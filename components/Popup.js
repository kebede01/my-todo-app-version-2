class Popup {
  constructor({ popupSelector }) {
    this._popupEle = document.querySelector(popupSelector);
    this._closeBtn = this._popupEle.querySelector(".popup__close");
    this._form = this._popupEle.querySelector(".popup__form");
    this._inputlists = this._form.querySelectorAll(".popup__input");
  }

  open() {
    this._popupEle.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupEle.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    this._popupEle.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popupEle || evt.target === this._closeBtn) {
        this.close();
      }
    });
  }
}
export default Popup;
