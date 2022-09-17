import React from 'react'
import OwlCarousel from 'react-owl-carousel';

const options = {
  margin: 10,
  responsiveClass: true,
  nav: false,
  autoplay: false,
  //navText: ["Prev", "Next"],
  smartSpeed: 1000,
  responsive: {
      0: {
          items: 1,
          dots:true,
          loop:true
      },
      400: {
          items: 1,
      },
      600: {
          items: 2,
      },
      700: {
          items: 2,
      },
      1000: {
          items:4,
      }
  },
};
export default function HomeService() {
  return (
    <>
    
<section className='service-sec'>
<div className='title-top'><h2>Professional Writing Services</h2></div>

<div className='container'>
    <div className='row'></div>
      <OwlCarousel className='owl-theme sr-slider'{...options}>
    <div className='item'>
        <div className='card'>
        <div className='icon-b'><i className='icon icon-copywriting'></i></div>
   
    <div className='contant-bx'>
        <h2>Personal Statement Writing</h2>
        <p>Get a personal statement that will make you stand out in your application to study abroad.</p>
        <a href='/' className='btn-card'>Write SOP</a>
    </div>
    </div>
    </div>
    <div className='item'>
        <div className='card'>
        <div className='icon-b'> <i className='icon icon-job-description'></i></div>
   
    <div className='contant-bx'>
        <h2>CV Writing</h2>
        <p>We make you look good on paper. Your CV is the key to unlock the door to an interview.</p>
        <a href='/' className='btn-card'>Re-write CV</a>
    </div>
    </div>
    </div>
    <div className='item'>
        <div className='card'>
        <div className='icon-b'><i className='icon icon-profile'></i></div>
    
    <div className='contant-bx'>
        <h2>LinkedIn Profile Optimization</h2>
        <p>We align your LinkedIn profile to match your corporate and professional brand identity.</p>
        <a href='/' className='btn-card'>Optimize LinkedIn</a>
    </div>
    </div>
    </div>
    <div className='item'>
        <div className='card'>
     <div className='icon-b'><i className='icon icon-customer-review'></i></div>
   
    <div className='contant-bx'>
        <h2>Letter of Recommendation</h2>
        <p>We write outstanding letters of recommendation for any type of need.</p>
        <a href='/' className='btn-card'>Write LOR</a>
    </div>
    </div>
    </div>
 
</OwlCarousel>

</div>

</section>
    </>
  )
}
