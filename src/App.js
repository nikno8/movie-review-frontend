
// src/App.js
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './components/home/Home';
import Header from './components/header/Header';
import UserList from './components/userBan/UserList';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import api from './api/axiosConfig';
import WatchList from './components/watchList/WatchList';

function App() {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);

    const getMovies = async () => {
        try {
            const response = await api.get("/api/v1/movies");
            setMovies(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getMovieData = async (movieId) => {
        try {
            const response = await api.get(`/api/v1/movies/${movieId}`);
            const singleMovie = response.data;
            setMovie(singleMovie);
            setReviews(singleMovie.reviews || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <AuthProvider>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/login" element={<Login />} />
                        <Route index element={<Home movies={movies} />} />
                        <Route path="/admin/users" element={<UserList />} />
                        <Route path="/watchList" element={<WatchList />} />
                        <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
                        <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/register" element={<Registration />} />
                    </Route>
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
