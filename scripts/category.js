import headerAndNav from './header.js'
import coloringCard from './coloring-card.js';
import footer from './footer.js'

new headerAndNav(false)
new footer(false)


// DOM Elements
const btnLoadMore = document.querySelector('.category__load');
const containerCategory = document.querySelector('.category__content');
const pageTitle = document.querySelector('title')

// set title of html page
pageTitle.textContent = localStorage.getItem('category-name') + ' coloring pages'

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
  requiredData.forEach(data => new coloringCard(data, containerCategory, false));
  console.log(requiredData);
};

// first loading coloring pages to fill the site page
loadMoreCard();

// handle load button to load more coloring pages
btnLoadMore.addEventListener('click', loadMoreCard);
