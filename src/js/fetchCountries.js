import Notiflix, { Notify } from 'notiflix';

export default function fetchCountries(name) {
   return fetch(`https://restcountries.com/v2/name/${name}/?fields=name,capital,population,flags,languages`)
      .then(r => {
         if (!r.ok) {
            throw new Error(r.status);
         }
         return r.json();
      }).catch(() => Notify.failure('Oops, there is no country with that name'));
} 
