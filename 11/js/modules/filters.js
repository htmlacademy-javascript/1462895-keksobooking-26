import { debounce } from './utils.js';

const DEBOUNCE_DELAY = 500;

const PrisePoint = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const filters = document.querySelector('.map__filters');

const initFilters = (offers, map, renderMarkers) => {
  if (!filters) {
    return;
  }
  const typeFilter = filters.querySelector('#housing-type');
  const priceFilter = filters.querySelector('#housing-price');
  const roomsFilter = filters.querySelector('#housing-rooms');
  const guestsFilter = filters.querySelector('#housing-guests');
  const features = [...filters.querySelectorAll('#housing-features input')];

  const filterByType = (el) => typeFilter.value === 'any'
    || el.offer.type === typeFilter.value;

  const filterByPrice = (el) => {

    switch(priceFilter.value) {
      case 'low':
        return el.offer.price < PrisePoint.MIDDLE;
      case 'middle':
        return el.offer.price >= PrisePoint.MIDDLE
          && el.offer.price < PrisePoint.HIGH;
      case 'high':
        return el.offer.price >= PrisePoint.HIGH;
      default:
        return true;
    }
  };

  const filterByRooms = (el) => roomsFilter.value === 'any'
    || el.offer.rooms.toString() === roomsFilter.value;

  const filterByGuests = (el) => guestsFilter.value === 'any'
    || el.offer.guests.toString() === guestsFilter.value;

  const filterByFeatures = (el) => {

    const selectedFeatures = features
      .filter((elem) => elem.checked)
      .map((item) => item.value);

    if (!selectedFeatures || !selectedFeatures.length) {
      return true;
    }

    for (const feature of selectedFeatures) {
      if (!el.offer.features || !el.offer.features.includes(feature)) {
        return false;
      }
    }

    return true;
  };

  const onFiltersChange = (data) => () => {
    map.closePopup();

    const filteredOffers = data
      .filter(filterByType)
      .filter(filterByPrice)
      .filter(filterByRooms)
      .filter(filterByGuests)
      .filter(filterByFeatures);

    renderMarkers(filteredOffers);
  };

  filters.addEventListener(
    'change',
    debounce(onFiltersChange(offers), DEBOUNCE_DELAY)
  );
};

export { initFilters };
