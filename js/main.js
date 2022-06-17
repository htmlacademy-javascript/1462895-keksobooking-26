import { createOffers } from './modules/data.js';
import { createOfferCard } from './modules/create-offer-card.js';
import { activateInterface } from './modules/form.js';

window.addEventListener('DOMContentLoaded', () => {
  const map = document.querySelector('#map-canvas');
  const offers = createOffers();
  const [ offer ] = offers;

  map.append(createOfferCard(offer));

  setTimeout(activateInterface, 2000, true);
  setTimeout(activateInterface, 6000, false);
});
