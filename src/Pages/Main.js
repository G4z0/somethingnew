import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { Link } from 'react-router-dom';
import './Main.css';
import Logout from './LogOut';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';



const Main = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=1cd1954902587389aee6e928a4cbc11f&language=en-US&page=1`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results.slice(0, 6)))
  }, []);

  useEffect(() => {
    if (searchTerm !== '') {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=1cd1954902587389aee6e928a4cbc11f&language=en-US&query=${searchTerm}&page=1&include_adult=false`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data.results))
    }
  }, [searchTerm]);

  const handleMovieClick = async (movie) => {
    const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=1cd1954902587389aee6e928a4cbc11f&language=en-US`);
    const detailsData = await detailsResponse.json();
    const trailerResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=1cd1954902587389aee6e928a4cbc11f&language=en-US`);
    const trailerData = await trailerResponse.json();
    
    let fullMovieDetails;
  
    if (trailerData.results.length > 0) {
      console.log("Trailer key: ", trailerData.results[0].key);
      fullMovieDetails = {
        ...movie,
        details: detailsData,
        trailer: trailerData.results[0] 
      };
    } else {
      fullMovieDetails = {
        ...movie,
        details: detailsData,
        trailer: null,
        noTrailerMessage: "Sorry, no trailer is available for this movie."
      };
    }
  
    setSelectedMovie(fullMovieDetails);
    setDetailsVisible(true);
  };
  
  useEffect(() => {
    const titleContainer = document.getElementById("titleContainer");
    if (titleContainer) {
      titleContainer.addEventListener("wheel", (e) => {
        e.preventDefault();
        titleContainer.scrollLeft += e.deltaY;
      });
    }
  }, []);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDetailsClose = () => {
    setDetailsVisible(false);
    setSelectedMovie(null);  
  };
  
  const moviesToDisplay = searchTerm === '' ? movies : searchResults.slice(0, 15);

  return (
    <ParallaxProvider>
      <div 
      // @ts-ignore
      style={styles.container}>
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
           
            <div style={styles.navLinks}>
            
            <Link to="/home" style={styles.navLink}>
              Home
            </Link>
            <Link to="/main" style={styles.navLink}>
              Movies
            </Link>
            <Link to="/login" style={styles.navLink}>
              Login
            </Link>
            <Logout/>
          </div>
        </div>
        <div className="textContainer">
        <h1 className={showText ? 'fadeIn' : 'invisibleText'}>Hello! Did you know that you can watch a trailer? Choose a poster and click on it!</h1>
        </div>
        {selectedMovie && selectedMovie.details && (
          <div className={detailsVisible ? 'detailsAnimation' : ''} style={styles.detailsContainer}>
            <h1>{selectedMovie.details.title}</h1>
            <p style={styles.pInfo}> {selectedMovie.details.overview}</p>
            <button css={css`
            position: relative;
            top: 50px;
            left: 485px;
            background: #ff4b2b;
            color: white;
            border: none;
            border-radius: 15%;
            height: 50px;
            width: 130px;
            text-align: center;
            line-height: 22px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            transition: transform 0.3s ease, background 0.3s ease;
            &:hover {
              transform: scale(1.2);
              background: #aa1111;
            }
          `}
          onClick={handleDetailsClose}
        >
          Close Player
        </button>  
            {selectedMovie.trailer ? (
              <iframe 
                src={`https://www.youtube.com/embed/${selectedMovie.trailer.key}`}
                title="YouTube video player" 
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                width="1000"
                height="500"
              ></iframe>
            ) : (
              <p>{selectedMovie.noTrailerMessage}</p>
            )}
          </div>
        )}

        <figure>
          <Parallax y={[-20, 20]}>
            <div id="titleContainer" style={styles.titleContainer}>
              {moviesToDisplay.map((movie) => (
                <div 
                  key={movie.id} 
                  style={styles.movieContainer}
                  onClick={() => handleMovieClick(movie)}
                >
                  <div style={styles.posterContainer}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      style={styles.poster}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Parallax>
        </figure>
      </div>
    </ParallaxProvider>
  )
}

const styles = {
  button:{
    background: '#ff4b2b',
    color: 'white',
    border: 'none',
    textAlign: 'center',
    lineHeight: '22px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '15%',
    padding: '4px',
  },

  pInfo: {
    maxWidth: '55%',
  },

  searchInput: {
    padding: '10px',
    borderRadius: '20px',
    justifyContent: 'left',
    alignItems: 'left',
    marginLeft: '66px',
    outline: 'none',
    border: 'none',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
    '&:focus': {
        boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.2)',
        transform: 'scale(1.02)'
    },
    '&::placeholder': {
        color: '#bbb',
        opacity: 1
    },
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
    '&::-webkit-scrollbar': {
          display: 'none'
        },
    },

  previewContainerVisible: {
    opacity: 1,
    '&::-webkit-scrollbar': {
          display: 'none'
        },
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
    '&::-webkit-scrollbar': {
          display: 'none'
        },
  },

  navbar: {
    alignItems: 'center',
    height: '70px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    background: '#000',
  },

  logo: {
    marginLeft: '10px',
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },

  navLinks: {
    display: 'flex',
    gap: '15px',
    width: '400px',
    marginLeft: '55%',
  },

  navLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    backgroundColor: '#ff4b2b',
    transition: 'background 0.3s ease','&:hover': {
    background: '#ff3300',
    }},

    titleContainer: {
      whiteSpace: 'nowrap',
      marginBottom: '40px',
      scrollBehavior: 'smooth',
      overflowX: 'hidden', // Make this scroll
      overflowY: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'inherit',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',  
      WebkitScrollbar: 'none',
      '&::-webkit-scrollbar': {
          display: 'none'
      },
    },
    
    movieContainer: {
      display: 'inline-flex',
      whiteSpace: 'nowrap',
      paddingTop: '60px',
      position: 'relative',
      alignItems: 'center',
      marginBottom: '20px',
      marginLeft: '40px',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
      borderRadius: '10px',
      overflowX: 'hidden',
      overflowY: 'hidden',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      scrollbarWidth: 'none', // Firefox
  '-ms-overflow-style': 'none', // IE and Edge
  '&::-webkit-scrollbar': {
    display: 'none', // Chrome, Safari and Opera
  },
      '&:hover': {
        transform: 'scale(1.05)',
      },
      minWidth: '200px',  // Add minimum width to prevent squishing
      minHeight: '300px', // Add minimum height to prevent squishing
    },
      
    poster: {
      width: '100%', // Make the poster take full width of its container
      height: '100%', // Make the poster take full height of its container
      objectFit: 'cover', // Change to cover so it scales correctly
      marginRight: '10px',
      borderRadius: '10px',
      position: 'relative',
      zIndex: 2,
    },
      
    detailsContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '10px',
      justifyContent: 'center',
    }
  }
      
    
    export default Main;