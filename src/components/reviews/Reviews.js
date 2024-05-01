import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import api from '../../api/axiosConfig';
import './Reviews.css';

const Reviews = ({ getMovieData, movie }) => {
    const revText = useRef();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0); // Initialize rating state to 0
    let params = useParams();
    const movieId = params.movieId; // this is the imdbId passed from the route

    useEffect(() => {
        getMovieData(movieId); // This function should now expect imdbId to fetch movie data
        fetchReviews(movieId);  // Fetch reviews when the component mounts
    }, [movieId, getMovieData]);

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

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <div className="movie-poster">
                        <img src={movie?.poster} alt={movie?.title || "Movie Poster"} />
                    </div>
                </Col>
                <Col>
                    <ReviewForm
                        handleSubmit={addReview}
                        revText={revText}
                        labelText="Write a Review?"
                        rating={rating}
                        setRating={setRating}
                    />
                    <hr />
                    {reviews.map((r, index) => (
                        <React.Fragment key={index}>
                            <Row>
                                <Col>{r.body}</Col>
                            </Row>
                            <Row>
                                <Col>{`Rating: ${r.rating}`}</Col>
                            </Row>
                            <Row>
                                <Col><hr /></Col>
                            </Row>
                        </React.Fragment>
                    ))}
                </Col>
            </Row>
        </Container>
    );
    
};

export default Reviews;

