const TokyoCoordBorders = {
  LAT_MIN: 35.65,
  LAT_MAX: 35.7,
  LNG_MIN: 139.7,
  LNG_MAX: 139.8,
};

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const OFFER_TYME_VALUES = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jp',
];

const getRandomIntegerNumber = (from, to) => {
  if (from < 0) {
    throw new RangeError('Нижняя граница диаппазона не может быть отрицательной.');
  }

  if (from > to) {
    throw new RangeError('Верхняя граница диаппазона не может быть меньше нижней.');
  }

  if (Number.isNaN(+from) || (Number.isNaN(+to))) {
    throw new RangeError('Невозможно представить все параметры функции в виде числа');
  }

  const modifiedFrom = Math.ceil(from);
  const modifiedTo = Math.floor(to);

  return Math.floor(Math.random() * (modifiedTo - modifiedFrom + 1)) + modifiedFrom;
};

const getRandomFloatNumber = (from, to, precision = 5) => {
  if (from < 0) {
    throw new RangeError('Нижняя граница диаппазона не может быть отрицательной.');
  }

  if (from > to) {
    throw new RangeError('Верхняя граница диаппазона не может быть меньше нижней.');
  }

  if (Number.isNaN(+from) || (Number.isNaN(+to))) {
    throw new RangeError('Невозможно представить все параметры функции в виде числа');
  }

  return Number((Math.random() * (to - from) + from).toFixed(precision));
};

const generateSubArray = (arr) => arr.filter(() => Math.random() < 0.5);

const createOffer = () => {
  const lat = getRandomFloatNumber(TokyoCoordBorders.LAT_MIN, TokyoCoordBorders.LAT_MAX, 5);
  const lng = getRandomFloatNumber(TokyoCoordBorders.LNG_MIN, TokyoCoordBorders.LNG_MAX, 5);

  return {
    author: {
      avatar: `img/avatars/user${getRandomIntegerNumber(1, 10).toString().padStart(2, '0')}.png`,
    },
    offer: {
      title: 'Сдам',
      address: `${lat}, ${lng}`,
      price: getRandomIntegerNumber(1000, 100000),
      type: OFFER_TYPES[getRandomIntegerNumber(0, OFFER_TYPES.length - 1)],
      rooms: getRandomIntegerNumber(1, 10),
      guests: getRandomIntegerNumber(1, 10),
      checkin: OFFER_TYME_VALUES[getRandomIntegerNumber(0, OFFER_TYME_VALUES.length - 1)],
      checkout: OFFER_TYME_VALUES[getRandomIntegerNumber(0, OFFER_TYME_VALUES.length - 1)],
      features: generateSubArray(OFFER_FEATURES),
      description: 'Здесь можно жить',
      photos: generateSubArray(OFFER_PHOTOS),
    },
    location: {
      lat,
      lng,
    },
  };
};

const createOffers = Array.from({length: 10}, createOffer);

export {createOffers};
