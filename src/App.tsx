import { Route, Routes } from 'react-router';
import './App.scss';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="create" element={<Login />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
