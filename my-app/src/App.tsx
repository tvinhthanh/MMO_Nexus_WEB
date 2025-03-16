import './App.css'
import DashboardHero from './conponents/DashbroadHero';
import EmailSubscription from './conponents/Email';
import FeatureSection from './conponents/Feature';
import Footer from './conponents/Footer';
import Header from './conponents/Header';
import Hero from './conponents/Hero';
import Map from './conponents/Map';
import Post from './conponents/Post';
import Section from './conponents/Section';
import Stories from './conponents/Stories';


export default function App() {
  return (
    <>
          <Header/>
          <Hero/>
          <DashboardHero/>
          <FeatureSection/>
          <Section/>
          <Map/>
          <Stories/>
          <Post/>
          <EmailSubscription/>
          <Footer/>
    </>
  );
}