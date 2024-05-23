import headerAndNav from './header.js';
import coloringCard from './coloring-card.js';
import article from './section-article.js';
import categoryCard from './category-card.js';
import footer from './footer.js';

// DOM Elements
const containerPopular = document.querySelector('.popular__container');

// about first section of page => popular and new coloring pages
const completePopularSection = function () {
  const getColoringData = async function (url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const getAllColoringData = async function () {
    const allCategory = [
      'animal',
      'cartoon',
      'coffee',
      'dreamcatcher',
      'geometric',
      'marvel',
      'nature',
      'game',
    ];
    const allJsonData = allCategory.map(category =>
      getColoringData(`./data/json/${category}.json`)
    );
    const response = await Promise.all(allJsonData);
    return response.flat();
  };

  // get top (number) of most popular coloring
  const getPopularColoringData = async function (number) {
    const allColoringData = await getAllColoringData();
    const popularColoringData = allColoringData
      .sort((a, b) => b.download - a.download)
      .slice(0, number);
    return popularColoringData;
  };

  const addPopularCardsToPage = async function (number) {
    const popularColoringData = await getPopularColoringData(number);
    popularColoringData.forEach(
      coloringData => new coloringCard(coloringData, containerPopular)
    );
  };

  // add top 8 of most popular coloring to html page
  addPopularCardsToPage(8);
};

const containerCategory = document.querySelector('.category__container');

// handle logic when user select a category
containerCategory.addEventListener('click', function (e) {
  const categoryEl = e.target.closest('.category__item');
  if (!categoryEl) return;
  const categoryName = categoryEl.dataset.category;
  localStorage.setItem('category-name', categoryName);
  window.location.href = './public/category.html';
});

new headerAndNav();
completePopularSection();
new article();
new categoryCard('childrens', ['cartoon', 'nature', 'game', 'animal']);
new categoryCard('adults', ['geometric', 'dreamcatcher', 'marvel', 'coffee']);
new footer();
