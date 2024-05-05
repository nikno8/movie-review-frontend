import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate to handle redirection after deletion
import { Container, Row, Col, Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import ReviewForm from '../reviewForm/ReviewForm';
import api from '../../api/axiosConfig';
import './Reviews.css';
import { jwtDecode } from 'jwt-decode';  // Исправленный импорт jwtDecode


const Reviews = ({ getMovieData, movie}) => {
    const revText = useRef();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null); // Добавить состояние для userId
    const params = useParams();
    const navigate = useNavigate(); // to navigate after actions
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
        fetchReviews(movieId);
        determineUserRole();
    }, [movieId, getMovieData]);

    const determineUserRole = () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded.role); // Устанавливаем роль пользователя
            setUserId(decoded.userId); // Извлечь userId из токена
            console.log("UserRole:", userRole);

        }
    };
    const addToWatchList = async () => {
        if (!userId) {
            alert('Необходима авторизация.');
            navigate('/login');
            return;
        }

        try {
            await api.post(`/api/v1/users/${userId}/watchlist/${movieId}`);
            alert('Фильм добавлен в ваш список для просмотра');
        } catch (error) {
            console.error('Failed to add movie to watchlist:', error);
            alert('Не удалось добавить фильм в список, возможно он уже был добавлен');
        }
    };

    const fetchReviews = async (imdbId) => {
        try {
            const response = await api.get(`/api/v1/reviews/movie/${imdbId}`); // Correct API endpoint to fetch reviews by imdbId
            setReviews(response.data); // Assuming the response directly contains the array of reviews
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };

    const addReview = async (e) => {
        e.preventDefault();
        const reviewBody = revText.current.value;

        try {
            const response = await api.post("/api/v1/reviews", {
                reviewBody: reviewBody,
                rating: rating,
                imdbId: movieId // Passing imdbId to backend for review association
            });

            setReviews(prev => [...prev, { body: reviewBody, rating }]);
            revText.current.value = ""; // Clear text area after submitting
            setRating(0); // Reset rating after submitting
        } catch (err) {
            console.error(err);
        }
    };

    const deleteReview = async (reviewId) => {
        try {
            console.log('Attempting to delete review with ID:)', reviewId);
            await api.delete(`/api/v1/reviews/${reviewId}`);
            setReviews(prev => prev.filter(r => r.id !== reviewId));
        } catch (error) {
            console.error('Failed to delete review:', error);
        }
    };

   
    return (
        <Container>
            <Row>
                <Col><h3>Отзывы</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <div className="movie-poster">
                        <img src={movie?.poster} alt={movie?.title || "Movie Poster"} />
                    </div>
                </Col>
                <Col>
                    {userRole === 'USER' && (
                        <>
                            <ReviewForm
                                handleSubmit={addReview}
                                revText={revText}
                                labelText="Оставьте отзыв"
                                rating={rating}
                                setRating={setRating}
                            />
                            
                           
                        </>
                    )}
                    <hr />
                    {reviews.map((r, index) => (
                        <React.Fragment key={index}>
                            <Row className="review-row">
                                <Col className="review-content">{r.body}</Col>
                            </Row>
                            <Row>
                                <Col>{`Оценка: ${r.rating}`}</Col>
                                {userRole === 'ADMIN' && (
                                    <Button className="delete-button" onClick={() => deleteReview(r.id)}>
                                        Удалить отзыв
                                    </Button>
                                )}
                            </Row>
                            <Row>
                                <Col><hr /></Col>
                            </Row>
                        </React.Fragment>
                    ))}
                     {userRole === 'USER' && (
                        <>
                            <Button variant="primary" onClick={addToWatchList}>
                                Добавить в список для просмотра
                            </Button>
                        </>
                    )}
                </Col>
                
            </Row>
        </Container>
    );
};

export default Reviews;


