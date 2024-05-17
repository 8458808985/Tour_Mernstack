import React, { useEffect, useMemo, useState } from "react";
import Calender from "../common/dropdownSearch/Calender";
import {
  durations,
  languages,
  toursTypes,
  features,
  rating,
} from "@/data/tourFilteringOptions";
import RangeSlider from "../common/RangeSlider";
import Stars from "../common/Stars";
import BASE_URL from "@/Urls/baseUrl";

export default function Sidebar() {
  const [ddActives, setDdActives] = useState(["tourtype"]);
  const [solve , setSolve]=useState([])
  const [selectedTourTypes, setSelectedTourTypes] = useState([]);
  
  const [productData, setProductData] = useState([]);
useEffect(() => {
  fetch(`${BASE_URL}/product`)
    .then((res) => res.json())
    .then((data) => {
      setProductData(data);
    })
    .catch((err) => console.error("Error fetching product:", err));
}, []);

// console.log("solve" , tourTypes)
const toggleTourType = (type) => {
  setSelectedTourTypes((prevTypes) =>
    prevTypes.includes(type)
      ? prevTypes.filter((t) => t !== type)
      : [...prevTypes, type]
  );
};

// Filter products based on selected tour types
const filteredProductData = useMemo(() => {
  if (selectedTourTypes.length === 0) {
    return productData; // No filter applied, return all products
  }

  return productData.map(products => {
    // If products is not an array, return it as it is
    if (!Array.isArray(products)) {
      return products;
    }

    // Filter products within each index based on tourTypes
    return products.filter(product =>
      product && product.tourTypes && product.tourTypes.some(type => selectedTourTypes.includes(type))
    );
  });
}, [productData, selectedTourTypes]);



  console.log("Product Data:", productData);
  console.log("Selected Tour Types:", selectedTourTypes);
  console.log("fiterData", filteredProductData)

  
  const handleSeeMore = () => {
    // Implement logic for 'See More' link if needed
  };
  return (
    <div className="sidebar -type-1 rounded-12">
      <div className="sidebar__header bg-accent-1">
        <div className="text-15 text-white fw-500">When are you traveling?</div>

        <div className="mt-10">
          <div className="searchForm -type-1 -col-1 -narrow">
            <div className="searchForm__form">
              <div className="searchFormItem js-select-control js-form-dd js-calendar">
                <div className="searchFormItem__button" data-x-click="calendar">
                  <div className="pl-calendar d-flex items-center">
                    <i className="icon-calendar text-20 mr-15"></i>
                    <div>
                      <span className="js-first-date">
                        <Calender />
                      </span>
                      <span className="js-last-date"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar__content">
        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
          <div className="sidebar -type-1 rounded-12">
      <div className="sidebar__content">
        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("tourtype") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("tourtype")
                      ? pre.filter((elm) => elm !== "tourtype")
                      : [...pre, "tourtype"]
                  )
                }
              >
                <h5 className="text-18 fw-500">Tour Type</h5>
                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>
              <div
                className="accordion__content"
                style={
                  ddActives.includes("tourtype") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {toursTypes.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center">
                          <div className="form-checkbox ">
                            <input
                              type="checkbox"
                              name={elm}
                              checked={selectedTourTypes.includes(elm)}
                              onChange={() => toggleTourType(elm)}
                            />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon">
                                <img src="/img/icons/check.svg" alt="icon" />
                              </div>
                            </div>
                          </div>
                          <div className="lh-11 ml-10">{elm}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="d-flex text-15 fw-500 text-accent-2 mt-15"
                    onClick={handleSeeMore}
                  >
                    See More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("pricerange") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button mb-10 d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("pricerange")
                      ? [...pre.filter((elm) => elm != "pricerange")]
                      : [...pre, "pricerange"],
                  )
                }
              >
                <h5 className="text-18 fw-500">Filter Price</h5>

                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>

              <div
                className="accordion__content"
                style={
                  ddActives.includes("pricerange") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <RangeSlider />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("duration") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("duration")
                      ? [...pre.filter((elm) => elm != "duration")]
                      : [...pre, "duration"],
                  )
                }
              >
                <h5 className="text-18 fw-500">Duration</h5>

                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>

              <div
                className="accordion__content"
                style={
                  ddActives.includes("duration") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {durations.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center">
                          <div className="form-checkbox ">
                            <input type="checkbox" name="name" />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon">
                                <img src="/img/icons/check.svg" alt="icon" />
                              </div>
                            </div>
                          </div>

                          <div className="lh-11 ml-10">{elm}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("language") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("language")
                      ? [...pre.filter((elm) => elm != "language")]
                      : [...pre, "language"],
                  )
                }
              >
                <h5 className="text-18 fw-500">Language</h5>

                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>

              <div
                className="accordion__content"
                style={
                  ddActives.includes("language") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {languages.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center">
                          <div className="form-checkbox ">
                            <input type="checkbox" name="name" />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon">
                                <img src="/img/icons/check.svg" alt="icon" />
                              </div>
                            </div>
                          </div>

                          <div className="lh-11 ml-10">{elm}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("rating") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("rating")
                      ? [...pre.filter((elm) => elm != "rating")]
                      : [...pre, "rating"],
                  )
                }
              >
                <h5 className="text-18 fw-500">Rating</h5>

                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>

              <div
                className="accordion__content"
                style={
                  ddActives.includes("rating") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {rating.map((elm, i) => (
                      <div key={i} className="d-flex">
                        <div className="form-checkbox">
                          <input type="checkbox" name="rating" />
                          <div className="form-checkbox__mark">
                            <div className="form-checkbox__icon">
                              <img src="/img/icons/check.svg" alt="icon" />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex x-gap-5 ml-10">
                          <Stars star={elm} font={13} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("features") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("features")
                      ? [...pre.filter((elm) => elm != "features")]
                      : [...pre, "features"],
                  )
                }
              >
                <h5 className="text-18 fw-500">Specials</h5>

                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>

              <div
                className="accordion__content"
                style={
                  ddActives.includes("features") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {features.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center">
                          <div className="form-checkbox ">
                            <input type="checkbox" name="name" />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon">
                                <img src="/img/icons/check.svg" alt="icon" />
                              </div>
                            </div>
                          </div>

                          <div className="lh-11 ml-10">{elm}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
