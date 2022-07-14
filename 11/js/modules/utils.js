const ALERT_SHOW_TIME = 5000;
const ALERT_TRANSITION_TIME = 1000;

const qEndingsMap = {
  room: ['комната', 'комнаты', 'комнат'],
  guest: ['гостя', 'гостей', 'гостей'],
};

const wordForms = {
  bungalow: ['бунгало', 'бунгало'],
  flat: ['квартира', 'квартиры'],
  hotel: ['отель', 'отеля'],
  house: ['дом', 'дома'],
  palace: ['дворец', 'дворца'],
};

const getQEndings = (q = 1, word) => {
  if (q % 100 < 11 || q % 100 > 14) {
    if (q % 10 === 1) {
      return `${q} ${qEndingsMap[word][0]}`;
    } else if (q % 10 > 1 && q % 10 < 5) {
      return `${q} ${qEndingsMap[word][1]}`;
    }
  }

  return `${q} ${qEndingsMap[word][2]}`;
};

const getNominativeForm = (word) => wordForms[word][0];

const getGenitiveForm = (word) => wordForms[word][1];

const toggleFormElements = (formClass, isOn = true) => {
  const form = document.querySelector(`.${formClass}`);
  const formElements = form.querySelectorAll('select, fieldset');

  form.classList.toggle(`${formClass}--disabled`, !isOn);

  Array.from(formElements).forEach((el) => {
    el.disabled = !isOn;
  });
};

const activateMapFilters = (isOn = true) => {
  toggleFormElements('map__filters', isOn);
};

const activateAdFormElements = (isOn = true) => {
  toggleFormElements('ad-form', isOn);
};

const getRandomArrayElements = (elements, q = 10) => {
  if (elements.length <= q) {
    return elements;
  }

  let randomElements = [];

  while (randomElements.length < q) {
    const index = Math.floor(Math.random() * elements.length);

    randomElements.push(elements[index]);
    randomElements = randomElements.filter((el, i, arr) =>  arr.indexOf(el) === i);
  }

  return randomElements;
};

const capitalizeFirstLetter = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1100';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '8px 4px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#f0f0ea';
  alertContainer.style.backgroundColor = '#ff6547';
  alertContainer.style.transition = `opacity ${ALERT_TRANSITION_TIME}ms ease`;

  alertContainer.innerHTML = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.style.opacity = '0';
  }, ALERT_SHOW_TIME - ALERT_TRANSITION_TIME);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}


// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}


export {
  getQEndings,
  getNominativeForm,
  getGenitiveForm,
  activateMapFilters,
  activateAdFormElements,
  getRandomArrayElements,
  capitalizeFirstLetter,
  showAlert,
  debounce,
  throttle
};
