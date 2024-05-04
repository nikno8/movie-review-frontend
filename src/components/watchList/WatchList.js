// src/components/watchList/WatchList.js
import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import api from '../../api/axiosConfig';
import './WatchList.css';

const WatchList = () => {
    const [watchList, setWatchList] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded.role); // Устанавливаем роль пользователя
            console.log(decoded.role);
            setUserId(decoded.userId); // Извлечь userId из токена
            console.log(decoded.userId);
        }
    }, []);

    useEffect(() => {
        // Запрашиваем список для просмотра только если пользователь авторизован как 'USER'
        if (userRole === 'USER' && userId) {
            fetchWatchList(userId);
        }
    }, [userId, userRole]);

    const fetchWatchList = async (userId) => {
        try {
            const response = await api.get(`/api/v1/users/${userId}/watchlist`);
            setWatchList(response.data);
        } catch (error) {
            console.error('Failed to fetch watchlist:', error);
        }
    };

    return (
        <div className="watchlist-container">
            {userRole === 'USER' ? (
                <>
                    <h2>Список Просмотра</h2>
                    <div className="movies-list-watchlist">
                        {watchList.map((movie) => (
                            <div key={movie.id} className="movie-item-watchlist">
                                <img src={movie.poster} alt={movie.title} className="movie-poster-watchlist" />
                                <div className="movie-info-watchlist">
                                    <h3>{movie.title}</h3>
                                    <p>{movie.releaseDate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h2>Доступ ограничен</h2>
            )}
        </div>
    );
};

export default WatchList;
