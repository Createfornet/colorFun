// this class is for header, navbar & search behavior
export default class {
  header = document.querySelector('.header');
  nav = document.querySelector('.nav');

  // need for find suggestions
  allCategory = [
    'animal',
    'cartoon',
    'coffee',
    'dreamcatcher',
    'geometric',
    'marvel',
    'nature',
    'game',
  ];
  constructor(homePage = true) {
    this.homePage = homePage;
    this.srcCorrectio = this.homePage ? '' : '../';
    this.srcLogo = `./${this.srcCorrectio}assets/icon/colorFun.svg`;
    this._addHeaderAndNavToPage();
    this.btnOpenMenu = document.querySelector('.nav__open');
    this.btnCloseMenu = document.querySelector('.nav__close');
    this.menu = document.querySelector('.nav__menu');
    this.inpSearch = document.querySelector('.header__search-input');
    this.searchField = document.querySelector('.header__search')
    this.iconSearch = document.querySelector('.search-icon')
    this.iconMic = document.querySelector('.mic-icon')
    this.overlay = document.querySelector('.overlay');
    this.inputSearch = document.querySelector('.header__search-input');
    this.containerSearchSuggestion = document.querySelector(
      '.suggestions__container'
    );
    this._preset();

    // event listeners
    this.btnOpenMenu.addEventListener('click', this._openMenu.bind(this));
    this.btnCloseMenu.addEventListener('click', this._closeMenu.bind(this));
    this.overlay.addEventListener('click', this._closeMenu.bind(this));
    this.inpSearch.addEventListener(
      'focus',
      this._sweetchToFocusedStyle.bind(this)
    );
    this.inpSearch.addEventListener(
      'blur',
      this._sweetchToBluredStyle.bind(this)
    );
    this.inputSearch.addEventListener(
      'keydown',
      this._showSearchSuggestions.bind(this)
    );
    //when user sect a suggestion
    this.containerSearchSuggestion.addEventListener(
      'click',
      this._showSuggestionContent.bind(this)
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

      <div class="suggestions__container">
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

  _createSuggestionEl(data) {
    return `<div class="suggestion__item" data-id="${data.id}">
            <div class="search-icon">
              <i class="ri-search-line"></i>
            </div>
            <p class="suggestion-text">
              ${data.title}
            </p>
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

  _sweetchToFocusedStyle(){
    this.searchField.classList.add('header__search-focused')
    this.iconSearch.classList.add('icon-focused')
    this.iconMic.classList.add('icon-focused')
  }

  _sweetchToBluredStyle(){
    this.searchField.classList.remove('header__search-focused')
    this.iconSearch.classList.remove('icon-focused')
    this.iconMic.classList.remove('icon-focused')
  }

  async _getSearchSuggestions() {
    try {
      const allData = await this._getAllColoringData();
      const suggestions = this.inputSearch.value
        ? allData.filter(data =>
            data.title
              .toLowerCase()
              .includes(this.inputSearch.value.toLowerCase())
          )
        : [];
      return suggestions;
    } catch (err) {}
  }

  async _showSearchSuggestions(e) {
    // clear last search suggestions
    this.containerSearchSuggestion.innerHTML = null;

    // find search suggestions data
    const suggestionsData = await this._getSearchSuggestions();

    // add search suggestions to their container to see
    suggestionsData.forEach(data => {
      this.containerSearchSuggestion.insertAdjacentHTML(
        'beforeend',
        this._createSuggestionEl(data)
      );
    });
  }

  async _getColoringData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async _getAllColoringData() {
    const allJsonFiles = this.allCategory.map(category =>
      this._getColoringData(`./data/json/${category}.json`)
    );
    const allColoringData = await Promise.all(allJsonFiles);
    return allColoringData.flat();
  }

  async _showSuggestionContent(e) {
    const desiredColoring = e.target.closest('.suggestion__item');
    if (!desiredColoring) return;

    const desiredColoringId = desiredColoring.dataset.id;
    console.log(desiredColoringId);
    const allColoringData = await this._getAllColoringData();
    const selectedSuggestion = allColoringData.find(
      data => data.id === desiredColoringId
    );
    console.log(selectedSuggestion);
  }
}

// The desired tree
