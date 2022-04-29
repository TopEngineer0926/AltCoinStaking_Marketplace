import React, { useState, useEffect } from "react";
import "../styles/Hero.css";
import Header from "./Header";

const Hero = () => {

  return (
    <div id="hero">
      {/* <img id='hero-background' src={list[0].src}/> */}

      <Header />

      <h1 id="header-text-first"> Altcoin Staking </h1>
      <h1 id="header-text-second"> Marketplace </h1>
    </div>
  );
};

export default Hero;
