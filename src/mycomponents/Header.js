import React from 'react'
//import logo from './assets/images/logo.png';
import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <>
    
    <header className="main-hd animated">
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid ">
        <div className="desktop-dp d-flex justify-content-between align-itams-center">
         
             
             
             <NavLink className="navbar-brand" to="/"><img src="/assets/images/logo.jpg" alt="My logo" /></NavLink >
           
              <div className="navbar-collapse  my-menu">
             
                <ul className="navbar-nav " >
                 <li className="nav-item"> <NavLink exact  activeClassName="active" className="nav-link"  to="/">Home</NavLink > </li>
                 <li className="nav-item"> <NavLink exact  activeClassName="active" className="nav-link"  to="/about">About Us</NavLink > </li>
                 <li className="nav-item dropdown"> <NavLink exact  activeClassName="active" className="nav-link dropdown-toggle"  to="#">Our Services</NavLink > 
                    <ul className='dropdown-menu'>
                       <li className="nav-item"> <NavLink exact  activeClassName="active" className="nav-link"  to="/personal-statement">Personal Statement Writing</NavLink ></li>  
                       <li className="nav-item"> <NavLink exact  activeClassName="active" className="nav-link"  to="/linkedin-Optimization">LinkedIn Optimization</NavLink ></li>  
                       <li className="nav-item"> <NavLink exact  activeClassName="active" className="nav-link"  to="/cv-writing">CV Writing</NavLink ></li>
                       <li className="nav-item"> <NavLink exact  activeClassName="active" className="nav-link"  to="/lette-of-recommendation">Letter of Recommendation</NavLink ></li>
                       <li className="nav-item"> <NavLink exact  activeClassName="active" className="nav-link"  to="/testimonials">Testimonials</NavLink ></li>
                    </ul>
                    
                 </li>
                 <li className="nav-item dropdown"> <NavLink exact  activeClassName="active" className="nav-link dropdown-toggle"  to="#">Career Resources</NavLink > 
                 
                 <ul className='dropdown-menu'> 
                       <li className="nav-item"> <NavLink exact  activeClassName="active" className="nav-link"  to="/CareerAdvice">Career Advice</NavLink ></li>  
                       <li className="nav-item"> <NavLink exact  activeClassName="active" className="nav-link"  to="/Ebooks">Ebooks</NavLink ></li>  
                      
                    </ul>
                 
                 </li>
                 <li className="nav-item"> <NavLink exact  activeClassName="active" className="nav-link"  to="/contact-us">Contact Us</NavLink > </li>
                </ul>
                <div className="globle-link top-nav-m"><NavLink  to="/">Post Job</NavLink ></div>
               
            
            </div>
            
            <div className="globle-link top-l-d"><NavLink  to="/">Post Job</NavLink ></div>
              </div>
        
        <button className="navbar-toggler bt-menu" type="button" data-bs-toggle="collapse" data-bs-target="#navbarPhone" aria-controls="navbarPhone" aria-expanded="false" aria-label="Toggle navigation"> <span></span> <span></span> <span className="last"></span> </button>
  
     
      </div>
      <div className="mOverlay"></div>
    </nav>
  </header>
  </>
  )
}
