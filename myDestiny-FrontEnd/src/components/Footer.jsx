import { BsTwitter, BsInstagram, BsFacebook } from 'react-icons/bs';
import { Link as Anchor } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer_main">
        <div className="footer_iconos">
          <Anchor to="/social/twitter">
            <BsTwitter className="icono-footer" />
          </Anchor>
          <Anchor to="/social/instagram">
            <BsInstagram className="icono-footer" />
          </Anchor>
          <Anchor to="/social/facebook">
            <BsFacebook className="icono-footer" />
          </Anchor>
        </div>

        <div className="footer_logo">
          <h2 className="footer_titulo">
            <span>MyDestiny</span>
          </h2>
          <img
            src="../../public/assets/images/logo.ico"  
            alt="MyDestiny Logo"
            className="logo-img"
          />
        </div>

        <div className="footer_links">
          <Anchor to="/" className="enlace-footer">Home</Anchor>
          <Anchor to="/register" className="enlace-footer">Register</Anchor>
          <Anchor to="/login" className="enlace-footer">Login</Anchor>
          <Anchor to="/posts" className="enlace-footer">Posts</Anchor>
        </div>
      </div>
      <p className="text-center copyright">
        Copyright © - MYDESTINY All Rights Reserved.
      </p>
    </>
  );
};

export default Footer;
