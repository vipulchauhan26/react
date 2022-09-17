import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function HomeCarousel() {
  return (
    <>
    <section className='slider-sec'>
     <OwlCarousel className='owl-theme' loop margin={20} nav mouseDrag autoplay dots={false}   items={1}>
    <div className='item'>
        <div className='contant-bx'>
          <h2>Welcome</h2>
          <p>Our resources guide you in the areas of job search, abroad studies, CV, cover letter, SEO writing e.t.c</p>
          <a href='/'>VIEW ADVICE</a>


        </div>
    <img  className="img" src={'assets/images/slider-b1.jpg'} alt=""/>
    </div>
    <div className='item'>
    <div className='contant-bx'>
          <h2>Welcome</h2>
          <p>Our resources guide you in the areas of job search, abroad studies, CV, cover letter, SEO writing e.t.c</p>
          <a href='/'>VIEW ADVICE</a>


        </div>
    <img  className="img" src={'assets/images/slider-b2.jpg'} alt=""/>
    </div>
    <div className='item'>
    <div className='contant-bx'>
          <h2>Welcome</h2>
          <p>Our resources guide you in the areas of job search, abroad studies, CV, cover letter, SEO writing e.t.c</p>
          <a href='/'>VIEW ADVICE</a>


        </div>
    <img  className="img" src={'assets/images/slider-b3.jpg'} alt=""/>
    </div>
 
</OwlCarousel>
</section>
    </>
  )
}
