class Section {
  constructor({ data, renderer }, containerSelector) {
    this.initialArray = data;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  
  }

  addItem(element) {
   this.container.append(element);
   
  }
  renderItems() {
    this.initialArray.forEach(item => {
      this.renderer(item);
    })
   
  }
}
export default Section;