/* eslint-disable no-restricted-globals */
/* eslint-disable no-self-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import cards from './data';
import Card from './Card';

const main = document.querySelector('main');
const switcher = document.querySelector('.switch');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu__item');
const btnMenu = document.querySelector('.menu-button');
const rowMain = document.querySelector('#main');
const inputSwitchMode = document.querySelector('#isPlay');
const btnStartGame = document.querySelector('#start');
const rating = main.querySelector('.rating');
let tracksToPlay = [];

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

const shuffleArray = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const handleSwitchMode = () => {
  const presentedCards = document.querySelectorAll('.card');

  if (inputSwitchMode.checked) {
    switcher.classList.add('switch--play');
    presentedCards.forEach((card) => card.classList.add('card--play'));
    btnStartGame.addEventListener('click', handleGameMode);

    if (!menu.querySelector('.menu__item--main').classList.contains('menu__item--active')) {
      btnStartGame.classList.add('button--shown');
      presentedCards.forEach((card) => { card.outerHTML = card.outerHTML; });
    }
  } else {
    const category = menu.querySelector('.menu__item--active');
    switcher.classList.remove('switch--play');
    handleRenderCards(cards, category);
  }
};

const renderCardsOfMain = (dataOfCards) => {
  dataOfCards[1].map((name, index) => {
    const img = dataOfCards[0][index];
    let card = new Card(dataOfCards[2][1], true, img, name);
    card = card.mountCard();

    const cardBody = card.querySelector('.card');
    cardBody.addEventListener('click', () => handlePressedCategory(cards));

    return rowMain.append(card);
  });
};

const markChosenCategory = (chosenCat) => {
  if (chosenCat !== undefined) {
    menuItems.forEach((cat) => cat.classList.remove('menu__item--active'));
    chosenCat.classList.add('menu__item--active');
  }
};

const handleRenderCards = (dataOfCards, category) => {
  rating.textContent = '';
  rowMain.textContent = '';
  btnStartGame.classList.remove('button--shown', 'button--play');
  btnStartGame.removeEventListener('click', handleGameMode);
  btnStartGame.removeEventListener('click', playAudioOnClick);

  if (category.classList.contains('menu__item--main')) {
    renderCardsOfMain(dataOfCards);
    markChosenCategory(category);
  } else {
    const nameOfCat = category.classList.contains('menu__item')
      ? category.querySelector('span').innerText
      : category.querySelector('.card__name').innerText;
    const indexOfCategory = dataOfCards[1].indexOf(nameOfCat) + 2;

    dataOfCards[indexOfCategory].map((dataOfCard) => {
      const card = new Card(dataOfCard, false);
      return rowMain.append(card.mountCard());
    });

    menuItems.forEach((cat) => {
      if (cat.querySelector('span').innerText === nameOfCat) {
        markChosenCategory(cat);
      }
    });
  }
};

const handlePressedCategory = (dataOfCard) => {
  const pressedCat = event.target.closest('.menu__item') || event.target.closest('.card');

  if (pressedCat) {
    handleRenderCards(dataOfCard, pressedCat);
  }

  handleSwitchMode();
};

const playCurrentAudio = (listToPlay, delay) => {
  const currentAudio = new Audio(`${listToPlay[listToPlay.length - 1]}`);
  return setTimeout(() => currentAudio.play(), delay);
};

const playAudioOnClick = () => playCurrentAudio(tracksToPlay, 300);

const addSmileToRating = (smile) => {
  const templateForSmile = `<svg class="rating__icon rating__icon--${smile}"><use xlink:href="#${smile}"></use></svg>`;
  return rating.insertAdjacentHTML('beforeend', templateForSmile);
};

const restartGame = () => {
  rowMain.textContent = '';
  inputSwitchMode.checked = false;
  markChosenCategory(menu.querySelector('.menu__item--main'));
  handleSwitchMode();
};

const handleFinishGame = () => {
  const howMuchErrors = rating.querySelectorAll('.rating__icon--sad').length;
  const result = (howMuchErrors > 0) ? 'failure' : 'success';
  const audioFinish = new Audio(`./assets/audio/${result}.mp3`);
  const templateFinishGame = `<div class="col-12">
          <p class="text">Errors: ${howMuchErrors}</p>
          <img class="img-fluid d-block m-auto" src="./assets/img/${result}.jpg" alt="${result}-smile">
        </div>
      </div>`;
  rating.textContent = '';
  rowMain.textContent = '';
  btnStartGame.classList.remove('button--shown', 'button--play');
  btnStartGame.removeEventListener('click', playAudioOnClick);
  audioFinish.play();
  setTimeout(restartGame, 3000);
  rowMain.insertAdjacentHTML('beforeend', templateFinishGame);
};

const handleIsThisCorrect = () => {
  const clickedCard = event.target.closest('.card');
  const audioCorrect = new Audio('./assets/audio/correct.mp3');
  const audioError = new Audio('./assets/audio/error.mp3');

  if (clickedCard.dataset.audio === tracksToPlay[tracksToPlay.length - 1]) {
    audioCorrect.play();
    clickedCard.classList.add('card--disabled');
    clickedCard.removeEventListener('click', handleIsThisCorrect);
    addSmileToRating('smile');
    tracksToPlay.pop();

    if (tracksToPlay.length > 0) {
      playCurrentAudio(tracksToPlay, 700);
    } else {
      handleFinishGame();
    }
  } else {
    audioError.play();
    addSmileToRating('sad');
  }
};

const handleGameMode = () => {
  let cardsToPlay = document.querySelectorAll('.card');
  tracksToPlay = [];
  cardsToPlay.forEach((card) => { card.outerHTML = card.outerHTML; });
  btnStartGame.classList.add('button--play');
  btnStartGame.removeEventListener('click', handleGameMode);

  cardsToPlay = document.querySelectorAll('.card');
  cardsToPlay.forEach((card) => {
    card.addEventListener('click', handleIsThisCorrect);
    tracksToPlay.push(card.dataset.audio);
  });
  tracksToPlay = shuffleArray(tracksToPlay);
  playCurrentAudio(tracksToPlay, 700);
  btnStartGame.addEventListener('click', playAudioOnClick);
};

const bindEventListeners = () => {
  btnMenu.addEventListener('click', handleOpenMenu);
  menu.addEventListener('click', () => handlePressedCategory(cards));
  inputSwitchMode.addEventListener('change', handleSwitchMode);
};

window.onload = () => {
  renderCardsOfMain(cards);
  bindEventListeners();
};
