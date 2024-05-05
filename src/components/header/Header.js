import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'; // Импорт useState и useEffect для работы с состоянием и жизненным циклом компонента

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние, отражающее статус входа пользователя

    useEffect(() => {
        // Проверяем наличие токена при монтировании компонента
        const token = localStorage.getItem('auth_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/');
        window.location.reload();
        
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
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
                        <NavLink className="nav-link" to="/watchlist">Список просмотра</NavLink>
                    </Nav>
                    {isLoggedIn ? (
                        <Button variant="outline-danger" onClick={handleLogout}>Выйти</Button>
                    ) : (
                        <>
                            <Button variant="outline-info" className="me-2" onClick={handleLogin}>Вход</Button>
                            <Button variant="outline-info" onClick={handleRegister}>Регистрация</Button>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
