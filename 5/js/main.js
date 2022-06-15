import { createOffers } from './modules/data.js';
import { createOfferCard } from './modules/create-offer-card.js';

window.addEventListener('DOMContentLoaded', () => {
  const map = document.querySelector('#map-canvas');
  const offers = createOffers();
  const [ offer ] = offers;

  map.append(createOfferCard(offer));
});
