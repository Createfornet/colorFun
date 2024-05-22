import headerBehavior from './header.js';
import popularColorings from './section-popular.js'
import articles from './section-article.js'

new headerBehavior();
new popularColorings();
new articles();

// DOM Elements
const header = document.querySelector('.header');
const main = document.querySelector('.main');

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
