class Card {
  constructor({
    word, translation, image, audioSrc,
  }) {
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

  // eslint-disable-next-line class-methods-use-this
  flipCard(card) {
    const cardBody = card.querySelector('.card--cat');
    cardBody.classList.add('card--rotated');
    cardBody.addEventListener('mouseleave', () => {
      cardBody.classList.remove('card--rotated');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  sayWord(card) {
    if (!event.target.closest('.card__rotate')) {
      const cardBody = card.querySelector('.card--cat');
      const audio = new Audio();
      audio.src = cardBody.dataset.audio;
      audio.play();
    }
  }

  bindEvents() {
    const btnToRotate = this.card.querySelector('.card__rotate');
    const cardBody = this.card.querySelector('.card--cat');

    btnToRotate.addEventListener('click', () => this.flipCard(this.card));
    cardBody.addEventListener('click', () => this.sayWord(this.card));
  }

  mountCard() {
    this.card = this.generateCard();
    this.bindEvents();

    return this.card;
  }
}

export default Card;
