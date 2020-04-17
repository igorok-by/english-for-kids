import cards from './data';
import Card from './Card';

const main = document.querySelector('main');
const switcher = document.querySelector('.switch');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu__item');
const btnMenu = document.querySelector('.menu-button');
const rowCategory = document.querySelector('#category');

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

const renderCards = (dataOfCards) => {
  const pressedCat = event.target.closest('.menu__item');
  const nameOfCat = pressedCat.querySelector('span').innerText;

  rowCategory.textContent = '';

  if (!pressedCat.classList.contains('menu__item--main')) {
    const indexOfCategory = dataOfCards[0].indexOf(nameOfCat) + 1;

    dataOfCards[indexOfCategory].forEach((dataOfCard) => {
      const card = new Card(dataOfCard);
      rowCategory.append(card.mountCard());
    });
  }
};

const bindEventListeners = () => {
  menu.addEventListener('click', () => renderCards(cards));
};

window.onload = () => {
  handleMenu();

  bindEventListeners();
};
