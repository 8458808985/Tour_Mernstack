import React, { useEffect, useState } from "react";
import MainInformation from "../MainInformation";
import OthersInformation from "../OthersInformation";
import Overview from "../Overview";
import Included from "../Included";
import Map from "@/components/tours/Map";
import Faq from "../Faq";
import Rating from "../Rating";
import Reviews from "../Reviews";
import TourSingleSidebar from "../TourSingleSidebar";
import Gallery1 from "../Galleries/Gallery1";
import DateCalender from "../DateCalender";
import RoadMap2 from "../Roadmap2";
import CommentBox from "../CommentBox";
import { useParams } from "react-router-dom";
import BASE_URL from "@/Urls/baseUrl";

export default function SingleOne({ tour }) {

  const [productData, setProductData] = useState([]);
  const { id } = useParams(); // Destructure id from useParams

  useEffect(() => {
    fetch(`${BASE_URL}/product/${id}`)
      .then(res => res.json())
      .then(data => setProductData(data))
      .catch(err => console.error('Error fetching product:', err));
  }, [id]); // Add id to dependency array
  return (
    <>
      <section className="">
        <div className="container">
          <MainInformation tour={tour} />
          <Gallery1 />
        </div>
      </section>

      <section className="layout-pt-md js-pin-container">
        <div className="container">
          <div className="row y-gap-30 justify-between">
            <div className="col-lg-8">
              <div className="row y-gap-20 justify-between items-center layout-pb-md">
                <OthersInformation />
              </div>

              <Overview />

              <div className="line mt-60 mb-60"></div>

              <h2 className="text-30">What's included</h2>

              <Included />

              <div className="line mt-60 mb-60"></div>



              <h2 className="text-30 mt-60">Tour Map</h2>
              <div className="mapTourSingle">
                {/* <p>onClick link redirect map location</p> */}
                <a href="https://www.google.com/maps/place/Eiffel+Tower/@48.8584,2.2945,17z" className="fs-3" style={{ fontSize: "10px" }}>
                  <span style={{ fontSize: "18px" }}>{productData.tourMap}</span> Great location-show Map
                </a>
              </div>

              {/* <div className="line  mb-60"></div> */}

              {/* <h2 className="text-30 mb-30">Availability Calendar gd</h2> */}
              <DateCalender />

              {/* <div className="line mt-60 mb-60"></div> */}

              <h2 className="text-30">FAQ</h2>

              <div className="accordion -simple row y-gap-20 mt-30 js-accordion">
                <Faq productData={productData} />
              </div>





            </div>

            <div className="col-lg-4">
              <div className="d-flex justify-end js-pin-content">
                <TourSingleSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
