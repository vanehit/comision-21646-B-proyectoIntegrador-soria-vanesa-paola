import React from "react";
import CallToAction from "./CallToAction";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <h1 className=" titulo animate__animated animate__backInDown">MyDestiny</h1>
        <p className=" parrafo animate__animated animate__fadeInRight">
          Find your perfect trip, designed by insiders who know and love their cities!
        </p>
        <CallToAction className="btnC" />
      </div>
    </>
  );
};

export default Hero;
