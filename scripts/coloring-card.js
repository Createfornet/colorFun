// this class will be create & add one instance of coloring card
export default class {
  constructor(data, containerColoringCards, homePage = true) {
    this.data = data;
    this.containerColoringCards = containerColoringCards;
    this.homePage = homePage;
    this.imageSrc = `./${this.homePage ? '' : '../'}data/image/${
      data.name
    }.jpg`;

    this.addColoringCard(data, containerColoringCards);
  }

  // download function$
  _downloadURL(url, name) {
    let link = document.createElement('a');
    link.download = name;
    link.href = url;
    link.click();
  }

  // create html element of coloring card
  createColoringCardEl() {
    return `<figure class="coloring__card" data-id ="${this.data.id}">
      <div class="coloring__card-blob">
        <img class="coloring__card-img" src=${this.imageSrc} alt="" />
      </div>
  
      <div class="coloring__card-detail">
        <span>${this.data.download} <i class="ri-download-line"></i></span>
        <div class="coloring__card-buttons">
          <button title="download" class="btn__download">
            <i class="ri-arrow-down-line"></i><span class="hidden">download</span>
          </button>
  
          <button title="see" class="btn__see">
            <i class="ri-eye-line"></i><span class="hidden">see</span>
          </button>
  
          <button title="like" class="btn__like">
            <i class="ri-heart-3-line"></i><span class="hidden">like</span>
          </button>
        </div>
      </div>
      <figcaption class="coloring__card-caption">${this.data.title}</figcaption>
    </figure>`;
  }

  // get last btn like or last btn download
  _getLastBtn(type) {
    return [
      ...this.containerColoringCards.querySelectorAll(`.btn__${type}`),
    ].at(-1);
  }

  // add a coloring card in the container (at docunent page)
  addColoringCard(data, containerColoringCards) {
    const coloringCardEl = this.createColoringCardEl();

    // add element to coloring card container at the page
    containerColoringCards.insertAdjacentHTML('beforeend', coloringCardEl);

    // handle download button of element
    this._getLastBtn('download').addEventListener('click', () =>
      this._downloadURL(this.imageSrc, this.data.title)
    );

    // handle like reaction
    this._getLastBtn('like').addEventListener('click', function (e) {
      const icon = this.querySelector('i');
      if (icon.classList.contains('ri-heart-3-line'))
        icon.className = 'ri-heart-3-fill';
      else icon.className = 'ri-heart-3-line';
    });
  }
}
