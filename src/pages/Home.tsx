import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './Home.scss';
// import Posts from '../components/Posts';

const Posts = lazy(() => import('../components/Posts'));

function Home() {
  const [tokenExists, setTokenExists] = useState(false);
  // const { state, dispatch } = useContext(AppContext);
  // const navigate = useNavigate();

  const LoadingSpinner = (
    <Spinner animation="border" role="status" variant="light">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );

  const handleLogout = () => {
    if (tokenExists) {
      localStorage.removeItem('token');
      setTokenExists(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setTokenExists(token ? true : false);
  }, [tokenExists]);

  return (
    <div className="home-wrapper">
      {tokenExists ? (
        <div className="home_user-login">
          <header className="user-login_header">
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
            <Link className="btn btn-primary btn-lg" to="/create">
              New post
            </Link>
          </header>
          <main className="posts-section">
            <Suspense fallback={LoadingSpinner}>
              {tokenExists && <Posts tokenExists={tokenExists} />}
            </Suspense>
          </main>
        </div>
      ) : (
        <div className="home_not-login">
          <header className="not-login_header">
            <h1>Welcomo to your personal blog</h1>
          </header>
          <main className="actions-section">
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
            <span> Or </span>
            <Link className="btn btn-secondary" to="/register">
              Register
            </Link>
          </main>
        </div>
      )}
    </div>
  );
}

export default Home;
