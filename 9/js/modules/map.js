import { activateMapFilters, activateAdFormElements } from './utils.js';
import { createOffers } from './data.js';
import { createBaloon } from './create-baloon.js';

const DEFAULT_MAP_COORDS = {
  lat: 35.675,
  lng: 139.75,
};
const DEFAULT_MAP_SCALE = 13;

const mapCanvas = document.querySelector('#map-canvas');
const addressInput = document.querySelector('#address');

const offers = createOffers(10);

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

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const mainPinMarker = L.marker(
    DEFAULT_MAP_COORDS,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

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
        icon: pinIcon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(createBaloon(offer));
  });

  mainPinMarker.on('moveend', ({ target }) => {
    addressInput.value = `${target.getLatLng().lat}, ${target.getLatLng().lng}`;
  });
};

export { initMap };
