import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { Link } from 'react-router-dom';
import './Main.css';


const Main = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=1cd1954902587389aee6e928a4cbc11f&language=en-US&page=1`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (searchTerm !== '') {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=1cd1954902587389aee6e928a4cbc11f&language=en-US&query=${searchTerm}&page=1&include_adult=false`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data.results))
        .catch((err) => console.error(err));
    }
  }, [searchTerm]);

  const handleMovieClick = async (movie) => {
    const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=1cd1954902587389aee6e928a4cbc11f&language=en-US`);
    const detailsData = await detailsResponse.json();
    const trailerResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=1cd1954902587389aee6e928a4cbc11f&language=en-US`);
    const trailerData = await trailerResponse.json();
    setClickedMovieDetails({
      id: movie.id,
      details: detailsData,
      trailer: trailerData.results[0]
    });
    setDetailsVisible(true)
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMouseOver = (movie) => {
    setSelectedMovie(movie);
  };

  const handleMouseOut = () => {
    setSelectedMovie(null);
  };

  const handleDetailsClose = () => {
    setDetailsVisible(false);
  };
  
  const [numResultsToShow, setNumResultsToShow] = useState(10);
  const moviesToDisplay = searchTerm === '' ? movies : searchResults.slice(0, 7);
  const [clickedMovieDetails, setClickedMovieDetails] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);


  return (
    <ParallaxProvider>
      <div style={styles.container}>
        <div style={styles.navbar}>
          <Link to="/" style={styles.logo}>
            FilmOn
          </Link>
          <input 
            type="text" 
            placeholder="Search..." 
            style={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm !== '' && searchResults.length > numResultsToShow && (
            <button style={styles.button} onClick={() => setNumResultsToShow(numResultsToShow + 10)}>
              Show more
            </button>
          )}
            <div style={styles.navLinks}>
            <Link to="/" style={styles.navLink}>
              Home
            </Link>
            <Link to="/movies" style={styles.navLink}>
              Movies
            </Link>
            <Link to="/tv-shows" style={styles.navLink}>
              TV Shows
            </Link>
            <Link to="/login" style={styles.navLink}>
              Login
            </Link>
          </div>
        </div>
        <Parallax y={[-20, 20]} tagOuter="figure">
          <div style={styles.titleContainer}>
          {moviesToDisplay.map((movie) => (
            <div 
              key={movie.id} 
              style={styles.movieContainer}
              onMouseEnter={() => handleMouseOver(movie)}
              onMouseLeave={handleMouseOut}
              onClick={() => handleMovieClick(movie)}
            >
              {clickedMovieDetails && clickedMovieDetails.id === movie.id && (  // Only render for the clicked movie
              <div className={detailsVisible ? 'detailsAnimation' : ''}>
                <h1>{clickedMovieDetails.details.title}</h1>
                <p>{clickedMovieDetails.details.overview}</p>
                <iframe 
                  src={`https://www.youtube.com/embed/${clickedMovieDetails.trailer.key}`}
                  title="YouTube video player" 
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  width="560"
                  height="315"
                ></iframe>
                <button onClick={handleDetailsClose}>Close</button>
                </div>
              )}
              <div style={styles.posterContainer}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={styles.poster}
                />
              </div>
              <div className="previewContainer" style={
                selectedMovie === movie
                  ? {...styles.previewContainer, ...styles.previewContainerVisible}
                  : styles.previewContainer
              }>
                <h4>{movie.title}</h4>
                <p>{movie.overview}</p>
              </div>
            </div>
          ))}
          </div>
        </Parallax>
      </div>
    </ParallaxProvider>
  )
}

const styles = {

  searchInput: {
    padding: '5px',
    borderRadius: '4px',
  },
  previewContainer: {
    overflow: 'auto', 
    padding: '20px',
    maxHeight: '260px', 
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    height: '90%',
    background: 'rgba(87, 88, 88, 0.9)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.5s ease',
    zIndex: 10,
    borderRadius: '10px',
    },
  previewContainerVisible: {
    opacity: 1,
  },
  
  container: {
    height: '100vh',
    width: '100%',
    background: '#141414',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    background: '#000',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    gap: '10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    backgroundColor: '#ff4b2b',
    transition: 'background 0.3s ease','&:hover': {
    background: '#ff3300',
    },
    },
    titleContainer: {
      marginBottom: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    movieContainer: {
      position: 'relative',
      marginTop: '20px',
      alignItems: 'center',
      marginBottom: '20px',
      marginLeft: '40px',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
      borderRadius: '10px',
      overflow: 'visible',
      maxWidth: '200px',
      maxHeight: '360px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        '&:hover': {
        transform: 'scale(1.05)',
       },
      },
    poster: {
      width: '200px',
      height: '300px',
      objectFit: 'cover',
      marginRight: '10px',
      borderRadius: '10px',
      position: 'relative',
      zIndex: 2,
    },
    text: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '10px',
      justifyContent: 'center',
    }}
      
    
    export default Main;