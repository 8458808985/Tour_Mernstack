import React, { useEffect, useState } from "react";
import Calender from "../common/dropdownSearch/Calender";

import { times } from "@/data/tourSingleContent";
import { useParams } from "react-router-dom";
import BASE_URL from "@/Urls/baseUrl";

export default function TourSingleSidebar() {
  const [productData, setProductData] = useState([]);
  const { id } = useParams(); // Destructure id from useParams

  useEffect(() => {
    fetch(`${BASE_URL}/product/${id}`)
      .then(res => res.json())
      .then(data => setProductData(data))
      .catch(err => console.error('Error fetching product:', err));
  }, [id]);

  const [adultNumber, setAdultNumber] = useState(3);
  const [youthNumber, setYouthNumber] = useState(2);
  
  return (
    <div className="tourSingleSidebar">
      <div className="searchForm -type-1 -sidebar mt-20">
        <div className="searchForm__form">
          <div className="searchFormItem js-select-control js-form-dd js-calendar">
            <div className="searchFormItem__button" data-x-click="calendar">
              <div className="searchFormItem__icon size-50 rounded-12 bg-light-1 flex-center">
                <i className="text-20 icon-calendar"></i>
              </div>
              <div className="searchFormItem__content">
                <h5>Selected Date</h5>
                <div>
                  <span className="js-first-date">
                    <Calender />
                  </span>
                  <span className="js-last-date"></span>
                </div>
              </div>
              <div className="searchFormItem__icon_chevron">
                <i className="icon-chevron-down d-flex text-18"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h5 className="text-18 fw-500 mb-20 mt-20">Tickets</h5>
      <div>
        <div className="d-flex items-center justify-between">
          <div className="text-14">
            Adult (18+ years){" "}
            <span className="fw-500">
              ${(productData.adultOldPrice * adultNumber).toFixed(2)}
            </span>
          </div>

          <div className="d-flex items-center js-counter">
            <button
              onClick={() => setAdultNumber((pre) => (pre > 1 ? pre - 1 : pre))}
              className="button size-30 border-1 rounded-full js-down"
            >
              <i className="icon-minus text-10"></i>
            </button>

            <div className="flex-center ml-10 mr-10">
              <div className="text-14 size-20 js-count">{adultNumber}</div>
            </div>

            <button
              onClick={() => setAdultNumber((pre) => pre + 1)}
              className="button size-30 border-1 rounded-full js-up"
            >
              <i className="icon-plus text-10"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-15">
        <div className="d-flex items-center justify-between">
          <div className="text-14">
            Youth (13-17 years){" "}
            <span className="fw-500">
              ${(productData.childPrice * youthNumber).toFixed(2)}
            </span>
          </div>

          <div className="d-flex items-center js-counter">
            <button
              onClick={() => setYouthNumber((pre) => (pre > 1 ? pre - 1 : pre))}
              className="button size-30 border-1 rounded-full js-down"
            >
              <i className="icon-minus text-10"></i>
            </button>

            <div className="flex-center ml-10 mr-10">
              <div className="text-14 size-20 js-count">{youthNumber}</div>
            </div>

            <button
              onClick={() => setYouthNumber((pre) => pre + 1)}
              className="button size-30 border-1 rounded-full js-up"
            >
              <i className="icon-plus text-10"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-between mt-20">
        <div className="d-flex">
        
        </div>
      </div>

      <div className="line mt-20 mb-20"></div>

      <div className="d-flex items-center justify-between">
        <div className="text-18 fw-500">Total:</div>
        <div className="text-18 fw-500">
          $
          {(
            productData.adultOldPrice * adultNumber +
            productData.childPrice * adultNumber 
       
          ).toFixed(2)}
        </div>
      </div>

      <button className="button -md -dark-1 col-12 bg-accent-1 text-white mt-20" type="submit"> 
        Book Now
        <i className="icon-arrow-top-right ml-10"></i>
      </button>
    </div>
  );
}