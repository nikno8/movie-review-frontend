
import Hero from '../hero/Hero';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = ({ movies }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('auth_token');

  const handleLoginRedirect = () => {
    navigate('/login'); // Переход на страницу входа
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Переход на страницу регистрации
  };

  return (
    <Container fluid>
      {isAuthenticated ? (
        <Hero movies={movies} />
      ) : (
        <div className="text-center">
          <h2>Добро пожаловать!</h2>
          <p>Войдите или зарегистрируйтесь, чтобы продолжить.</p>
          <Button variant="primary" onClick={handleLoginRedirect} className="me-2">Войти</Button>
          <Button variant="secondary" onClick={handleRegisterRedirect}>Регистрация</Button>
        </div>
      )}
    </Container>
  );
};

export default Home;
