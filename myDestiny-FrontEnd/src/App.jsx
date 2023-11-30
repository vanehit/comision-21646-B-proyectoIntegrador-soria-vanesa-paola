import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/Register';
import Login from './pages/Login';
import Posts from './pages/Posts';
import NavbarHome from './components/Navbar';
import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
      <NavbarHome />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
