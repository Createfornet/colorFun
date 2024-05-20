export default class {
  btnOpen = document.querySelector('.nav__open');
  btnClose = document.querySelector('.nav__close');
  menu = document.querySelector('.nav__menu');
  overlay = document.querySelector('.overlay');
  inputSearch = document.querySelector('.header__search-input');
  containerResault = document.querySelector('.header__resaults');

  constructor() {
    this.btnOpen.addEventListener('click', this._open.bind(this));
    this.btnClose.addEventListener('click', this._close.bind(this));
    // prettier-ignore
    this.inputSearch.addEventListener('keydown', this._showSuggestions.bind(this))
  }

  _open() {
    this.menu.classList.add('show-menu');
    this.overlay.classList.remove('hidden');
  }

  _close() {
    this.menu.classList.remove('show-menu');
    this.overlay.classList.add('hidden');
  }

  async _getSuggestions(e) {
    try {
      const response = await fetch('./data/json/cartoon.json');
      console.log(response);
      const data = await response.json();
      console.log(data);
      const suggestions = this.inputSearch.value
        ? data.filter(data =>
            data.title.toLowerCase().includes(this.inputSearch.value)
          )
        : [];
      console.log(suggestions);
      return suggestions;
    } catch (err) {}
  }

  async _showSuggestions(e) {
    this.containerResault.innerHTML = null;

    const suggestions = await this._getSuggestions();
    console.log(suggestions);
    suggestions.forEach(suggestion => {
      console.log(this);
      const suggestionElement = `<div class="header__resault" data-id="${suggestion.id}">
          <div class="search-icon">
            <i class="ri-search-line"></i>
          </div>
          <p class="resault-text">
            ${suggestion.title}
          </p>
        </div>`;

      this.containerResault.insertAdjacentHTML('beforeend', suggestionElement);
    });
  }
}
