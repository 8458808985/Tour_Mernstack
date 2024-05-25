import { destinationsSix } from "@/data/destinations";

import { Link } from "react-router-dom";
import React from "react";
import {
  durations,
  languages,
  toursTypes,
  features,
  rating,
} from "@/data/tourFilteringOptions";

export default function TourTypeOne() {
  return (
<>

 <section className="layout-pt-xl layout-pb-xl">
      <div className="container">
        <div className="row justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2
              data-aos="fade-up"
              data-aos-delay=""
              className="text-30 md:text-24" style={{fontSize:"20px", fontWeight:"700"}}
            >
              Popular things to do 
            </h2>
          </div>

          <div className="col-auto">
            <Link
              to={"/tour-list-1"}
              data-aos="fade-right"
              data-aos-delay=""
              className="buttonArrow d-flex items-center "
            >
              <span style={{fontSize:"18px",fontWeight:"700"}}>See all</span>
              <i className="icon-arrow-top-right text-16 ml-10" style={{fontSize:"18px",fontWeight:"700"}}></i>
            </Link>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay=""
          className="grid -type-1 pt-40 sm:pt-20"
        >
          {toursTypes.map((elm, i) => (
            <Link
              to={`/tour-list-2/${elm._id}`}
              key={i}
              className="featureCard -type-1 -hover-1 overflow-hidden rounded-12 px-30 py-30"
            >
              <div className="featureCard__image">
                <img src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image"/>
              </div>

              <div className="featureCard__content">
                <h4 className="text-white">{elm}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section> 
</>

    
  );
}
