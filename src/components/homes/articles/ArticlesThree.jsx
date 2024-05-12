import { articles } from "@/data/articles";
import { blogs } from "@/data/blogs";

import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BASE_URL from "@/Urls/baseUrl";


export default function ArticlesThree() {
  const [blog, setBlog] = useState([]);


  useEffect(() => {
    fetch(`${BASE_URL}/blog`)
      .then(res => res.json())
      .then(data => setBlog(data))
      .catch(err => console.error('Error fetching tours:', err));
  }, []);
  return (
    <section className="layout-pt-xl">
      <div className="container">
        <div className="row justify-between items-end y-gap-10 mt-20">
          <div className="col-auto">
            <h2
              data-aos="fade-up"
              data-aos-delay=""
              className="text-30 md:text-24 " style={{fontSize:"700"}}
            >
              Travel Articles
            </h2>
          </div>

          <div className="col-auto">
            <Link
              to={"/blog-list-1"}
              data-aos="fade-right"
              data-aos-delay=""
              className="buttonArrow d-flex items-center  "
            >
              <span style={{fontSize:"20px", fontWeight:"700"}}>See all</span>
              <i className="icon-arrow-top-right text-16 ml-10" style={{fontSize:"20px", fontWeight:"700"}}></i>
            </Link>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay=""
          className="row y-gap-30 pt-40 sm:pt-20"
        >
          {blog.slice(0, 3).map((elm, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <Link to={`/blog-single/${elm.id}`} className="blogCard -type-1">
                <div className="blogCard__image ratio ratio-41:30">
                  <img
                    src={elm.imageSrc}
                    alt="image"
                    className="img-ratio rounded-12"
                  />

                  <div className="blogCard__badge">{elm.badge}</div>
                 
                </div>

                <div className="blogCard__content mt-30" >
                  <div className="blogCard__info text-14" >
                    <div className="lh-13" style={{fontSize:"18px",fontWeight:"700"}}>{elm.date}</div>
                    <div className="blogCard__line" style={{fontSize:"18px"}}></div>
                    <div className="lh-13" style={{fontSize:"18px"}}>By {elm.author}</div>
                  </div>

                  <h3 className="blogCard__title text-18 fw-500 mt-10" style={{fontSize:"20px",fontWeight:"700"}}>
                    {elm.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

