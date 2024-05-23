import headerAndNav from './header.js';
import coloringCard from './coloring-card.js';
import footer from './footer.js';

new headerAndNav(false);
new footer(false);

// DOM Elements
const btnLoadMore = document.querySelector('.category__load');
const containerCategory = document.querySelector('.category__content');
const pageTitle = document.querySelector('title');
const categoryTitle = document.querySelector('.category__title');

// get & storage category name from loca host
const categoryName = localStorage.getItem('category-name');

// set title of html page
pageTitle.textContent = categoryName + ' coloring pages';

// set category name of this page
categoryTitle.textContent = categoryName;

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
  const requiredData = await getRequiredData(
    `./../data/json/${categoryName}.json`
  );
  requiredData.forEach(
    data => new coloringCard(data, containerCategory, false)
  );
};

// first loading coloring pages to fill the site page
loadMoreCard();

// handle load button to load more coloring pages
btnLoadMore.addEventListener('click', loadMoreCard);
