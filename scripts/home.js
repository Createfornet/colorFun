import headerBehavior from './header.js';

new headerBehavior();

// DOM Elements
const header = document.querySelector('.header');
const main = document.querySelector('.main');

// mondaymandala

const categories = document.querySelectorAll('.category__item');

categories.forEach(category =>
  category.addEventListener('click', function () {
    window.location.href = './public/one-category.html';
  })
);

console.log(header.getBoundingClientRect().height);

main.style.marginTop = header.getBoundingClientRect().height + 18 + 'px';
