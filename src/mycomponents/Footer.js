import React from 'react'
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
    <footer>
      <div className='container'>
      <div className='row'>
         <div className='col-md-3'>
          <div className='foot-cn'>
            <div className='foot-logo'><Link to='/'><img src="/assets/images/logo.jpg" alt="My logo" /></Link></div>
            <p>Fasthire is a career and educational brand using content, resources, and training to create value for professionals around the globe. We deliver the best career and educational services, including; job listing, personal statement, CV, cover letter, LinkedIn optimization, SEO writing, and interview preparation services.</p>
          </div>
          <div className='social-medialink'>
          <Link to='/'><i className='icon icon-facebook'></i></Link>
          <Link to='/'><i className='icon icon-insta'></i></Link>
          <Link to='/'><i className='icon icon-twitter'></i></Link>
          <Link to='/'><i className='icon icon-linkedin'></i></Link>
          
          </div>
         </div>
         <div className='col-md-3'>
         <div className='foot-cn'>
          <div className='foot-title'>For Candiate</div>
          <ul>
           <li><Link to='/'>Career Resources</Link></li>
           <li><Link to='/about'>Personal Statement</Link></li>
           <li><Link to='/about'>Linkedin Optimization</Link></li>
           <li><Link to='/about'>CV Writing Service</Link></li>
           <li><Link to='/about'>Career Advice</Link></li>
          </ul>
         </div>
         </div>
         <div className='col-md-3'>  <div className='foot-cn'> <div className='foot-title'>For Employer</div>
          <ul>
           <li><Link to='/'>Post a Job</Link></li>
           <li><Link to='/about'>Advertise</Link></li>    
          </ul>
         </div></div>
         <div className='col-md-3'>
         <div className='foot-cn'> <div className='foot-title'>Fasthire</div>
          <ul>
           <li><Link to='/'>About Us</Link></li>
           <li><Link to='/about'>Privacy Policy</Link></li>
           <li><Link to='/about'>Refund Policy</Link></li>
           <li><Link to='/about'>Terms and Conditions</Link></li>
          </ul>
         </div>


         </div>
      </div>

      </div>


    </footer>
    </>
  )
}
