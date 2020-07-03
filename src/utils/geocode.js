const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?limit=1&access_token=pk.eyJ1IjoiazJtaWEiLCJhIjoiY2tieHc2amxkMGptazJ5cXFtMHdlbmR4aiJ9.SucJF8oDt0akaqONc_LUWg';

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to the mapbox api!', undefined);
    } else if (body.message) {
      //console.log('err1', body.message);
      callback('Error: ' + body.message, undefined);
    } else if (body.features.length == 0) {
      //console.log('err2', body);
      callback('Unable to find location, try another search...', undefined);
    } else {
      const feat = body.features[0];
      const center = feat.center;
      const lat = center[1];
      const long = center[0];
      const place = feat.place_name;
      callback(undefined, {
        latitude: lat,
        longitude: long,
        location: place,
      });
    }
  });
};

module.exports = geocode;
