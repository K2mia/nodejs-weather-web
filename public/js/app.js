console.log('Loaded js/app.js');

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//   res.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch('http://localhost:3000/weather?address=12what').then((res) => {
//   res.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location, data.forecast);
//     }
//   });
// });

const weatherForm = document.querySelector('form'); // Create variable from form element
const search = document.querySelector('input'); // Create variable from input element

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  document.querySelector('#weather-div').innerHTML = 'Loading...';

  fetch('/weather?address=' + search.value).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        document.querySelector('#weather-div').innerHTML = data.error;
      } else {
        document.querySelector('#weather-div').innerHTML =
          '<b>Location: </b>' +
          data.location +
          '<br /><b>Forecast: </b>' +
          data.forecast;
      }
    });
  });
});
