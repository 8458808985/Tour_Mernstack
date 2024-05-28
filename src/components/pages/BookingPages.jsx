import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Razorpay from "razorpay";
import BASE_URL from "@/Urls/baseUrl";

export default function BookingPages() {
  const [booking, setBooking] = useState({});
  const [date, setDate] = useState("");
  const [price, setPrice] = useState(0);
  const [data, setData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const bookingDataString = localStorage.getItem("bookingData");
    try {
      const bookingData = JSON.parse(bookingDataString);
      setBooking(bookingData);
    } catch (error) {
      console.error("Error parsing booking data:", error);
    }
  }, []);

  useEffect(() => {
    const date = localStorage.getItem("selectedDate");
    setDate(date);
  }, []);

  useEffect(() => {
    const price = localStorage.getItem("newPrice");
    try {
      const newPrice = JSON.parse(price);
      setPrice(newPrice);
    } catch (error) {
      console.error("Error parsing booking data:", error);
    }
  }, []);

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handlePayment = async () => {
    const options = {
      key: "rzp_live_r6xgB2cMwMewpY,xwl4YJBXJ7y6Pe9zijWvfuIC", // Replace with your actual Razorpay key
      amount: price * 100, // Amount in smallest currency unit (e.g., cents)
      currency: "USD",
      name: "Your Company Name",
      description: "Booking Payment",
      image: "/your_logo.png", // Replace with your company logo
      handler: function (response) {
        // Handle successful payment
        toast.success("Your Booking is Confirmed!", {
          position: "top-center",
          autoClose: 3000,
        });
        console.log("Payment Successful!", response);
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };
  // console.log("booking", booking.imageSrc[0])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to the server
      let response = await axios.post(`${BASE_URL}/booking`, data);

      if (response.status === 200) {
        toast.success("Your Booking is Confirmed!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="layout-pt-md layout-pb-lg mt-header">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 col-sm-8">
            <div className="border-1 rounded-12 shadow-2 py-1 px-30 md:py-20 md:px-20 mt-30">
              <div>
                <h2 className="text-20 md:text-20 fw-700 text-black mt-4" >
                  Contact Details
                </h2>
                <p className="text-6 md:text-20 fw-500 text-black"> We'll use this information to send  you confirmation and updates about your booking</p>
             <p><span className="text-black" style={{fontWeight:"700", cursor: 'alias',}} > <i class="fa-solid fa-right-to-bracket mx-1"></i> Log in or Sign-up</span> for a faster checkout and to redeem available viator Rewards</p>
                <form onSubmit={handleSubmit} name="formrv">
                  <div className="row y-gap-30 contactForm pt-30">
                    <div className="col-md-6 col-lg-6 col-6">
                      <div className="form-input">
                        <input
                          type="text"
                          required
                          name="name"
                          onChange={inputHandler}
                        />
                        <label className="lh-1 text-16 text-light-1">
                          First Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-6">
                      <div className="form-input">
                        <input
                          type="text"
                          required
                          name="lastname"
                          onChange={inputHandler}
                        />
                        <label className="lh-1 text-16 text-light-1">
                          Last Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12 col-12 col-sm-12 col-lg-12">
                      <div className="form-input">
                        <input
                          type="text"
                          required
                          name="email"
                          onChange={inputHandler}
                        />
                        <label className="lh-1 text-16 text-light-1">
                          Email
                        </label>
                      </div>
                    </div>

                    <div className="col-md-12 col-12 col-sm-12 col-lg-12">
                      {/* <div className="">
                        <input
                          type="text"
                          required
                          name="phone"
                          placeholder="Enter Your Phone Number"
                          onChange={inputHandler}
                        />
                        <label className="lh-1 text-16 text-light-1">
                          Phone Number
                        </label> 
                      
                      </div>
                    */}
                    <div className="input-group mb-3">
  <button
    className="btn btn-outline-secondary dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
   +91
  </button>
  <ul className="dropdown-menu">
    <li>
      <a className="dropdown-item" href="#">
        Action
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Another action
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Something else here
      </a>
    </li>
    <li>
      <hr className="dropdown-divider" />
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Separated link
      </a>
    </li>
  </ul>
  <input
    type="text"
    name="phone"
    className="form-control"
    aria-label="Text input with dropdown button"
    onChange={inputHandler}
    placeholder="Enter Your Phone Number"
  />
</div>

                    </div>
                  </div>
                  {/* <button className="btn btn-success btn-lg mt-4 mb-5" type="submit">
                    Book Now
                  </button> */}

                  <div className="mt-12">
                    <button className="button -md -dark-1 bg-accent-1 text-white col-12 mt-4 mb-4 mx-auto" onClick={handlePayment}>
                      Complete My Order
                      <i className="icon-arrow-top-right text-16 ml-10"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-4 col-12 mt-4">
            <div className="border-1 pl-50 md:pl-0 shadow rounded-3">
              <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20">
                <h2 className="text-20 fw-500">Your booking details</h2>

                <div className=" mt-30">
                  <span style={{ width: "50px", height: "50px" }}>
                    {booking && booking.imageSrc && booking.imageSrc.length > 0 ? (
                      // If booking.imageSrc exists and has elements, render the image
                      <img src={booking.imageSrc[0]} alt="image" className="rounded-3 w-100" />
                    ) : (
                      // Otherwise, render a placeholder or an error message
                      <p>No image available</p>
                    )}
                  </span>

                  <div className="ml-2 mt-5">
                    <span className="fs-5"> {booking.product}</span>
                  </div>
                </div>

                <div className="line mt-20 mb-20"></div>

                <div className="">
                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Date:</div>
                    <div className="">{date}</div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Duration:</div>
                    <div className="">{booking.duration}</div>
                  </div>
                </div>

                <div className="line mt-20 mb-20"></div>

                <div className="">
                  <div className="d-flex items-center justify-between">
                    <div className="fw-700">Subtotal</div>
                    <div className="mb-">${price}</div>
                  </div>
                </div>
              </div>

              {/* <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20 mt-30">
                <h2 className="text-20 fw-500">Do you have a promo code?</h2>

                <div className="contactForm mt-25">
                  <div className="form-input ">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                      Promo code
                    </label>
                  </div>
                </div>

                <button className="button -md -outline-accent-1 text-accent-1 mt-30">
                  Apply
                  <i className="icon-arrow-top-right text-16 ml-10"></i>
                </button>
              </div> */}


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
