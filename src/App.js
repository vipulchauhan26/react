import React from 'react'
import './App.css';

import Header from './mycomponents/Header';
import Footer from './mycomponents/Footer';

import {BrowserRouter, Route , Switch } from 'react-router-dom';
import Home from './mycomponents/Home';
import About from './mycomponents/About';
import ContactUs from './mycomponents/ContactUs';
import PersonalStatement from './mycomponents/PersonalStatement';
import LinkedinOptimization from './mycomponents/LinkedinOptimization';
import CVWriting from './mycomponents/CVWritingService';
import LetteRecommendation from './mycomponents/LetteRecommendation';
import Testimonials from './mycomponents/Testimonials';
import CareerAdvice from './mycomponents/CareerAdvice';
import Ebooks from './mycomponents/Ebooks';
import Advertise from './mycomponents/Advertise';
function App() {
  return (
    <>
       <BrowserRouter>
        <Header/>
       
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/personal-statement" component={PersonalStatement}/> 
          <Route exact path="/linkedin-Optimization" component={LinkedinOptimization}/> 
          <Route exact path="/cv-writing" component={CVWriting}/> 
          <Route exact path="/lette-of-recommendation" component={LetteRecommendation}/> 
          <Route exact path="/testimonials" component={Testimonials}/> 
          <Route exact path="/career-advice" component={CareerAdvice}/> 
          <Route exact path="/ebooks" component={Ebooks}/> 
          <Route exact path="/advertise" component={Advertise}/> 
          <Route exact path="/testimonials" component={Testimonials}/> 
          <Route exact path="/contact-us" component={ContactUs}/>             
        </Switch>
     
         <Footer/>
         </BrowserRouter>
    </>
  );
}

export default App;
