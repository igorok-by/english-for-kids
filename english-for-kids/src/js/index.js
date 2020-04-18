import cards from './data';
import Card from './Card';

const main = document.querySelector('main');
const switcher = document.querySelector('.switch');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu__item');
const btnMenu = document.querySelector('.menu-button');
const rowMain = document.querySelector('#main');
const inputSwitchMode = document.querySelector('#isPlay');

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

const handleSwitchMode = () => {
  const presentedCards = document.querySelectorAll('.card');

  if (inputSwitchMode.checked) {
    switcher.classList.add('switch--play');
    presentedCards.forEach((card) => card.classList.add('card--play'));
  } else {
    switcher.classList.remove('switch--play');
    presentedCards.forEach((card) => card.classList.remove('card--play'));
  }
};

const renderCardsOfMain = (dataOfCards) => {
  dataOfCards[1].map((name, index) => {
    const img = dataOfCards[0][index];
    let card = new Card(dataOfCards[2][1], true, img, name);
    card = card.mountCard();

    const cardBody = card.querySelector('.card');
    cardBody.addEventListener('click', () => handleRenderCards(cards));

    return rowMain.append(card);
  });
};

const handleRenderCards = (dataOfCards) => {
  const pressedCat = event.target.closest('.menu__item') || event.target.closest('.card');

  rowMain.textContent = '';

  if (pressedCat.classList.contains('menu__item--main')) {
    renderCardsOfMain(dataOfCards);
  } else {
    const nameOfCat = pressedCat.classList.contains('menu__item')
      ? pressedCat.querySelector('span').innerText
      : pressedCat.querySelector('.card__name').innerText;
    const indexOfCategory = dataOfCards[1].indexOf(nameOfCat) + 2;

    dataOfCards[indexOfCategory].map((dataOfCard) => {
      const card = new Card(dataOfCard, false);
      return rowMain.append(card.mountCard());
    });
  }

  handleSwitchMode();
};

const bindEventListeners = () => {
  btnMenu.addEventListener('click', handleOpenMenu);
  menu.addEventListener('click', () => handleRenderCards(cards));
  inputSwitchMode.addEventListener('change', handleSwitchMode);
};

window.onload = () => {
  renderCardsOfMain(cards);

  bindEventListeners();
};
