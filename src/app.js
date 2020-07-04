const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Setup paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
const port = process.env.PORT || 3000;

// Setup section for view engine and handlebars
app.set('view engine', 'hbs'); // Set templating engine for express
app.set('views', viewsPath); // Tell express where view templates are
hbs.registerPartials(partialsPath); // Tell hbs where partials live

app.use(express.static(publicPath)); // Setup express public folder for static html files

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Icculus',
    header: 'The Weather App About Page',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Weather App Help Page',
    header: 'The Weather App Help Page',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Please provide an address' });
  }

  const address = req.query.address;

  geocode(address, (err, { latitude, longitude, location } = {}) => {
    //console.log('Error received: ', err);
    //console.log('Data received: ', data);
    if (err) {
      return res.send({ error: err });
    }

    if (latitude && longitude) {
      forecast(latitude, longitude, (err, forecastData) => {
        //console.log('Error received: ', err);
        if (err) {
          return res.send({ error: err });
        }

        res.send({
          address: address,
          location: location,
          forecast: forecastData,
        });
      });
    }
  });
});

// Create 404 routes - * matches any route not already matched
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help article not Found',
    message: 'The help article specified was not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page not Found',
    message: 'The page you are looking for does not exist',
  });
});

app.listen(port, () => {
  console.log('Server up on port ' + port);
});
