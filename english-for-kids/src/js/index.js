import cards from './data';
import Card from './Card';
import CardContainer from './CardContainer';

const main = document.querySelector('main');
const switcher = document.querySelector('.switch');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu__item');
const btnMenu = document.querySelector('.menu-button');
const rowMain = document.querySelector('#main');
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

  if (pressedCat.classList.contains('menu__item--main')) {
    dataOfCards[1].map((name, index) => {
      const img = dataOfCards[0][index];
      const card = new Card(dataOfCards[2][1], true, img, name);
      return rowCategory.append(card.mountCard());
    });
  } else {
    const indexOfCategory = dataOfCards[1].indexOf(nameOfCat) + 2;

    dataOfCards[indexOfCategory].map((dataOfCard) => {
      const card = new Card(dataOfCard, false);
      return rowCategory.append(card.mountCard());
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
