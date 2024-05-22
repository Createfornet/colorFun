// this class is for header, navbar & search behavior
export default class {
  btnOpenMenu = document.querySelector('.nav__open');
  btnCloseMenu = document.querySelector('.nav__close');
  menu = document.querySelector('.nav__menu');
  overlay = document.querySelector('.overlay');
  inputSearch = document.querySelector('.header__search-input');
  containerSearchSuggestion = document.querySelector('.header__resaults');

  constructor() {
    this._preset();
    this.btnOpenMenu.addEventListener('click', this._openMenu.bind(this));
    this.btnCloseMenu.addEventListener('click', this._closeMenu.bind(this));
    this.inputSearch.addEventListener(
      'keydown',
      this._showSearchSuggestions.bind(this)
    );
  }

  _preset() {
    this._closeMenu();
  }

  _openMenu() {
    this.menu.classList.add('show-menu');
    this.overlay.classList.remove('overlay-hidden');
    this.overlay.classList.add('overlay-show');
  }

  _closeMenu() {
    this.menu.classList.remove('show-menu');
    this.overlay.classList.add('overlay-hidden');
    this.overlay.classList.remove('overlay-show');
  }

  async _getSearchSuggestions(e) {
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

  async _showSearchSuggestions(e) {
    this.containerSearchSuggestion.innerHTML = null;

    const suggestions = await this._getSearchSuggestions();
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

      this.containerSearchSuggestion.insertAdjacentHTML(
        'beforeend',
        suggestionElement
      );
    });
  }
}
