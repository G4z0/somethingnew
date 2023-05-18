import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=1cd1954902587389aee6e928a4cbc11f&language=en-US&page=1`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ParallaxProvider>
      <div style={styles.container}>
        <div style={styles.navbar}>
          <Link to="/" style={styles.logo}>
            FilmOn
          </Link>
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
        <Parallax y={[20, -20]} tagOuter="figure">
          <div style={styles.titleContainer}>
            {movies.map((movie) => (
              <div key={movie.id} style={styles.movieContainer}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={styles.poster}
                />
                <h3 style={styles.text}>{movie.title}</h3>
              </div>
            ))}
          </div>
          <div style={styles.title}>
            <h2 style={styles.infoLogin}>Wanna see more? Make sure to login!</h2>
          </div>
          <div style={styles.bottomContainer}>
            <div style={styles.textBlock}>
              <p style={styles.infoText}>Discover the latest movies</p>
            </div>
            <div style={styles.textBlock}>
              <p style={styles.infoText}>Explore a wide range of genres</p>
            </div>
            <div style={styles.textBlock}>
              <p style={styles.infoText}>Create a personalized watchlist</p>
            </div>
            <div style={styles.textBlock}>
              <p style={styles.infoText}>Discover the latest movies</p>
            </div>
            <div style={styles.textBlock}>
              <p style={styles.infoText}>Create a personalized watchlist</p>
            </div>
          </div>
        </Parallax>
      </div>
    </ParallaxProvider>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    background: '#141414',
    display: 'flex',
    flexDirection: 'column',  // Ensures content is vertical
    overflow: 'auto',  // Allows scrolling
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
  },
  navbar: {
    position: 'fixed', 
    top: '0', 
    left: '0', 
    width: '100%', 
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    background: '#000',
    alignItems: 'center',
    zIndex: '1000', 
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
    marginRight: '20px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    backgroundColor: '#ff4b2b',
    transition: 'background 0.3s ease',
    '&:hover': {
      background: '#ff3300',
    },
  },
  titleContainer: {
    marginTop: '80px', // Compensate for the fixed navbar
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',  // Allows movie posters to wrap to new lines
  },
  movieContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    borderRadius: '10px',
    overflow: 'hidden',
    maxWidth: '200px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  poster: {
    width: '200px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  text: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '10px',
    textAlign: 'center',  // Centers text
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',  // Allows text blocks to wrap to new lines
    marginTop: '20px',
  },
  textBlock: {
    backgroundImage: 'url(https://png.pngtree.com/background/20210716/original/pngtree-white-abstract-vector-web-background-design-picture-image_1354906.jpg)', // replace with your image url
    backgroundSize: 'cover', // this will make sure the image covers the whole div
    backgroundRepeat: 'no-repeat', // this will prevent the image from repeating
    backgroundPosition: 'center', // this will center the image
    width: '200px',
    height: '200px',
    margin: '20px',  // Adds margin to individual blocks
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
    transform: 'scale(1.5)',
    },
    },
    infoText: {
      padding: '10px',
      color: '#000', // white color, you can adjust as you see fit
      fontFamily: 'Arial, sans-serif', // set the font family, you can adjust as you see fit
      fontSize: '16px', // set the font size, you can adjust as you see fit
      lineHeight: '24px', // set the line height, you can adjust as you see fit
      textAlign: 'center', // center the text
    },
    infoLogin: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#fff',
    textAlign: 'center',
    },
        buttonContainer: {
          display: 'flex',
          justifyContent: 'center',
        },
        button: {
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px',
          background: '#ff4b2b',
          color: '#fff',
          border: 'none',
          transition: 'background 0.3s ease',
          '&:hover': {
            background: '#ff3300',
          },
        },
      };
      
    
    export default Home;