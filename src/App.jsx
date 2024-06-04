import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useCallback } from 'react';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Cookies from 'js-cookie';

function App() {
  const storedUser = sessionStorage.getItem('user');
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const [isLoggedIn, setLoggedIn] = useState(!!parsedUser);

  const handleLogin = useCallback(() => {
    setLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    setLoggedIn(false);
    sessionStorage.removeItem('user');
    Cookies.remove('accessToken');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
          <Route index element={<Home isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
          <Route path="login" element={<Login onLogin={handleLogin} />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
