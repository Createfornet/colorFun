import headerBehavior from './header.js';
import coloringCard from './coloring-card.js';
import article from './section-article.js';

new headerBehavior();
new article();

// DOM Elements
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const containerPopular = document.querySelector('.popular__container');

const getColoringData = async function (url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const getAllColoringData = async function () {
  const response = await Promise.all([
    getColoringData('./data/json/animal.json'),
    getColoringData('./data/json/cartoon.json'),
    getColoringData('./data/json/coffee.json'),
    getColoringData('./data/json/dreamcatcher.json'),
    getColoringData('./data/json/geometric.json'),
    getColoringData('./data/json/marvel.json'),
    getColoringData('./data/json/nature.json'),
    getColoringData('./data/json/videogame.json'),
  ]);
  return response.flat();
};

const getPopularColoringData = async function (number) {
  const allColoringData = await getAllColoringData();
  const popularColoringData = allColoringData
    .sort((a, b) => b.download - a.download)
    .slice(0, number);
  return popularColoringData;
};

const addPopularCardsToPage = async function (number = 8) {
  const popularColoringData = await getPopularColoringData(number);
  console.log(popularColoringData);
  popularColoringData.forEach(
    coloringData => new coloringCard(coloringData, containerPopular)
  );
};
addPopularCardsToPage();

// find popular coloring cards and add them to the home
const addPopulurColoringCard = function (num) {
  for (let i = 0; i < num; i++) {
    new coloringCard(
      {
        name: 'geo-1',
        id: 1000,
        download: 999,
        title: 'its a test title',
      },
      containerPopular
    );
  }
};

main.style.marginTop = header.getBoundingClientRect().height + 'px';

// mondaymandala

const containerCategory = document.querySelector('.category__container');

containerCategory.addEventListener('click', function (e) {
  const categoryEl = e.target.closest('.category__item');
  if (!categoryEl) return;
  const categoryName = categoryEl.dataset.category;
  console.log(categoryName);
  localStorage.setItem('category-name', categoryName);
  window.location.href = './public/category.html';
});
