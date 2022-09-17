import React from 'react'

export default function HomeEnquery() {
  return (
    <>
      <section className='enquery-sec'>
        <div className='container'>
         <div className='row'>
          <div className='col-md-6'>


          </div>
          <div className='col-md-6'>
           <div className='form-head'>
           <p>A source material that covers the fundamentals of cover letter writing for fresh graduates; that can answer and demonstrate proof to key questions like;</p>
           <ul>
             <li>How long should my cover letter be?</li>
              <li>How do I start my cover letter?</li>
              <li>What should I include in my Cover Letter?</li>
              <li>As a fresh graduate, what can I reference when applying for a job? Etc.</li>
           </ul>
           </div>
           <div className='form-box'>
              <div className='f-head'><h2>Get Your Ebook Now</h2> <p><span>*</span>indicates required</p></div>
             <form>
             <div className="form-group mb-3">
                    <label>Name<span>*</span></label>
                    <input type="text" className="form-control" id="" />
            </div>
            <div className="form-group mb-3">
                    <label>Email address<span>*</span></label>
                    <input type="text" className="form-control" id="" />
            </div>
            <div className="form-group mb-3">
                    <label>EIndustry <span>*</span></label>
                    <input type="text" className="form-control" id="" />
            </div>
            <div className="form-group"><button className='btn btnform'>Download Ebook Now</button></div>
             </form>

           </div>
          </div>
         </div>
        </div>
      </section>
    </>
  )
}
