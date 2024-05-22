export default class {
  containerPopular = document.querySelector('.popular__container');
  popularNumber = 8;
  coloringCardElement = `<figure class="coloring__card" data-id ="1000">
  <div class="coloring__card-blob">
    <img class="coloring__card-img" src="./data/image/geo-1.jpg" alt="" />
  </div>

  <div class="coloring__card-detail">
    <span>1403 <i class="ri-download-line"></i></span>
    <div class="coloring__card-buttons">
      <button title="download" class="btn__download">
        <i class="ri-arrow-down-line"></i>
      </button>

      <button title="see" class="btn__see">
        <i class="ri-eye-line"></i>
      </button>

      <button title="like" class="btn__like">
        <i class="ri-heart-3-line"></i>
      </button>
    </div>
  </div>
  <figcaption class="coloring__card-caption">test</figcaption>
</figure>`;

  constructor() {
    this._addColoringCardsToPage();
    console.log(1);
  }

  _addColoringCardsToPage() {
    for (let i = 0; i < this.popularNumber; i++) {
      this.containerPopular.insertAdjacentHTML(
        'beforeend',
        this.coloringCardElement
      );
    }
  }
}
