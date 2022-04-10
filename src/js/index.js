import fetchCountries from './fetchCountries';
import '../css/styles.css';
import Notiflix, { Notify } from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
   inputRef: document.querySelector('#search-box'),
   listRef: document.querySelector('.country-list'),
   infoOfCountryRef: document.querySelector('.country-info'),
}

refs.inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));


function onInput(e) {
   const requestText = e.target.value.trim();
   if (requestText.length === 0) {
      return;
   }
   clearMarkup();

   fetchCountries(requestText).then(result => {
      if (result.length <= 10) {
         markupCountryList(result);
      } else {
         Notify.info('Too many matches found. Please enter a more specific name');
      }

      if (result.length === 1) {
         currentCountryInfo(result[0]);
      }         
   })
}

function markupCountryList(countryList) {
   let markup = '';
  countryList.map(country => {
     markup += `<li class="country-item"><img class="country-image"
     src="${country.flags.svg}" alt="${country.name}"><span>${country.name}</span></li>`;
  });
  refs.listRef.innerHTML = markup;
} 

function clearMarkup() {
   refs.listRef.innerHTML = '';
   refs.infoOfCountryRef.innerHTML = '';
}

function currentCountryInfo(country) {   
   let lang = '';
   Object.values(country.languages).map(e => lang += e.name + ', ');   
   lang = lang.slice(0, lang.length - 2);
   let markup = `
     <p><span>Capital</span>: ${country.capital}</p>
     <p><span>Population</span>: ${country.population}</p>
     <p><span>Languages</span>: ${lang}</p>`;
   
   refs.infoOfCountryRef.innerHTML = markup;  
}