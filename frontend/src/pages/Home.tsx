// src/pages/Homepage.tsx

import React from "react";
import Hero from "../components/Hero";
import DashboardHero from "../components/DashbroadHero";
import FeatureSection from "../components/Feature";
import Section from "../components/Section";
import Stories from "../components/Stories";
import Map from "../components/Map";
import Post from "../components/Post";
import EmailSubscription from "../components/Email";

const Homepage: React.FC = () => {
  return (
    <div >
      <Hero />
      <DashboardHero />
      <FeatureSection />
      <Section />
      <Map />
      <Stories />
      <Post />
      <EmailSubscription />
    </div>
  );
};

export default Homepage;
