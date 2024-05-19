export default class {
  btnOpen = document.querySelector('.nav__open');
  btnClose = document.querySelector('.nav__close');
  menu = document.querySelector('.nav__menu');
  overlay = document.querySelector('.overlay');
  searchBar = document.querySelector('.header__search-bar');

  constructor() {
    this.btnOpen.addEventListener('click', this.open.bind(this));
    this.btnClose.addEventListener('click', this.close.bind(this));
    // prettier-ignore
    this.searchBar.addEventListener('keypress', this.showSuggestions.bind(this))
  }

  open() {
    this.menu.classList.add('show-menu');
    this.overlay.classList.remove('hidden');
  }

  close() {
    this.menu.classList.remove('show-menu');
    this.overlay.classList.add('hidden');
  }

  async showSuggestions(e) {
    try {
      console.log(e);
      const response = await fetch('./data/json/cartoon.json');
      console.log(response);
      const data = await response.json();
      console.log(data);
      const suggestions = data.filter(data =>
        data.title.includes(this.searchBar.value)
      );
      console.log(suggestions);
    } catch (err) {}
  }
}
