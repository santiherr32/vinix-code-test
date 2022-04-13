import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './Home.scss';

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
    setTokenExists(localStorage.getItem('token') !== null);
  }, [tokenExists]);

  return (
    <main className="home">
      {tokenExists ? (
        <div className="home_user-login">
          <header className="user-login_header">
            <Button onClick={handleLogout}>Logout</Button>
          </header>
          <section className="posts-section">
            <Suspense fallback={LoadingSpinner}>
              {tokenExists && <Posts tokenExists={tokenExists} />}
            </Suspense>
          </section>
        </div>
      ) : (
        <div className="home_not-login">
          <header className="not-login_header">
            <h1>Hi, there!</h1>
          </header>
          <section className="actions-section">
            <Button>
              <Link to="/login">Login</Link>
            </Button>
            <span> Or </span>
            <Button>
              <Link to="/register">Register</Link>
            </Button>
          </section>
        </div>
      )}
    </main>
  );
}

export default Home;
