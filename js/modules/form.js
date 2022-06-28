import { toggleFormElements, getGenitiveForm } from './utils.js';

const TitleLimit = {
  MIN: 30,
  MAX: 100,
};

const PriceLimit = {
  MIN: {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  },
  MAX: {
    bungalow: 100000,
    flat: 100000,
    hotel: 100000,
    house: 100000,
    palace: 100000,
  },
};

const GuestsCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const typeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const roomsInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');

const FormError = {
  TITLE_LENGTH: `Заголовок должен содержать от ${TitleLimit.MIN} до ${TitleLimit.MAX} символов`,
  PRICE_VALUE: () => `Укажите цену ${getGenitiveForm(typeInput.value)} от ${PriceLimit.MIN[typeInput.value]} до ${PriceLimit.MAX[typeInput.value]}`,
  CAPACITY_VALUE: () => {
    if (roomsInput.value === '100') {
      return 'Это жилье предназначено не для гостей';
    }

    return capacityInput.value === '0'
      ? 'Это жилье предназначено для гостей'
      : 'Гостей не может быть больше, чем комнат';
  },
};

const activateMapFilters = (isOn = true) => {
  toggleFormElements('map__filters', isOn);
};

const activateAdFormElements = (isOn = true) => {
  toggleFormElements('ad-form', isOn);
};

const validateTitle = (val) =>
  val.length >= TitleLimit.MIN
  && val.length <= TitleLimit.MAX;

const validatePrice = (val) =>
  parseInt(val, 10) >= PriceLimit.MIN[typeInput.value]
  && parseInt(val, 10) <= PriceLimit.MAX[typeInput.value];

const validateCapacity = (val) => GuestsCapacity[roomsInput.value].includes(val);

const validateForm = () => {
  const pristine = new Pristine(adForm, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__error',
  }, false);

  pristine.addValidator(titleInput, validateTitle, FormError.TITLE_LENGTH);
  pristine.addValidator(priceInput, validatePrice, FormError.PRICE_VALUE);
  pristine.addValidator(capacityInput, validateCapacity, FormError.CAPACITY_VALUE);

  const onTypeInputChange = () => {
    priceInput.placeholder = PriceLimit.MIN[typeInput.value];

    if (priceInput.value || priceInput.closest('.has-danger')) {
      pristine.validate(priceInput);
    }
  };

  const onRoomsInputChange = () => {
    pristine.validate(capacityInput);
  };

  const onCapacityInputChange = () => {
    pristine.validate(capacityInput);
  };

  const onAdFormChange = (evt) => {
    evt.preventDefault();

    pristine.validate();
  };

  typeInput.addEventListener('change', onTypeInputChange);
  roomsInput.addEventListener('change', onRoomsInputChange);
  capacityInput.addEventListener('change', onCapacityInputChange);
  adForm.addEventListener('submit', onAdFormChange);
};

const initForm = () => {
  activateMapFilters(false);
  activateAdFormElements(false);
  setTimeout(activateAdFormElements, 1000, true);
  validateForm();
};

export { initForm };
