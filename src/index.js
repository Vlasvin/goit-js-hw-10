import SlimSelect from 'slim-select';
import axios from 'axios';
import Notiflix from 'notiflix';
import API from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_icm1GCVwjCYsiZDr2jieZaw0CYZp62lKBeAX40dJr4XgKQxo0FhDnwQaWbzMWYpI';
const api_key =
  'live_icm1GCVwjCYsiZDr2jieZaw0CYZp62lKBeAX40dJr4XgKQxo0FhDnwQaWbzMWYpI';

let breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');

loader.textContent = '';
loader.classList.add('hidden');
let selectData = [];

const select = new SlimSelect({
  select: '.breed-select',
  data: selectData,
});
let option = select.store.data;
console.log(select);

axios
  .get('https://api.thecatapi.com/v1/breeds/')
  .then(response => {
    console.log(response);
    return response.data;
  })
  .then(function (data) {
    console.log(data);
    selectData = data.map(item => ({
      text: item.name,
      value: item.id,
    }));
    console.log(selectData);
  });
// fetchBreeds();
// function fetchBreeds() {
//   fetch('https://api.thecatapi.com/v1/breeds/', {
//     headers: {
//       'x-api-key': api_key,
//     },
//   })
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       selectData = data.map(item => ({
//         text: item.name,
//         value: item.id,
//       }));
//       console.log(data);
//     });
// }
// .then(data => {
//   console.log(data);
// });

// API.fetchBreeds().then(createBreeds);
// .catch(response=>{console.log(ERROR)})

// function createBreeds() {}
// }
//   //   function fetchBreeds() {
//   fetch(baseURL, {
//     headers: {
//       'x-api-key': api_key,
//     },
//   })

// const select = new SlimSelect({
//   select: '.breed-select',
//   data: [],
// });
// let promise = new Promise(resolve => {});
// fetchBreeds();
// breedSelect.setAttribute('aria-hidden', 'false');
// breedSelect.style.display = 'block';
// const sss = ['rrrr', 'dddd', 'yyyy'];

// // select.setData(fetchBreeds);
// console.log(select);
// console.log(select.selectEl.value);
// function showBreedImage(index) {}
