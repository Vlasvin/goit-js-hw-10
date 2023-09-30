import SlimSelect from 'slim-select';
import axios from 'axios';
import API from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_icm1GCVwjCYsiZDr2jieZaw0CYZp62lKBeAX40dJr4XgKQxo0FhDnwQaWbzMWYpI';

let breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

const api_key =
  'live_icm1GCVwjCYsiZDr2jieZaw0CYZp62lKBeAX40dJr4XgKQxo0FhDnwQaWbzMWYpI';

const select = new SlimSelect({
  select: '.breed-select',
  data: [{ text: 'Value 1' }, { text: 'Value 2' }, { text: 'Value 3' }],
  breeds: [],
});
let option = select.store.data;
console.log(select.store.data[0].value);
fetchBreeds();
function fetchBreeds() {
  fetch('https://api.thecatapi.com/v1/breeds/', {
    headers: {
      'x-api-key': api_key,
    },
  }).then(response => {
    console.log(response.json);

    return response.json().then(data => {
      console.log(data);
      option = option.concat(data);
      // for (let i = 0; i < data.length; i + 1) {
      //   //  = i.name;
      //   console.log();
      //   // option.value = breed.id;
      // }
      console.log(option);
    });
  });
}
// .then(data => {
//   console.log(data);
// });
//   axios
//     .get('${BASE_URL}breeds/')
//     .then(response => {
//       console.log(response);
//       return response.data;
//     })
//     .then(function (data) {
//       //   console.log(data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

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
