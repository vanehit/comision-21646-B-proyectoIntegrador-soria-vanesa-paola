import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Posts from './pages/Posts/Posts';
import NavbarHome from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';




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
