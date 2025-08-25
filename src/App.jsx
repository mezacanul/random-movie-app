import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    console.log(API_KEY, BASE_URL);
  }, []);
  

  const fetchRandomMovie = async () => {
    setLoading(true);
    try {
      // Obtener películas populares
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: 'es-ES', // Para críticas en español
          page: Math.floor(Math.random() * 10) + 1, // Página aleatoria (1-10)
        },
      });

      // Filtrar películas con puntuación > 7/10
      const highRatedMovies = response.data.results.filter(
        (movie) => movie.vote_average > 7
      );

      if (highRatedMovies.length === 0) {
        setMovie({ title: 'No se encontraron películas con >7/10 en esta página' });
      } else {
        // Seleccionar una película aleatoria
        const randomMovie = highRatedMovies[Math.floor(Math.random() * highRatedMovies.length)];
        setMovie({
          title: randomMovie.title,
          overview: randomMovie.overview,
          rating: `${randomMovie.vote_average}/10`,
          poster: `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`,
        });
      }
    } catch (error) {
      console.error('Error fetching movie:', error);
      setMovie({ title: 'Error al cargar la película' });
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Generador de Películas Aleatorias</h1>
      <button onClick={fetchRandomMovie} disabled={loading}>
        {loading ? 'Cargando...' : 'Generar Película'}
      </button>
      {movie && (
        <div className="movie">
          <h2>{movie.title}</h2>
          {movie.poster && <img src={movie.poster} alt={movie.title} />}
          <p><strong>Sinopsis:</strong> {movie.overview || 'No disponible'}</p>
          <p><strong>Puntuación:</strong> {movie.rating}</p>
        </div>
      )}
    </div>
  );
}

export default App;
