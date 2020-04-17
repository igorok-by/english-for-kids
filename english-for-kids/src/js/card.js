class Card {
  constructor({
    word, translation, image, audioSrc,
  }, isMain, imgName, title) {
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audioSrc = audioSrc;
    this.card = '';
    this.isMain = isMain;
    this.imgName = imgName;
    this.title = title;
  }

  generateCard() {
    const templateCat = `<div class="card-container">
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
    const templateMain = `<div class="card">
            <svg class="card__icon card__icon--${this.imgName}"><use xlink:href="#${this.imgName}"></use></svg>
            <p class="card__name">${this.title}</p>
          </div>`;

    this.card = document.createElement('div');
    this.card.classList.add('col-3');
    if (this.isMain) {
      this.card.insertAdjacentHTML('beforeend', templateMain);
    } else {
      this.card.insertAdjacentHTML('beforeend', templateCat);
    }
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

    if (!this.isMain) this.bindEvents();

    return this.card;
  }
}

export default Card;
