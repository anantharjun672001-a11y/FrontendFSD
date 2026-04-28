import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import ClientSlider from "../components/ClientSlider";
import AboutStudio from "../components/AboutStudio";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Intro/>
      <ClientSlider/> 
      <AboutStudio/>
      <Footer/>
    </div>
  );
};

export default Landing;
