import SlimSelect from 'slim-select';
import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_icm1GCVwjCYsiZDr2jieZaw0CYZp62lKBeAX40dJr4XgKQxo0FhDnwQaWbzMWYpI';

let breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');

loader.textContent = '';

createBreeds();

function createBreeds() {
  fetchBreeds().then(data => {
    let selectData = data.map(item => ({
      text: item.name,
      value: item.id,
    }));
    const select = new SlimSelect({
      select: '.breed-select',
      data: selectData,
    });
    selectBreed();
  });
}

function selectBreed() {
  new SlimSelect({
    select: '.breed-select',
    events: {
      afterChange: newVal => {
        fetchCatByBreed(newVal[0].value);
      },
    },
  });
}

function addContent() {
  new SlimSelect({
    select: '.breed-select',
    events: {
      afterClose: () => {
        fetchCatByBreed().then(response => {
          console.log(response);
        });
      },
    },
  });
}
