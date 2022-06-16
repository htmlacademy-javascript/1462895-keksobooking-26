const mapFilters = document.querySelector('.map__filters');
const mapFilterSelects = mapFilters.querySelectorAll('select');
const mapFilterFieldsets = mapFilters.querySelectorAll('fieldset');

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');

const activateInterface = (isOn = true) => {
  adForm.classList.toggle('ad-form--disabled', isOn);

  Array.from(mapFilterSelects).forEach((el) => {
    el.disabled = isOn;
  });

  Array.from(mapFilterFieldsets).forEach((el) => {
    el.disabled = isOn;
  });

  Array.from(adFormFieldsets).forEach((el) => {
    el.disabled = isOn;
  });
};

export { activateInterface };
