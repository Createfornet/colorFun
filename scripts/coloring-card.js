export default class {
  constructor(data, containerColoringCards, homePage) {
    this.createColoringCard(data, containerColoringCards, homePage);
  }

  // download function$
  _downloadURL(url, name) {
    let link = document.createElement('a');
    link.download = name;
    link.href = url;
    link.click();
  }

  createColoringCard(data, containerColoringCards, homePage = true) {
    // create element of coloring card
    // prettier-ignore
    const ElColoringCard = 
    `<figure class="coloring__card" data-id ="${data.id}">
      <div class="coloring__card-blob">
        <img class="coloring__card-img" src="./${homePage ? '' : '../'}data/image/${data.name}.jpg" alt="" />
      </div>
  
      <div class="coloring__card-detail">
        <span>${data.download} <i class="ri-download-line"></i></span>
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
      <figcaption class="coloring__card-caption">${data.title}</figcaption>
    </figure>`;

    // add element to document page
    containerColoringCards.insertAdjacentHTML('beforeend', ElColoringCard);

    // handle download button of element
    const btnDownload = [...document.querySelectorAll('.btn__download')].at(-1);
    btnDownload.addEventListener('click', () =>
      this._downloadURL(
        `./${homePage ? '' : '../'}data/image/${data.name}.jpg`,
        data.title
      )
    );

    // handle like reaction
    const btnLike = [...document.querySelectorAll('.btn__like')].at(-1);
    btnLike.addEventListener('click', function (e) {
      this.querySelector('i').className = 'ri-heart-3-fill';
    });
  }
}
