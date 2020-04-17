// import card from "./data";
class Card {
  constructor({ word, translation, image, audioSrc }) {
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audioSrc = audioSrc;
    this.card = '';
  }

  generateCard() {
    const template = `<div class="card-container">
            <div class="card card--cat" data-audio="./assets/${this.audioSrc}">
              <div class="card__front">
                <img class="card__img" src="./assets/${this.image}" alt="${this.word}">
                <p class="card__word">${this.word}</p>
                <svg class="card__rotate"><use xlink:href="#rotate"></use></svg>
              </div>
              <div class="card__back">
                <img class="card__img" src="./assets/${this.image}" alt="${this.word}">
                <p class="card__word">${this.translation}</p>
              </div>
            </div>
          </div>`;
    this.card = document.createElement('div');
    this.card.classList.add('col-3');
    this.card.insertAdjacentHTML('beforeend', template);
    return this.card;
  }

  mountCard() {
    this.card = this.generateCard();

    // this.bindEvents();

    return this.card;
  }
}

export default Card;
