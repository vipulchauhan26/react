import React from 'react'
import OwlCarousel from 'react-owl-carousel';

const options = {
  margin: 10,
  responsiveClass: true,
  nav: true,
  autoplay: true,
  loop:true,
   navText: ["Prev", "Next"],
  smartSpeed: 1000,
  responsive: {
      0: {
          items: 1,
          dots:true,

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
          items:3,
      }
  },
};
export default function HomeReview() {
  return (
    <>
    <section className='review-sec'>
<div className='title-top'><h2>Happy Clients</h2></div>
<div className='subtitle'><p>People who use Fasthire service always recommend their friends and family, your story will be the same if you give us a try.</p></div>

<div className='container'>
      <OwlCarousel className='owl-theme sr-slider'{...options}>
    <div className='item'>
        <div className='card'>
        <div className='icon-b'><img  className="img" src={'assets/images/funmii-min.jpg'} alt=""/></div>
   
    <div className='contant-bx'>
        <h2>Personal Statement Writing</h2>
        <p>Get a personal statement that will make you stand out in your application to study abroad.</p>
       
    </div>
    </div>
    </div>
    <div className='item'>
        <div className='card'>
        <div className='icon-b'><img  className="img" src={'assets/images/ayot-min-1.jpg'} alt=""/> </div>
   
    <div className='contant-bx'>
        <h2>CV Writing</h2>
        <p>We make you look good on paper. Your CV is the key to unlock the door to an interview.</p>
    
    </div>
    </div>
    </div>
    <div className='item'>
        <div className='card'>
        <div className='icon-b'><img  className="img" src={'assets/images/ayot-min-1.jpg'} alt=""/></div>
    
    <div className='contant-bx'>
        <h2>LinkedIn Profile Optimization</h2>
        <p>We align your LinkedIn profile to match your corporate and professional brand identity.</p>
        
    </div>
    </div>
    </div>
   
 
</OwlCarousel>
</div>
</section>
    </>
  )
}
