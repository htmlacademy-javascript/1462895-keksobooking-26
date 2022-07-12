import {
  activateMapFilters, activateAdFormElements, getRandomArrayElements,
  showAlert } from './utils.js';
import { getData } from './api.js';
import { createBaloon } from './create-baloon.js';

const MAX_OFFERS = 10;

const DEFAULT_MAP_COORDS = {
  lat: 35.675,
  lng: 139.75,
};

const DEFAULT_MAP_SCALE = 13;

const MAP_SETTINGS = {
  layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};

const PIN = {
  main: {
    width: 52,
    height: 52,
  },
  offer: {
    width: 40,
    height: 40,
  },
};

const mapCanvas = document.querySelector('#map-canvas');
const addressInput = document.querySelector('#address');

let currentOffers;

const renderMarkers = (map, icon, offers) => {
  offers.forEach((offer) => {
    const {
      location: {
        lat,
        lng,
      } } = offer;

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(createBaloon(offer));
  });
};

const setDefaultAddress = () => {
  addressInput.value = `${DEFAULT_MAP_COORDS.lat}, ${DEFAULT_MAP_COORDS.lng}`;
};

const resetMainPinMarker = () => {
  window.mainPinMarker.setLatLng(DEFAULT_MAP_COORDS);
};

const initMap = () => {
  if (!mapCanvas) {
    return;
  }

  const map = L.map('map-canvas')
    .on('load', () => {
      activateMapFilters(true);
      activateAdFormElements(true);
    })
    .setView(DEFAULT_MAP_COORDS, DEFAULT_MAP_SCALE);

  L.tileLayer(MAP_SETTINGS.layer, MAP_SETTINGS.attribution).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [PIN.main.width, PIN.main.height],
    iconAnchor: [PIN.main.width / 2, PIN.main.height],
  });

  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [PIN.offer.width, PIN.offer.height],
    iconAnchor: [PIN.offer.width / 2, PIN.offer.height],
  });

  const mainPinMarker = L.marker(
    DEFAULT_MAP_COORDS,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  window.map = map;
  window.mainPinMarker = mainPinMarker;

  setDefaultAddress(addressInput.value);

  mainPinMarker.addTo(map);

  const onSuccessGetOffers = (offers) => {
    currentOffers = offers;

    renderMarkers(map, pinIcon, getRandomArrayElements(currentOffers, MAX_OFFERS));
  };

  const onFailGetOffers = (msg) => {
    showAlert(msg);
  };

  getData(onSuccessGetOffers, onFailGetOffers);

  mainPinMarker.on('drag', ({ target }) => {
    const { lat, lng } = target.getLatLng();

    addressInput.value = `${lat}, ${lng}`;
  });
};

export { setDefaultAddress, resetMainPinMarker, initMap };
