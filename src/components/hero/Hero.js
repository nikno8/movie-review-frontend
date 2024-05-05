import React, { useEffect, useState } from 'react';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import api from '../../api/axiosConfig';  // Make sure this is the correct path to your axiosConfig

const Hero = ({ movies }) => {
    const navigate = useNavigate();
    const [moviesWithRatings, setMoviesWithRatings] = useState([]);

    useEffect(() => {
        const fetchRatingsAndSetMovies = async () => {
            try {
                const updatedMovies = await Promise.all(movies.map(async (movie) => {
                    const response = await api.get(`/api/v1/reviews/average/${movie.imdbId}`); // Use the api instance
                    return { ...movie, averageRating: response.data };
                }));
                setMoviesWithRatings(updatedMovies);
            } catch (error) {
                console.error("Failed to fetch movie ratings:", error);
            }
        };
    
        if (movies && movies.length) {
            fetchRatingsAndSetMovies();
        }
    }, [movies]);
    
    function reviews(movieId) {
        navigate(`/Reviews/${movieId}`);
    }

    return (
        <div className='movie-carousel-container'>
            <Carousel>
                {moviesWithRatings.map((movie) => (
                    <Paper key={movie.imdbId}>
                        <div className='movie-card-container'>
                            <div className="movie-card" style={{"--img": `url(${movie.backdrops[0]})`}}>
                                <div className="movie-detail">
                                    <div className="movie-poster">
                                        <img src={movie.poster} alt={movie.title} />
                                    </div>
                                    <div className="movie-title">
                                        <h4 className = "movie-header">{movie.title}</h4>
                                        <p className="movie-release-date">Дата выхода: {movie.releaseDate}</p>
                                        <div className="movie-genres">
                                                {movie.genres.map((genre, index) => (
                                                    <span key={index}>{genre}<br /></span>
                                                ))}
                                            </div>
                                        <div className="average-rating">
                                            <strong>Средний рейтинг: {movie.averageRating?.toFixed(1)}</strong>
                                        </div>
                                    </div>
                                    <div className="movie-buttons-container">
                                        <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                            <div className="play-button-icon-container">
                                                <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} />
                                            </div>
                                        </Link>
                                        <Button variant="info" onClick={() => reviews(movie.imdbId)}>Отзывы</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                ))}
            </Carousel>
        </div>
    );
}

export default Hero;
