import headerAndNav from './header.js'
import footer from './footer.js'

new headerAndNav(false)
new footer(false)


// DOM Elements
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const btnLoad = document.querySelector('.category__load');

const containerCategory = document.querySelector('.category__content');

main.style.marginTop = header.getBoundingClientRect().height + 'px';

// download function$
const downloadURL = function (url, name) {
  let link = document.createElement('a');
  link.download = name;
  link.href = url;
  link.click();
};

// create a card of coloring page
const createColoringCard = function (data) {
  // create element of coloring card
  // prettier-ignore
  const ElColoringCard = 
  `<figure class="coloring__card" data-id ="${data.id}">
    <div class="coloring__card-blob">
      <img class="coloring__card-img" src="./../data/image/${data.name}.jpg" alt="" />
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
  containerCategory.insertAdjacentHTML('beforeend', ElColoringCard);

  // handle download button of element
  const btnDownload = [...document.querySelectorAll('.btn__download')].at(-1);
  btnDownload.addEventListener('click', () =>
    downloadURL(`./../data/image/${data.name}.jpg`, data.name)
  );

  // handle like reaction
  const btnLike = [...document.querySelectorAll('.btn__like')].at(-1);
  btnLike.addEventListener('click', function (e) {
    this.querySelector('i').className = 'ri-heart-3-fill';
  });
};

let currentNumber = 0;

// it takes the required amount of data in the form of arrey
const getRequiredData = async function (url, amount = 4) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('the request faild');
    const data = await response.json();
    const requiredData = data.slice(currentNumber, currentNumber + amount);
    if (!requiredData.length)
      throw new Error('there is no more card to display');
    currentNumber += amount;
    return requiredData;
  } catch (err) {
    console.log(err);
  }
};

const loadMoreCard = async function () {
  const requiredData = await getRequiredData(`./../data/json/${localStorage.getItem('category-name')}.json`);
  requiredData.forEach(data => createColoringCard(data));
  console.log(requiredData);
};

// first loading coloring pages to fill the site page
loadMoreCard();

// handle load button to load more coloring pages
btnLoad.addEventListener('click', loadMoreCard);
