import axios from 'axios';

const BASE_URL = `https://api.thecatapi.com/v1/`;
axios.defaults.headers.common['x-api-key'] =
  'live_icm1GCVwjCYsiZDr2jieZaw0CYZp62lKBeAX40dJr4XgKQxo0FhDnwQaWbzMWYpI';

function fetchBreeds() {
  return axios.get(`${BASE_URL}breed`).then(response => {
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    });
}

export { fetchBreeds };
export { fetchCatByBreed };
