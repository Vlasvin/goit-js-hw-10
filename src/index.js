import SlimSelect from 'slim-select';
import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_icm1GCVwjCYsiZDr2jieZaw0CYZp62lKBeAX40dJr4XgKQxo0FhDnwQaWbzMWYpI';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');

loader.textContent = '';
error.textContent = '';

toggleSelect(false);
createBreeds();

function createBreeds() {
  fetchBreeds()
    .then(data => {
      let selectData = data.map(item => ({
        text: item.name,
        value: item.id,
      }));
      toggleSelect(true);
      const select = new SlimSelect({
        select: '.breed-select',
        data: selectData,
      });
      selectBreed();
      toggleLoader(false);
    })
    .catch(data => {
      toggleLoader(false);
      showErrorNotification();
    });
}

function selectBreed() {
  new SlimSelect({
    select: '.breed-select',
    events: {
      afterChange: newVal => {
        toggleContent(false);
        toggleLoader(true);

        fetchCatByBreed(newVal[0].value)
          .then(response => {
            if (response[0] !== undefined) {
              addContent(response);
            } else {
              throw new Error();
            }
          })
          .catch(response => {
            toggleLoader(false);
            showErrorNotification();
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
    toggleLoader(false);
    toggleContent(true);
  });
}

function toggleElementDisplay(element, displayValue) {
  element.style.display = displayValue;
}

function toggleLoader(showLoader) {
  toggleElementDisplay(loader, showLoader ? 'inline-block' : 'none');
}

function toggleContent(showContent) {
  toggleElementDisplay(catInfo, showContent ? 'flex' : 'none');
}

function toggleSelect(showSelect) {
  toggleElementDisplay(breedSelect, showSelect ? 'flex' : 'none');
}

function showErrorNotification() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!',
    {
      position: 'center-center',
      timeout: 5000,
    }
  );
}
