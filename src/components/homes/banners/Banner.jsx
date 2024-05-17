import { Link } from "react-router-dom";
import React from "react";

export default function Banner() {
  return (
    <section className="cta -type-2">
      <div className="cta__bg">
        <img src="https://swarnatara.tours/images/upload/package/1659607346andaman-travel-agency-in-chennai.png" alt="image" />

        <div className="cta__image">
          <img src="https://dallakeholidays.com/wp-content/uploads/2017/09/tajwithbus.png" alt="image" />
          <img src="https://dallakeholidays.com/wp-content/uploads/2017/09/tajwithbus.png" alt="image" />
          <img src="https://dallakeholidays.com/wp-content/uploads/2017/09/tajwithbus.png" alt="image" />
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-8 col-sm-12">
            <div className="cta__content ">
              <h2
                data-aos="fade-up"
                data-aos-delay=""
                className="" 
            style={{color:"white", fontSize:"30px" , fontWeight:"700"}}  >
                Grab up to <span className="text-accent-1">35% off</span>
                <br className="lg:d-none" />
                on your favorite
                <br className="lg:d-none" />
                Destination
              </h2>

              <p data-aos="fade-up" data-aos-delay="" style={{fontSize:"30px", color:"white"}} className="mt-10">
                Limited time offer, don't miss the opportunity
              </p>

              <div className="mt-30 md:mt-20">
                <button
                  data-aos="fade-right"
                  data-aos-delay=""
                  className="button -md -dark-1 bg-accent-1 text-white"
                >
                  <Link to="/tour-list-1">
                <span className="flot-end"> Book Now</span>   
                    <i className="icon-arrow-top-right ml-10 text-16"></i>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
