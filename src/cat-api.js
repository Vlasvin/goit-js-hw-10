import SlimSelect from 'slim-select';
import axios from 'axios';

const BASE_URL = `https://api.thecatapi.com/v1/`;
axios.defaults.headers.common['x-api-key'] =
  'live_icm1GCVwjCYsiZDr2jieZaw0CYZp62lKBeAX40dJr4XgKQxo0FhDnwQaWbzMWYpI';

function fetchBreeds() {
  return axios
    .get(`${BASE_URL}breeds`)
    .then(response => {
      return response.data;
    })
    .catch(response => {
      console.log(Error);
    });
}
function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}images/search?breed_ids=${breedId}`)
    .then(response => {
      // console.log(response.data);
      return response.data;
    });
}

export { fetchBreeds };
export { fetchCatByBreed };
