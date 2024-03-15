import React, { useEffect, useState } from 'react';
import { API_KEY, imageURL } from '../../Constants/Constants';
import Youtube from 'react-youtube';
import './Banner.css';
import axios from '../../Axios';

function Banner() {
  const [movie, setMovie] = useState(null);
  const [urlId, setUrlId] = useState('');

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        console.log(response.data.results[0]);
        const randomNumber = Math.floor(Math.random() * 20);
        setMovie(response.data.results[randomNumber]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const opts = {
    height: '290',
    width: '40%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handlePlayButtonClick = () => {
    axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0].key);
        } else {
          console.log('Array is empty');
        }
      })
      .catch((error) => {
        console.error('Error fetching video data:', error);
      });
  };

  return (
    <div style={{backgroundImage: `url(${movie ? imageURL + movie.backdrop_path : ''})`}} className="banner">
      <div className="content">
        <h1 className="title">{movie ? movie.title : ''}</h1>
        <div className="banner_buttons">
          <button onClick={handlePlayButtonClick} className="button">Play</button>
          <button className="button">My List</button>
        </div>
        {urlId ? (
          <Youtube opts={opts} videoId={urlId} />
        ) : (
          <div>
            <h1 className="description">{movie ? movie.overview : ''}</h1>
          </div>
        )}
      </div>
      <div className="fade"></div>
    </div>
  );
}

export default Banner;
