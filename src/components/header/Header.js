import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';  // Предполагаем, что jwtDecode корректно импортирован

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState(''); // Добавлено состояние для хранения имени пользователя

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            const decoded = jwtDecode(token);
            setIsLoggedIn(true);
            setUserRole(decoded.role);
            setUserName(decoded.firstName); // Предполагается, что никнейм пользователя сохранен в поле login
        }
    }, []);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        setIsLoggedIn(false);
        setUserRole('');
        setUserName('');
        navigate('/');
    };

 

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand href="/" style={{ "color": 'gold' }}>
                    <FontAwesomeIcon icon={faVideoSlash} /> Gold
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink className="nav-link" to="/">Главная</NavLink>
                        {userRole === 'ADMIN' ? (
                            <NavLink className="nav-link" to="/admin/users">Панель администрирования</NavLink>
                        ) : (
                            <NavLink className="nav-link" to="/watchlist">Список просмотра</NavLink>
                        )}
                    </Nav>
                    <div className="ms-auto">
                        {isLoggedIn ? (
                            <>
                                <span className="navbar-text me-3">Привет, {userName}</span>
                                <Button variant="outline-danger" onClick={handleLogout}>Выйти</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline-info" className="me-2" onClick={handleLogin}>Вход</Button>
                                <Button variant="outline-info" onClick={handleRegister}>Регистрация</Button>
                            </>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
