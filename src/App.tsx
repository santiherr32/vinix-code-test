import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import './App.scss';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Create from '../src/pages/Create';
// import { ContextProvider } from './Context';

function App(): JSX.Element {
  const token = localStorage.getItem('token');
  const [tokenExists, setTokenExists] = useState(false);
  // const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (token) setTokenExists(true);
    else setTokenExists(false);
  }, [token]);

  return (
    <div className="App">
      {/* <ContextProvider> */}
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/create" element={<Create />} />
        <Route
          path="/login"
          element={tokenExists ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* </ContextProvider> */}
    </div>
  );
}

export default App;
