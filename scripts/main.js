// DOM Elements
const btnOpenMenu = document.querySelector('.nav__open')
const btnCloseMenu = document.querySelector('.nav__close')
const menu = document.querySelector('.nav__menu')
const overlay = document.querySelector('.overlay')

btnOpenMenu.addEventListener('click', function(){
  menu.classList.add('show-menu')
  overlay.classList.remove('hidden')
})

btnCloseMenu.addEventListener('click', function(){
  menu.classList.remove('show-menu')
  overlay.classList.add('hidden')
})
