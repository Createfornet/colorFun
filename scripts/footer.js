export default class {
  footer = document.querySelector('.footer');
  constructor(homePage = true) {
    this.homePage = homePage
    this.srcCorrection = this.homePage ? '' : '../';
    this.srcMainLogo = `./${this.srcCorrection}assets/icon/colorFun.svg`;
    this.srcTelLogo = `./${this.srcCorrection}assets/icon/social-tg.svg`;
    this.srcVkLogo = `./${this.srcCorrection}assets/icon/social-vk.svg`
    this._addFooterToPage();
  }
  _createFooterEl() {
    return `<div class="footer__shape"></div>
      <div class="footer__container section">
        <div class="footer__content">
          <img class="footer__logo" loading="lazy" src=${this.srcMainLogo} alt="" />
          <p class="footer__copy">© 2024 ColorFun.ru</p>
          <div class="footer__social">
            <img loading="lazy" src=${this.srcTelLogo} alt="" />
            <img loading="lazy" src=${this.srcVkLogo} alt="" />
          </div>
        </div>
        <p class="footer__note">
          Images and objects in coloring pages on our site, which may be
          protected by copyright, are used solely for non-commercial and
          educational purposes. If you own rights to any of the materials and
          believe that their use violates your rights, please contact us for a
          prompt resolution of the issue
        </p>
      </div>`;
  }

  _addFooterToPage() {
    this.footer.insertAdjacentHTML('afterbegin', this._createFooterEl());
  }
}
