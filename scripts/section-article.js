export default class {
  containerArticle = document.querySelector('.article__container');
  articleNumber = 6
  articleElement = `<figure class="article__data">
  <div class="article__blob">
    <img class="article__img" loading="lazy" src="./assets/image/article-1.svg" alt="" />
  </div>

  <figcaption>
    <p class="article__title">
      “Three Heroes and the Navel of the Earth” became the most
      successful Russian cartoon in history
    </p>

    <p class="article__subtitle">
      A unique trip along the OKAVANGO River, traveling on specially
      equipped boats, accommodation in five-star tents, all the way
      accompanied by a Russian-speaking guide.
    </p>
  </figcaption>

  <button class="article__open center">
    <i class="ri-arrow-right-line"></i>
  </button>
</figure>  `;

  constructor() {
    this._addArticlesToPage();
    console.log(this.containerArticle);

  }
  _addArticlesToPage() {
    for (let i = 0; i < this.articleNumber; i++) {
      this.containerArticle.insertAdjacentHTML(
        'beforeend',
        this.articleElement
      );
    }
  }
}
