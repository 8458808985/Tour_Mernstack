import React, { useEffect, useState } from "react";
import Calender from "../common/dropdownSearch/Calender";

import { times } from "@/data/tourSingleContent";
import { Link, useNavigate } from "react-router-dom";

export default function TourSingleSidebar({productData}) {

  const navigate=useNavigate()
  const prices = {
    adultPrice: 94,
    youthPrice: 84,
    childrenPrice: 20,
    extraService: 40,
    servicePerPerson: 40,
  };
  const [newPrice, setNewPrice] = useState(null);
  const [adultNumber, setAdultNumber] = useState(1);
  const [youthNumber, setYouthNumber] = useState(1);
  // Function to calculate and set the new price
  const calculateNewPrice = () => {
    if (productData.adultOldPrice && productData.discount) {
      const discountedPrice = (productData.adultOldPrice - (productData.adultOldPrice * productData.discount) / 100).toFixed(2);
      setNewPrice(discountedPrice);
    } else if (productData.adultOldPrice && !productData.discount) {
      setNewPrice(productData.adultOldPrice);
    }
  };
console.log("newPrice",newPrice)

useEffect(() => {  localStorage.setItem("newPrice",    newPrice * adultNumber +
  productData.childPrice * youthNumber +

  extraCharge * 1);
}, [newPrice,adultNumber, youthNumber]);

  
// console.log(newPrice)
  // Call calculateNewPrice when component mounts
  useEffect(() => {
    calculateNewPrice();
  }, [productData]);
console.log(productData)

  const [childrenNumber, setChildrenNumber] = useState(4);
  const [isExtraService, setisExtraService] = useState(false);
  const [isServicePerPerson, setIsServicePerPerson] = useState(false);
  const [extraCharge, setExtraCharge] = useState(0);
 
 
  useEffect(() => {
    setExtraCharge(0);
    if (isExtraService) {
      setExtraCharge((pre) => pre + prices.extraService);
    }
    if (isServicePerPerson) {
      setExtraCharge((pre) => pre + prices.servicePerPerson);
    }
  }, [isExtraService, isServicePerPerson, setExtraCharge]);

  const [selectedTime, setSelectedTime] = useState("");
  const [activeTimeDD, setActiveTimeDD] = useState(false);

  const book =()=>{
    navigate("/booking-pages")
  }

  return (
    <div className="tourSingleSidebar">
      <div className="d-flex items-center">
        {/* <div>From</div>
        <div className="text-20 fw-500 ml-10">$1,200</div> */}
      </div>

      <div className="searchForm -type-1 -sidebar mt-20">
        <div className="searchForm__form">
          <div className="searchFormItem js-select-control js-form-dd js-calendar">
            <div className="searchFormItem__button" data-x-click="calendar">
              <div className="searchFormItem__icon size-50 rounded-12 bg-light-1 flex-center">
                <i className="text-20 icon-calendar"></i>
              </div>
              <div className="searchFormItem__content">
                <h5>Select</h5>
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

          {/* <div className="searchFormItem js-select-control js-form-dd">
            <div
              className="searchFormItem__button"
              onClick={() => setActiveTimeDD((pre) => !pre)}
              data-x-click="time"
            >
              <div className="searchFormItem__icon size-50 rounded-12 bg-light-1 flex-center">
                <i className="text-20 icon-clock"></i>
              </div>
              <div className="searchFormItem__content">
                <h5>Time</h5>
                <div className="js-select-control-chosen">
                  {selectedTime ? selectedTime : "Choose time"}
                </div>
              </div>
              <div className="searchFormItem__icon_chevron">
                <i className="icon-chevron-down d-flex text-18"></i>
              </div>
            </div>

            <div
              className={`searchFormItemDropdown -tour-type ${
                activeTimeDD ? "is-active" : ""
              }`}
              data-x="time"
              data-x-toggle="is-active"
            >
              <div className="searchFormItemDropdown__container">
                <div className="searchFormItemDropdown__list sroll-bar-1">
                  {times.map((elm, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedTime((pre) => (pre == elm ? "" : elm));
                        setActiveTimeDD(false);
                      }}
                      className="searchFormItemDropdown__item"
                    >
                      <button className="js-select-control-button">
                        <span className="js-select-control-choice">{elm}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <h5 className="text-18 fw-500 mb-20 mt-20">Tickets</h5>

      <div>
        <div className="d-flex items-center justify-between">
          <div className="text-14">
            Adult (18+ years){" "}
            <span className="fw-500">
              ${(newPrice * adultNumber).toFixed(2)}
            </span>
          </div>

          <div className="d-flex items-center js-counter">
            <button
              onClick={() => setAdultNumber((pre) => (pre > 0 ? pre - 1 : pre))}
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
              onClick={() => setYouthNumber((pre) => (pre > 0 ? pre - 1 : pre))}
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

      <div className="mt-15">
        <div className="d-flex items-center justify-between">
          {/* <div className="text-14">
            Children (0-12 years){" "}
            <span className="fw-500">
              ${(prices.childrenPrice * childrenNumber).toFixed(2)}
            </span>
          </div> */}

          <div className="d-flex items-center js-counter">
            {/* <button
              onClick={() =>
                setChildrenNumber((pre) => (pre > 1 ? pre - 1 : pre))
              }
              className="button size-30 border-1 rounded-full js-down"
            >
              <i className="icon-minus text-10"></i>
            </button> */}
{/* 
            <div className="flex-center ml-10 mr-10">
              <div className="text-14 size-20 js-count">{childrenNumber}</div>
            </div> */}

            {/* <button
              onClick={() => setChildrenNumber((pre) => pre + 1)}
              className="button size-30 border-1 rounded-full js-up"
            >
              <i className="icon-plus text-10"></i>
            </button> */}
          </div>
        </div>
      </div>

      {/* <h5 className="text-18 fw-500 mb-20 mt-20">Add Extra</h5> */}

      <div className="d-flex items-center justify-between">
        <div className="d-flex items-center">
          <div className="form-checkbox">
            <input
              checked={isExtraService ? true : false}
              onChange={() => setisExtraService((pre) => !pre)}
              type=""
            />
            {/* <div className="form-checkbox__mark">
              <div className="form-checkbox__icon">
                <img src="/img/icons/check.svg" alt="icon" />
              </div>
            </div> */}
          </div>
          {/* <div className="ml-10">Add Service per booking</div> */}
        </div>

        {/* <div className="text-14">$40</div> */}
      </div>

      <div className="d-flex justify-between mt-20">
        <div className="d-flex">
          <div className="form-checkbox mt-5">
            <input
              checked={isServicePerPerson ? true : false}
              onChange={() => setIsServicePerPerson((pre) => !pre)}
              type="checkbox"
            />
            {/* <div className="form-checkbox__mark">
              <div className="form-checkbox__icon">
                <img src="/img/icons/check.svg" alt="icon" />
              </div>
            </div> */}
          </div>

          {/* <div className="ml-10">
            Add Service per person
            <div className="lh-16">
              Adult: <span className="fw-500">$17.00</span> - Youth:{" "}
              <span className="fw-500">$14.00</span>
            </div>
          </div> */}
        </div>

        {/* <div className="text-14">$40</div> */}
      </div>

      <div className="line mt-20 mb-20"></div>

      <div className="d-flex items-center justify-between">
        <div className="text-18 fw-500">Total:</div>
        <div className="text-18 fw-500">
          $
          {(
            newPrice * adultNumber +
            productData.childPrice * youthNumber +

            extraCharge * 1
          ).toFixed(2)}
        </div>
      </div>

      <button className="button -md -dark-1 col-12 bg-accent-1 text-white mt-20" onClick={book}>
        Book Now
        <i className="icon-arrow-top-right ml-10"></i>
      </button>
      {/* <Link to="booking-pages" type="button" className="button -md -dark-1 col-12 bg-accent-1 text-white mt-20"> Book Now 
      <i className="icon-arrow-top-right ml-10"></i>
      </Link> */}
    </div>
  );
}
