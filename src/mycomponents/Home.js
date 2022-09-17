import React from 'react'
import HomeCarousel from './HomeCarousel'
import HomeEnquery from './HomeEnquery'
import HomeRecent from './HomeRecent'
import HomeReview from './HomeReview'
import HomeService from './HomeService'
//import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
    
  <HomeCarousel></HomeCarousel>

<section className='welcome-sec'>
<div className='container'>
      <div className='title-top'><h2>Explore Resources</h2></div>
      <div className='row justify-content-center'><div className='col-md-10 text-center'><p>Our online resource center is designed to cater to your professional and academic needs. Touching topics that relate to your growth and advancement, you will find our resources a good addition to your professional resources.</p></div></div>
      
</div>
<div className='container'>
<div className='row'>
    <div className='col-md-12'>
      <ul className="book-list">
      <li>
        <div className='card'>
          <div className='image-bx'>
          <img  className="img" src={'assets/images/buy1-min-768x593.jpg'} alt=""/>
          </div>
          <div className='card-detail'>
            <h3>How to Strive and Lead in a Male-Dominated Work Space</h3>
            <a href='/' className='ha-btn'>Buy Now</a>



          </div>
        </div>


</li>
<li>
        <div className='card'>
          <div className='image-bx'>
          <img  className="img" src={'assets/images/buy1-min-768x593.jpg'} alt=""/>
          </div>
          <div className='card-detail'>
            <h3>How to Strive and Lead in a Male-Dominated Work Space</h3>
            <a href='/' className='ha-btn'>Buy Now</a>



          </div>
        </div>


</li>
<li>
        <div className='card'>
          <div className='image-bx'>
          <img  className="img" src={'assets/images/buy1-min-768x593.jpg'} alt=""/>
          </div>
          <div className='card-detail'>
            <h3>How to Strive and Lead in a Male-Dominated Work Space</h3>
            <a href='/' className='ha-btn'>Buy Now</a>



          </div>
        </div>


</li>
      
      </ul>
      </div>


</div>
<div className='w-100 d-flex justify-content-center'>
  <a href='/' className='btn-all elementor-animation-pop'>View All Resources</a>

</div>

</div>


</section>

<HomeService></HomeService>
<HomeReview></HomeReview>
<HomeRecent></HomeRecent>
<HomeEnquery></HomeEnquery>

 
    </>
  )
}
