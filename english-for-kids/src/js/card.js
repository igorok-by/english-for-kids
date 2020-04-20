class Card {
  constructor({
    word, translation, image, audioSrc,
  }, isMain, imgName, title) {
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audioSrc = audioSrc;
    this.card = '';
    this.cardBody = '';
    this.btnToRotate = '';
    this.isMain = isMain;
    this.imgName = imgName;
    this.cardTitle = title;
    this.modeSwitcher = document.querySelector('#isPlay');
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
            <p class="card__name">${this.cardTitle}</p>
          </div>`;

    this.card = document.createElement('div');
    this.card.classList.add('col-12', 'col-sm-6', 'col-lg-4', 'col-xl-3');

    if (this.isMain) {
      this.card.insertAdjacentHTML('beforeend', templateMain);
    } else {
      this.card.insertAdjacentHTML('beforeend', templateCat);
    }
    return this.card;
  }

  flipCard(card) {
    this.cardBody = card.querySelector('.card--cat');
    this.cardBody.classList.add('card--rotated');
    this.cardBody.addEventListener('mouseleave', () => {
      this.cardBody.classList.remove('card--rotated');
    });
  }

  sayWord(card) {
    // eslint-disable-next-line no-restricted-globals
    if (!event.target.closest('.card__rotate')) {
      this.cardBody = card.querySelector('.card--cat');
      const audio = new Audio();
      audio.src = this.cardBody.dataset.audio;
      audio.play();
    }
  }

  bindEvents() {
    if (!this.isMain && !this.modeSwitcher.checked) {
      this.cardBody = this.card.querySelector('.card--cat');
      this.btnToRotate = this.card.querySelector('.card__rotate');

      this.cardBody.addEventListener('click', () => this.sayWord(this.card));
      this.btnToRotate.addEventListener('click', () => this.flipCard(this.card));
    }
  }

  mountCard() {
    this.card = this.generateCard();

    this.bindEvents();

    return this.card;
  }
}

export default Card;
