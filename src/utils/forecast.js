const request = require('request');

const forecast = (lat, long, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=e74707fb8c377a85629e0f189740a109&units=f&query=' +
    lat +
    ',' +
    long;

  //console.log('url:', url);

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Error: ', body.error, undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '. It is currently ' +
          body.current.temperature +
          ' degrees out. It feels like ' +
          body.current.feelslike +
          ' degrees out.'
      );
    }
  });
};

module.exports = forecast;
