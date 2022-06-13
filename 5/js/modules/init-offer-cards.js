import { createOffers } from './data.js';

const offerCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createOfferCard = (offer) => {
  const offerCard = offerCardTemplate.cloneNode(true);
  const avatarElement = offerCard.querySelector('.popup__avatar');
  const titleElement = offerCard.querySelector('.popup__title');
  const addressElement = offerCard.querySelector('.popup__text--address');
  const priceElement = offerCard.querySelector('.popup__text--price');
  const typeElement = offerCard.querySelector('.popup__type');
  const capacityElement = offerCard.querySelector('.popup__text--capacity');
  const timeElement = offerCard.querySelector('.popup__text--time');
  const featuresElement = offerCard.querySelector('.popup__features');
  const descriptionElement = offerCard.querySelector('.popup__description');
  const photosElement = offerCard.querySelector('.popup__photos');

  const {
    author: {
      avatar
    },
    offer: {
      title,
      address,
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout,
      features,
      description,
      photos,
    },
  } = offer;

  if (avatar) {
    avatarElement.src = avatar;
  } else {
    avatarElement.remove();
  }

  if (title) {
    titleElement.textContent = title;
  } else {
    titleElement.remove();
  }

  if (address) {
    addressElement.textContent = address;
  } else {
    addressElement.remove();
  }

  if (price) {
    priceElement.textContent = `${price} ₽/ночь`;
  } else {
    priceElement.remove();
  }

  if (type) {
    typeElement.textContent = type;
  } else {
    typeElement.remove();
  }

  if (rooms && guests) {
    capacityElement.textContent = `${rooms} комнаты для ${guests} гостей`;
  } else if (rooms) {
    capacityElement.textContent = `${rooms} комнаты`;
  } else if (guests) {
    capacityElement.textContent = `Для ${guests} гостей`;
  } else {
    capacityElement.remove();
  }

  if (checkin && checkout) {
    timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else if (checkin) {
    timeElement.textContent = `Заезд после ${checkin}`;
  } else if (checkout) {
    timeElement.textContent = `Выезд до ${checkout}`;
  } else {
    timeElement.remove();
  }

  if (description) {
    descriptionElement.textContent = description;
  } else {
    descriptionElement.remove();
  }

  if (features.length) {
    featuresElement.innerHTML = '';

    features.forEach((feature) => {
      const featureElement = document.createElement('li');

      featureElement.classList.add(
        'popup__feature',
        `popup__feature--${feature}`
      );

      featuresElement.append(featureElement);
    });
  } else {
    featuresElement.remove();
  }

  if (photos.length) {
    photosElement.innerHTML = '';

    photos.forEach((photo) => {
      const photoElement = document.createElement('img');

      photoElement.classList.add('popup__photo');
      photoElement.width = '45';
      photoElement.height = '40';
      photoElement.alt = 'Фотография жилья';
      photoElement.src = photo;

      photosElement.append(photoElement);
    });
  } else {
    photosElement.remove();
  }

  return offerCard;
};

const initOfferCards = () => {
  const map = document.querySelector('#map-canvas');
  const offers = createOffers();
  const offersFragment = document.createDocumentFragment();

  offers.forEach((offer, i) => {
    createOfferCard(offer);

    if (i === 0) {
      offersFragment.append(createOfferCard(offer));
    }
  });

  map.append(offersFragment);
};

export { initOfferCards };
