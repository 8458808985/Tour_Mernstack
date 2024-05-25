import Stars from "@/components/common/Stars";
import { tourData } from "@/data/tours";

import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BASE_URL from "@/Urls/baseUrl";

export default function Product({ elm, data }) {
  const [showFullTitle, setShowFullTitle] = useState(false);
  // console.log("Home", data)
  const toggleTitle = () => {
    setShowFullTitle(!showFullTitle);
  };
  const [productData, setProductData] = useState([])


  useEffect(() => {
    fetch(`${BASE_URL}/product`)
      .then(res => res.json())
      .then(data => setProductData(data))
      .catch(err => console.error('Error fetching tours:', err));
  }, []);


  return (

    <section className="layout-pt-xl layout-pb-xl">
      <div className="container">
        <div className="row justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2
              data-aos="fade-right"
              data-aos-delay=""
              className="text-30 md:text-24"
            >
              Find Popular Tours
            </h2>
          </div>

          <div className="col-auto">
            <Link
              to={"/tour-list-1"}
              data-aos="fade-left"
              data-aos-delay=""
              className="buttonArrow d-flex items-center "
            >
              <span style={{ fontWeight: "700", fontSize: "20px" }}>See all</span>
              <i className="icon-arrow-top-right text-16 ml-10" style={{ color: "#78006E", fontSize: "20px", fontWeight: "700" }}></i>

            </Link>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay=""
          className="row y-gap-30 justify-between pt-40 sm:pt-20 mobile-css-slider -w-300"
        >
          {data.length === 0 ? (
            productData.slice(0, 12).map((elm, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <Link
                  to={`/tour-single-1/${elm._id}`}
                  className="tourCard -type-1 py-10 px-10 border-1 rounded-12  -hover-shadow border-0 shadow"
                >
                  <div className="tourCard__header">
                    <div className="tourCard__image ratio ratio-28:20">
                      <img
                        src={elm.imageSrc[0]}
                        alt="image"
                        className="img-ratio rounded-12"
                      />
                    </div>
                  </div>

                  <div className="tourCard__content px-10 pt-10">
                    <div className="tourCard__location d-flex items-center text-13 text-light-2">
                      <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                      <span style={{ fontSize: "15px", fontWeight: "700" }}>  {elm.country} ({elm.city}) </span>
                    </div>

                    <h3 className="tourCard__title text-16 fw-500 mt-5">
                      <span style={{ fontSize: "14px", fontWeight: "600" }}>
                        {showFullTitle ? elm.product : `${elm.product.substring(0, 20)}...`}
                      </span>
                      {elm.product.length > 20 && (
                        <button onClick={toggleTitle} className="btn-link">

                        </button>
                      )}
                    </h3>
                    <div className="tourCard__rating d-flex items-center text-13 mt-5">
                      <div className="d-flex x-gap-5" style={{ fontSize: "18px", fontWeight: "900" }}>
                        <Stars star={elm.rating} />
                      </div>

                      {/* {elm.adultOldPrice && (
                        <span className="text-dark-1 me-4" style={{ fontSize: "14px", fontWeight: "700" }}>
                          Old Price: <del>${elm.adultOldPrice}</del>
                        </span>
                      )} */}
                    </div>
                    {/* <div className="tourCard__rating d-flex items-center text-13 mt-5">
                      {elm.discount && (
                        <span className="text-dark-1 me-4" style={{ fontSize: "14px", fontWeight: "700" }}>
                          Discount: {elm.discount}%
                        </span>
                      )}
                    </div> */}

                    <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                      <div className="d-flex items-center" style={{ fontSize: "10px", fontWeight: "700" }}>
                        {/* <i className="icon-clock text-16 mr-5" style={{ fontSize: "10px", fontWeight: "700" }}></i>
                        <span style={{ fontSize: "12px" }}> {elm.duration}</span> */}
                         
                         <p className="px-1 rounded-2" style={{backgroundColor:"#78006E",color:"white",fontSize:"9px", fontWeight:"700"}}>Save up to 19%</p>
                      </div>

                      <div>
                        {elm.adultOldPrice && elm.discount && (
                          <span className="text-16 fw-500" style={{ fontSize: "12px", fontWeight: "700" }}>
                            <span style={{ fontSize: "12px" }}> New Price: $</span> <span style={{ fontSize: "14px", fontWeight: "700" }}>{(elm.adultOldPrice - (elm.adultOldPrice * elm.discount) / 100).toFixed(2)}</span>
                          </span>
                        )}
                        {elm.adultOldPrice && !elm.discount && (
                          <span className="text-16 fw-500" style={{ fontSize: "17px", fontWeight: "700" }}>
                            New Price: $   {elm.adultOldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            data.map((elm, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <Link
                  to={`/tour-single-1/${elm._id}`}
                  className="tourCard -type-1 py-10 px-10 border-1 rounded-12  -hover-shadow border-0 shadow"
                >
                  <div className="tourCard__header">
                    <div className="tourCard__image ratio ratio-28:20">
                      <img
                        src={elm.imageSrc[0]}
                        alt="image"
                        className="img-ratio rounded-12"
                      />
                    </div>

                    <button className="tourCard__favorite">
                      <i className="icon-heart" style={{ fontWeight: "700", fontSize: "20px", color: "#78006E" }}></i>
                    </button>
                  </div>

                  <div className="tourCard__content px-10 pt-10">
                    <div className="tourCard__location d-flex items-center text-13 text-light-2">
                      <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                      <span style={{ fontSize: "15px", fontWeight: "700" }}>  {elm.country} ({elm.city}) </span>
                    </div>

                    <h3 className="tourCard__title text-16 fw-500 mt-5">
                      <span style={{ fontSize: "18px", fontWeight: "700" }}>
                        {showFullTitle ? elm.product : `${elm.product.substring(0, 20)}...`}
                      </span>
                      {elm.product.length > 20 && (
                        <button onClick={toggleTitle} className="btn-link">
                          {showFullTitle ? 'See Less' : 'See More'}
                        </button>
                      )}
                    </h3>
                    <div className="tourCard__rating d-flex items-center text-13 mt-5">
                      <div className="d-flex x-gap-5" style={{ fontSize: "18px", fontWeight: "900" }}>
                        <Stars star={elm.rating} />
                      </div>

                      {elm.adultOldPrice && (
                        <span className="text-dark-1 me-4" style={{ fontSize: "14px", fontWeight: "700" }}>
                          Old Price: <del>${elm.adultOldPrice}</del>
                        </span>
                      )}
                    </div>
                    <div className="tourCard__rating d-flex items-center text-13 mt-5">
                      {elm.discount && (
                        <span className="text-dark-1 me-4" style={{ fontSize: "14px", fontWeight: "700" }}>
                          Discount: {elm.discount}%
                        </span>
                      )}
                    </div>

                    <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                      <div className="d-flex items-center" style={{ fontSize: "10px", fontWeight: "700" }}>
                        <i className="icon-clock text-16 mr-5" style={{ fontSize: "10px", fontWeight: "700" }}></i>
                        <span style={{ fontSize: "12px" }}> {elm.duration}</span>
                      </div>

                      <div>
                        {elm.adultOldPrice && elm.discount && (
                          <span className="text-16 fw-500" style={{ fontSize: "14px", fontWeight: "700" }}>
                            <span style={{ fontSize: "12px" }}> New Price: $</span> <span style={{ fontSize: "14px", fontWeight: "700" }}>{(elm.adultOldPrice - (elm.adultOldPrice * elm.discount) / 100).toFixed(2)}</span>
                          </span>
                        )}
                        {elm.adultOldPrice && !elm.discount && (
                          <span className="text-16 fw-500" style={{ fontSize: "17px", fontWeight: "700" }}>
                            New Price: $   {elm.adultOldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}

        </div>
      </div>
    </section>
  );
}
