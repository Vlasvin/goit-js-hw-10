import SlimSelect from 'slim-select';
import axios from 'axios';

// const api_key =
//   'live_icm1GCVwjCYsiZDr2jieZaw0CYZp62lKBeAX40dJr4XgKQxo0FhDnwQaWbzMWYpI';

axios.defaults.headers.common['x-api-key'] =
  'live_icm1GCVwjCYsiZDr2jieZaw0CYZp62lKBeAX40dJr4XgKQxo0FhDnwQaWbzMWYpI';
function fetchBreeds() {
  // fetch('https://api.thecatapi.com/v1/breeds/', {
  //   headers: {
  //     'x-api-key': api_key,
  //   },
  // }).then(response => {
  //   console.log(response);
  //   return response.json();
  // });
  // .then(data => {
  //   console.log(data);
  // });
  axios
    .get('${BASE_URL}breeds/')
    .then(response => {
      console.log(response);
      return response.data;
    })
    .then(function (data) {
      //   console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
// export { fetchBreeds };

//   let storedBreeds = [];

//       storedBreeds = data;
//       return;
//   for (let i = 0; i < storedBreeds.length; i++) {
//     const breed = storedBreeds[i];
//     let option = document.createElement('option');
//     // console.log(breed);
//     console.log(fetchBreeds.data);

//     data.value = `${breed.id}`;
//     data.text = `${breed.name}`;
//     // console.log(data);
//     document.querySelector('.breed-select').append(option);
//   }
//     })

//     .catch(error => {
//       console.log(error);
//     });
// }
