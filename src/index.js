import SlimSelect from 'slim-select';
import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_icm1GCVwjCYsiZDr2jieZaw0CYZp62lKBeAX40dJr4XgKQxo0FhDnwQaWbzMWYpI';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');

loader.textContent = '';
error.textContent = '';

offSelect();
createBreeds();

function createBreeds() {
  fetchBreeds()
    .then(data => {
      let selectData = data.map(item => ({
        text: item.name,
        value: item.id,
      }));
      onSelect();
      const select = new SlimSelect({
        select: '.breed-select',
        data: selectData,
      });
      selectBreed();
      offLoader();
    })
    .catch(data => {
      offLoader();
      onError();
    });
}

function selectBreed() {
  new SlimSelect({
    select: '.breed-select',
    events: {
      afterChange: newVal => {
        offContent();
        onLoader();

        fetchCatByBreed(newVal[0].value)
          .then(response => {
            addContent(response);
          })
          .catch(response => {
            offSelect();
            offLoader();
            onError();
          });
      },
    },
  });
}

function addContent(response) {
  response.forEach(cat => {
    const name = cat.breeds[0].name;
    const description = cat.breeds[0].description;
    const temperament = cat.breeds[0].temperament;
    const imageUrl = cat.url;

    catInfo.innerHTML = `
    <img src="${imageUrl}" alt="Cat Photo">
    <div>
     <h2>${name}</h2>
      <p>${description}</p>
      <p>Temperament: ${temperament}</p></div>
    `;
    catInfo.style.cssText = 'display: flex; gap:40px';
    catInfo.querySelector('div').classList.add('content-text');
    catInfo.querySelector('img').style.cssText = 'width: 700px; height: 600px;';
    offLoader();
    onContent();
  });
}

function offLoader() {
  loader.style.display = 'none';
}
function offContent() {
  catInfo.style.display = 'none';
}
function offSelect() {
  breedSelect.style.display = 'none';
}

function onLoader() {
  loader.style.display = 'inline-block';
}
function onContent() {
  catInfo.style.display = 'flex';
}
function onSelect() {
  breedSelect.style.display = 'flex';
}
function onError() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!',
    {
      position: 'center-center',
      timeout: 5000,
    }
  );
}
