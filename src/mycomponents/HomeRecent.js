import React from 'react'
import OwlCarousel from 'react-owl-carousel';
const options = {
    margin: 10,
    responsiveClass: true,
    nav: false,
    autoplay: true,
    loop:true,
    // navText: ["Prev", "Next"],
    smartSpeed: 1000,
    autoplayTimeout: 5000,  
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
export default function HomeRecent() {
  return (
    <>
        <section className='review-sec'>
<div className='title-top'><h2>Recent Career Advice</h2></div>

<div className='container'>
<OwlCarousel className='owl-theme sr-slider'{...options}>
<div className='item'>
    <div className='card'>
    <img  className="img" src={'assets/images/Services-in-UAE-300x169.jpg'} alt=""/>
    </div>

</div>
<div className='item'>
    <div className='card'>
    <img  className="img" src={'assets/images/Jobs-in-the-USA-300x169.jpg'} alt=""/>
    </div>

</div>
<div className='item'>
    <div className='card'>
    <img  className="img" src={'assets/images/Jobs-for-Americans-300x169.jpg'} alt=""/>
    </div>

</div>
<div className='item'>
    <div className='card'>
    <img  className="img" src={'assets/images/Jobs-in-the-USA-300x169.jpg'} alt=""/>
    </div>

</div>
<div className='item'>
    <div className='card'>
    <img  className="img" src={'assets/images/international-nurses-300x168.jpg'} alt=""/>
    </div>

</div>


</OwlCarousel>


</div>
</section>
    </>
  )
}
