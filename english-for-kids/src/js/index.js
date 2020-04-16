// import cards from './cards';

const main = document.querySelector('main');
const switcher = document.querySelector('.switch');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu__item');
const btnMenu = document.querySelector('.menu-button');

const handleCloseMenu = () => {
  menu.classList.remove('menu--shown');
  btnMenu.classList.remove('menu-button--active');
  btnMenu.removeEventListener('click', handleCloseMenu);
  main.removeEventListener('click', handleCloseMenu);
  switcher.removeEventListener('click', handleCloseMenu);
  menuItems.forEach((item) => {
    item.removeEventListener('click', handleCloseMenu);
  });
};

const handleOpenMenu = () => {
  menu.classList.add('menu--shown');
  btnMenu.classList.add('menu-button--active');
  btnMenu.addEventListener('click', handleCloseMenu);
  main.addEventListener('click', handleCloseMenu);
  switcher.addEventListener('click', handleCloseMenu);
  menuItems.forEach((item) => {
    item.addEventListener('click', handleCloseMenu);
  });
};

const handleMenu = () => {
  btnMenu.addEventListener('click', handleOpenMenu);
};

window.onload = () => {
  handleMenu();
};
