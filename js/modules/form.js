const toggleFormElements = (formClass, isOn = true) => {
  const form = document.querySelector(`.${formClass}`);
  const formElements = form.querySelectorAll('select, fieldset');

  form.classList.toggle(`${formClass}--disabled`, isOn);

  Array.from(formElements).forEach((el) => {
    el.disabled = isOn;
  });
};

const activateMapFilters = (isOn = true) => {
  toggleFormElements('map__filters', isOn);
};

const activateAdFormElements = (isOn = true) => {
  toggleFormElements('ad-form', isOn);
};

const activateInterface = (isOn = true) => {
  if (isOn) {
    activateMapFilters(isOn);
  }

  activateAdFormElements(isOn);
};

export { activateInterface };
