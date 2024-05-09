import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BASE_URL from "@/Urls/baseUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import axios, { Axios } from "axios";
import { Link } from "react-router-dom";

// import Map from "../pages/contact/Map";

const tabs = ["Content", "Location", "Pricing", "Included"];
export default function Add_destination() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Content");
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/destination`)
      .then(res => res.json())
      .then(data => setDestinations(data))
      .catch(err => console.error('Error fetching tours:', err));
  }, []);
  
  const [formData, setFormData] = useState({
    name: "",
    imageSrc: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const FileHandler = (e) => {
    setFormData({ ...formData, imageSrc: e.target.files[0] });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(formData)
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('imageSrc', formData.imageSrc);

      const response = await fetch('https://test1.buyjugaad.com/api/v1/destination/new', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitted(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div
        className={`dashboard ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard`}
      >
        <Sidebar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <div className="d-flex justify-content-between ">
              <h1 className="text-30">All Destination</h1>

              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                <i class="fa-solid fa-circle-plus"></i> Add destination
              </button>
            </div>

            {/* <!-- Modal --> */}
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Add Destination
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div className="rounded-12 bg-white shadow-2 px-10 pt-10 pb-10 mt-10">
                      <div className="tabs -underline-2 js-tabs">
                        <div className="row pt-10">
                          <div className="col-xl-9 col-lg-10">
                            <div className="tabs__content js-tabs-content">
                              <div
                                className={`tabs__pane  ${
                                  activeTab == "Content"
                                    ? "is-tab-el-active"
                                    : ""
                                }`}
                              >
                                <form action="" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
                                  <div className="contactForm row y-gap-30">
                                    <h4 className="text-18 fw-500 mb-2">
                                      Gallery
                                    </h4>
                                    <div class="input-group mb-3">
                                      <div class="input-group mb-3">
                                        <input
                                          type="file"
                                          onChange={FileHandler}
                                          name="imageSrc"
                                          class="form-control"
                                          id="inputGroupFile02"
                                        />
                                        <label
                                          class="input-group-text"
                                          for="inputGroupFile02"
                                        >
                                          Upload
                                        </label>
                                      </div>
                                      <div className="col-6 col-sm-12 col-lg-12 mt-5">
                                        <div className="form-input ">
                                          <input
                                            type="text"
                                            required
                                            name="name"
                                            onChange={handleChange}
                                            value={formData.name}
                                          />
                                          <label className="lh-1 text-16 text-light-1">
                                            Name
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                        </div>
                                        <div class="modal-footer">
                    
                                      </div>
                                    </div>
                                  </div>
                                  <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="layout-pt-xl">
      <div className="container">
        <div className="row y-gap-10 justify-between items-end">
          <div className="col-auto">
            {/* <h2 data-aos="fade-up" className="text-30 md:text-24">
              Trending destinations 
            </h2> */}
          </div>

          <div data-aos="fade-up" className="col-auto">
            <Link
              to={"/tour-list-1"}
              className="buttonArrow d-flex items-center "
            >
              <span>See all</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div>
        </div>

        <div
          data-aos="fade-up"
          className="overflow-hidden pt-40 sm:pt-20 js-section-slider"
        >
          <div className="swiper-wrapper">
            <Swiper
              spaceBetween={30}
              className="w-100"
              pagination={{
                el: ".pbutton1",
                clickable: true,
              }}
              modules={[Navigation, Pagination]}
              breakpoints={{
                500: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 6,
                },
                1200: {
                  slidesPerView: 8,
                },
              }}
            >
              {destinations.slice(0, 8).map((elm, i) => (
                <SwiperSlide key={i}>
                  <a
                    href="#"
                    className="featureImage -type-1 text-center -hover-image-scale mx-5" 
                  >
                    <div className="featureImage__image mx-50 rounded-full -hover-image-scale__image" >
                      <img
                        src={elm.imageSrc}
                        alt="image"
                        className="size-130 object-cover rounded-full"
                      />
                    </div>

                    <h3 className="featureImage__title text-16 fw-500 mt-20">
                      {elm.name}
                    </h3>
                    {/* <p className="featureImage__text text-14">
                      {elm.tourCount}+ Tours
                    </p> */}
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="pagination -type-1 justify-center pt-60 md:pt-40 js-dest-pagination swiperPagination1">
            <div className="pagination__button pbutton1"></div>
          </div>
        </div>
      </div>
    </section>
        </div>
      </div>
    </>
  );
}
