'use strict';

// DOM Elements
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const btnsDownload = document.querySelectorAll('.btn__download');
const btnsSee = document.querySelectorAll('.btn__see');
const btnsLike = document.querySelectorAll('.btn__like');

main.style.marginTop = header.getBoundingClientRect().height +'px'

btnsLike.forEach(btnLike =>
  btnLike.addEventListener('click', function (e) {
    e.preventDefault()
    console.log(1);
    console.log(btnLike.querySelector('i'));
    btnLike.querySelector('i').className = 'ri-heart-3-fill';
  })
);
