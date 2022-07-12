import { activateMapFilters, activateAdFormElements } from './modules/utils.js';
import { initMap } from './modules/map.js';
import { initForm } from './modules/form.js';

window.addEventListener('DOMContentLoaded', () => {
  activateMapFilters(false);
  activateAdFormElements(false);
  initMap();
  initForm();
});
