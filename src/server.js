javascript
Ajuste
Copiar
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.get('/random-movie', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.filmaffinity.com/es/topgen.php');
    const $ = cheerio.load(data);
    const movies = [];
    $('.top-movie').each((i, el) => {
      const title = $(el).find('.mc-title a').text();
      const rating = $(el).find('.avgrat').text();
      movies.push({ title, rating });
    });
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    res.json(randomMovie);
  } catch (error) {
    res.status(500).send('Error fetching movie');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));