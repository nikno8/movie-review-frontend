import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';  // Убедитесь, что импорт правильный, должно быть 'import jwtDecode from "jwt-decode";'
import api from '../../api/axiosConfig';
import './WatchList.css';
import Button from 'react-bootstrap/Button';

const WatchList = () => {
    const [watchList, setWatchList] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded.role);
            setUserId(decoded.userId);
            if (decoded.role === 'USER') {
                fetchWatchList(decoded.userId);
            }
        }
    }, []);

    const fetchWatchList = async (userId) => {
        try {
            const response = await api.get(`/api/v1/users/${userId}/watchlist`);
            setWatchList(response.data);
        } catch (error) {
            console.error('Failed to fetch watchlist:', error);
        }
    };

    const handleRemoveFromWatchList = async (movieId) => {
        try {
            await api.delete(`/api/v1/users/${userId}/watchlist/${movieId}`);
            setWatchList(prevList => prevList.filter(movie => movie.imdbId !== movieId));
            // alert('Фильм удален из списка просмотра');
        } catch (error) {
            console.error('Failed to remove movie from watchlist:', error);
            alert('Не удалось удалить фильм из списка');
        }
    };

    return (
        <div className="watchlist-container">
            {userRole === 'USER' ? (
                <>
                    <h2>Список Просмотра</h2>
                    <div className="movies-list-watchlist">
                        {watchList.map((movie) => (
                            <div key={movie.imdbId} className="movie-item-watchlist">
                                <img src={movie.poster} alt={movie.title} className="movie-poster-watchlist" />
                                <div className="movie-info-watchlist">
                                    <h3>{movie.title}</h3>
                                    <p>{movie.releaseDate}</p>
                                    <Button variant="danger" onClick={() => handleRemoveFromWatchList(movie.imdbId)}>Удалить</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h2>Доступ к этому контенту ограничен</h2>
            )}
        </div>
    );
};

export default WatchList;

