import { Link } from "react-router-dom";
import React from "react";

export default function Banner() {
  return (
    <section className="cta -type-2">
      <div className="cta__bg">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10gDoUHpHItDVlyS4eAcQf8VjoQS-9aQiyA&s" alt="image" />

        <div className="cta__image">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYQvHsIbmep9r8w2oO0WF9kz58x7x7J1UBWGrEMiFg2A&s" alt="image" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYQvHsIbmep9r8w2oO0WF9kz58x7x7J1UBWGrEMiFg2A&s" alt="image" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYQvHsIbmep9r8w2oO0WF9kz58x7x7J1UBWGrEMiFg2A&s" alt="image" />
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-7">
            <div className="cta__content">
              <h2
                data-aos="fade-up"
                data-aos-delay=""
                className="text-40 md:text-30  lh-13"
              >
                Grab up to <span className="text-accent-1">35% off</span>
                <br className="lg:d-none" />
                on your favorite
                <br className="lg:d-none" />
                Destination
              </h2>

              <p data-aos="fade-up" data-aos-delay="" className="mt-10">
                Limited time offer, don't miss the opportunity
              </p>

              <div className="mt-30 md:mt-20">
                <button
                  data-aos="fade-right"
                  data-aos-delay=""
                  className="button -md -dark-1 bg-accent-1 text-white"
                >
                  <Link to="/tour-list-1">
                    Book Now
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
