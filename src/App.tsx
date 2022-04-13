import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import './App.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ContextProvider } from './Context';

function App(): JSX.Element {
  const token = localStorage.getItem('token');
  const [tokenExists, setTokenExists] = useState(false);
  // const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    setTokenExists(token !== null);
  }, [tokenExists, token]);

  return (
    <div className="App">
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="create" />
          </Route>
          <Route
            path="/login"
            element={tokenExists ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
