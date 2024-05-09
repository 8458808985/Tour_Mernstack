import BASE_URL from "@/Urls/baseUrl";
import Calender from "@/components/common/dropdownSearch/Calender";
import Location from "@/components/common/dropdownSearch/Location";
import TourType from "@/components/common/dropdownSearch/TourType";

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero1() {
  const [heroBanner, setHeroBanner]=useState([])
  useEffect(() => {
    fetch(`${BASE_URL}/banner`)
      .then(res => res.json())
      .then((data)=>{
        setHeroBanner(data);
        // setTotalPages(Math.ceil(data.length/6))
      })
      .catch(err => console.error('Error fetching tours:', err));
  }, []);

  console.log(heroBanner)
  const navigate = useNavigate();
  const [currentActiveDD, setCurrentActiveDD] = useState("");
  const [location, setLocation] = useState("");
  const [calender, setCalender] = useState("");
  const [tourType, setTourType] = useState("");
  useEffect(() => {
    setCurrentActiveDD("");
  }, [location, calender, tourType, setCurrentActiveDD]);

  const dropDownContainer = useRef();
  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setCurrentActiveDD("");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section className="hero -type-1 p-0 m-0">
      <div className="hero__bg">
        <img src="/img/hero/1/1.png" alt="image" />
        {/* <img
          src="/img/hero/1/shape.svg"
          alt="image"
          style={{ height: "auto" }}
        /> */}
      </div>

      <div className="container-fluid">
        <div className="row justify-center">
          <div className="col-xl-12 col-lg-12 col-sm-12">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {heroBanner.map((elm, i) => (
                <div className="carousel-item active">
                
                  <img src={elm.banner} className="d-block w-100" style={{ marginTop: "70px" }} key={i} alt="..." />
                            
</div>
                            ))}

                {/* <div className="carousel-item">
                  <img src="https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1670577678/banner/tvhfgpkiapfldzoaj8ll.webp" className="d-block w-100" style={{ marginTop: "70px" }} alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1670577664/banner/rtw7fgqatgoc1vpcpamb.webp" className="d-block w-100" style={{ marginTop: "70px" }} alt="..." />
                </div> */}
                <div className="position-absolute mb-1 mt-1 top-50 start-50 translate-middle text-wrap w-75 py-4">
                  <h2 className="text-light">Your world of joy</h2>
                  <p className="fadeInUp text-light" style={{ fontSize: "20px" }}>From local escapes to far-flung adventures, find what makes you happy anytime, anywhere</p>
                  <div className="input-group mb-3 mt-3 w-75">
                    <span className="input-group-text" id="basic-addon1">
                    <i class="fa-solid fa-magnifying-glass py-2"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control bg-white py-2"
                      placeholder="search destination activity"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                     <span class="input-group-text text-light" style={{backgroundColor:"black"}} >Search</span>
                  </div>

                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            {/* <div className="hero__content">
              <h1
                data-aos={"fade-up"}
                data-aos-delay="100"
                className="hero__title"
              >
                Your world of joy
              </h1>

              <p
                data-aos={"fade-up"}
                data-aos-delay="300"
                className="hero__text"
              >
                From local escapes to far-flung adventures, find what makes you
                happy anytime, anywhere
              </p>

              <div
                ref={dropDownContainer}
                data-aos={"fade-up"}
                data-aos-delay="300"
                className="mt-60 md:mt-35"
              >
                <div className="searchForm -type-1">
                  <div className="searchForm__form">
                    <div className="searchFormItem js-select-control js-form-dd">
                      <div
                        className="searchFormItem__button"
                        onClick={() =>
                          setCurrentActiveDD((pre) =>
                            pre == "location" ? "" : "location",
                          )
                        }
                      >
                        <div className="searchFormItem__icon size-50 rounded-12 border-1 flex-center ">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="searchFormItem__content d-flex mx-3">
                          <h5>Search Destination Activity</h5>
                          <div className="js-select-control-chosen mx-3">
                            {location ? location : "Search destinations"}
                          </div>
                        </div>
                      </div>

                      <Location
                        setLocation={setLocation}
                        active={currentActiveDD === "location"}
                      />
                    </div>

                   <div className="searchFormItem js-select-control js-form-dd js-calendar">
                      <div
                        className="searchFormItem__button"
                        onClick={() =>
                          setCurrentActiveDD((pre) =>
                            pre == "calender" ? "" : "calender",
                          )
                        }
                      >
                        <div className="searchFormItem__icon size-50 rounded-12 border-1 flex-center">
                          <i className="text-20 icon-calendar"></i>
                        </div>
                        <div className="searchFormItem__content">
                          <h5>When</h5>
                          <div>
                            <span className="js-first-date">
                              <Calender
                                active={currentActiveDD === "calender"}
                              />
                            </span>
                            <span className="js-last-date"></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="searchFormItem js-select-control js-form-dd">
                      <div
                        className="searchFormItem__button"
                        onClick={() =>
                          setCurrentActiveDD((pre) =>
                            pre == "tourType" ? "" : "tourType",
                          )
                        }
                      >
                        <div className="searchFormItem__icon size-50 rounded-12 border-1 flex-center">
                          <i className="text-20 icon-flag"></i>
                        </div>
                        <div className="searchFormItem__content">
                          <h5>Tour Type</h5>
                          <div className="js-select-control-chosen">
                            {tourType ? tourType : "All tour"}
                          </div>
                        </div>
                      </div>

                      <TourType
                        setTourType={setTourType}
                        active={currentActiveDD === "tourType"}
                      />
                    </div> 
                  </div>

                  <div className="searchForm__button">
                    <button
                      onClick={() => navigate("/tour-list-1")}
                      className="button -dark-1 bg-accent-1 text-white"
                    >
                      <i className="icon-search text-16 mr-10"></i>
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
