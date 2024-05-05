import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import Button from 'react-bootstrap/Button';
import './UserList.css';  // Подключаем наш CSS файл

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/api/v1/users/ban/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const banUser = async (login) => {
        try {
            await api.delete(`/api/v1/users/ban/${login}`);
            fetchUsers();  // Refresh the list after banning
        } catch (error) {
            console.error('Failed to ban user:', error);
        }
    };

    return (
        <div className="user-list-container">
            <h1 className="user-list-title">Список пользователей</h1>
            <div>
                {users.map(user => (
                    <div key={user.id} className="user-item">
                        <span className="user-info">{user.firstName} {user.lastName} - {user.login}</span>
                        <Button className="button-ban" onClick={() => banUser(user.login)}>Ban</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
