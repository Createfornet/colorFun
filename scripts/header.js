// this class is for header, navbar & search behavior
export default class {
  header = document.querySelector('.header');
  nav = document.querySelector('.nav');
  constructor(homePage = true) {
    this.homePage = homePage;
    this.srcCorrectio = this.homePage ? '' : '../';
    this.srcLogo = `./${this.srcCorrectio}assets/icon/colorFun.svg`;
    this._addHeaderAndNavToPage();
    this.btnOpenMenu = document.querySelector('.nav__open');
    this.btnCloseMenu = document.querySelector('.nav__close');
    this.menu = document.querySelector('.nav__menu');
    this.overlay = document.querySelector('.overlay');
    this.inputSearch = document.querySelector('.header__search-input');
    this.containerSearchSuggestion =
      document.querySelector('.header__resaults');
    this._preset();
    this.btnOpenMenu.addEventListener('click', this._openMenu.bind(this));
    this.btnCloseMenu.addEventListener('click', this._closeMenu.bind(this));
    this.inputSearch.addEventListener(
      'keydown',
      this._showSearchSuggestions.bind(this)
    );
  }

  _createHeaderEl() {
    return `<img
      loading="lazy"
      class="header__logo"
      src=${this.srcLogo}
      alt=""
    />

    <div class="header__container">
      <div class="header__tools">
        <div class="header__search">
          <div class="search-icon">
            <i class="ri-search-line"></i>
          </div>
          <input
            class="header__search-input"
            placeholder="search"
            type="text"
          />
          <div class="mic-icon">
            <i class="ri-mic-2-line"></i>
          </div>
        </div>

        <button class="nav__open center">
          <i class="ri-menu-line"></i>
        </button>
      </div>

      <div class="header__resaults">
        <!-- search resaults added by JS (header.js) -->
      </div>
    </div>`;
  }

  _createNavEl() {
    return `<div class="nav__menu">
      <ul class="nav__list">
        <li class="nav__item">
          <a href="" class="nav__link"
            >Blog <i class="ri-arrow-down-s-line"></i
          ></a>
        </li>

        <li class="nav__item">
          <a href="" class="nav__link"
            >For childrens <i class="ri-arrow-down-s-line"></i
          ></a>
        </li>

        <li class="nav__item">
          <a href="" class="nav__link"
            >For adults <i class="ri-arrow-down-s-line"></i
          ></a>
        </li>

        <li class="nav__item">
          <a href="" class="nav__link"
            >Holidays <i class="ri-arrow-down-s-line"></i
          ></a>
        </li>

        <li class="nav__item">
          <a href="" class="nav__link"
            >Interests <i class="ri-arrow-down-s-line"></i
          ></a>
        </li>

        <li class="nav__item">
          <a href="" class="nav__link"
            >Educational <i class="ri-arrow-down-s-line"></i
          ></a>
        </li>

        <li class="nav__item">
          <a href="" class="nav__link"
            >Contacts <i class="ri-arrow-down-s-line"></i
          ></a>
        </li>
      </ul>

      <!-- btn close -->
      <button class="nav__close center">
        <i class="ri-close-line"></i>
      </button>
    </div>`;
  }

  _addHeaderAndNavToPage() {
    this.header.insertAdjacentHTML('afterbegin', this._createHeaderEl());
    this.nav.insertAdjacentHTML('afterbegin', this._createNavEl());
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
