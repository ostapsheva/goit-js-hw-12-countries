import refs from './refs.js';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import countriesNameList from '../templates/countriesNameList.hbs';
import countryFullInfo from '../templates/countryFullInfo.hbs';
import fetchCountries from './fetchCountries.js';

require('lodash');

function addMarkup() {
  const searchQuery = refs.input.value;
  if (searchQuery) {
    return fetchCountries(searchQuery).then(data => {
      if (data.length === 1) {
        refs.result.innerHTML = countryFullInfo(data);
      } else if (data.length <= 10) {
        refs.result.innerHTML = countriesNameList(data);
      } else if (data.length > 10) {
        error({
          title: 'Too many matches found. Please enter a more specific query!',
          delay: 2000,
        });
        refs.result.innerHTML = '';
      } else {
        error({
          title: 'Country not found :(',
          delay: 1500,
        });
        refs.result.innerHTML = '';
      }
    });
  } else {
    refs.result.innerHTML = '';
  }
}

refs.input.addEventListener('input', _.debounce(addMarkup, 500));
