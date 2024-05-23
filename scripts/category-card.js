export default class {
  containerCategory = document.querySelector('.category__container');

  constructor(ages, categories) {
    this.ages = ages;
    this.categories = categories;

    this._addCategoriesToContent()
  }

  _createCategoryContentEl() {
    return `<div class="category__content">
    <h3 class="category__title" id="${this.ages}">For ${this.ages}</h3>
    <div class="category__info">
    </div>
  </div>`;
  }

  _createCategoryEl(categoryName) {
    return `<figure class="category__item" data-category="${categoryName}">
      <figcaption class="category__name">${categoryName}</figcaption>
      <div class="category__blob">
        <img
          loading="lazy"
          src="./assets/image/category-${categoryName}.jpeg"
          alt=""
        />
      </div>
    </figure>`;
  }

  _addCategoriesToContent() {
    // add category content to category container
    this.containerCategory.insertAdjacentHTML(
      'beforeend',
      this._createCategoryContentEl()
    );

    const categoryContent = [
      ...this.containerCategory.querySelectorAll('.category__content'),
    ].at(-1);

    const categoriesInfo = categoryContent.querySelector('.category__info');
    this.categories.forEach(categoryName => {
      categoriesInfo.insertAdjacentHTML('beforeend', this._createCategoryEl(categoryName))
    });
  }
}
