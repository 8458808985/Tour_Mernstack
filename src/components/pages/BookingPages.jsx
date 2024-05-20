import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "@/Urls/baseUrl";
// import { bookingData } from "@/data/dashboard";


// console.log(bookingData)

export default function BookingPages() {
  const [booking, setBooking]=useState({})
  const [date, setDate]=useState()
  const [data, setData] = useState({ 
    name: "", 
    email: "", 
    phone: "" });

    useEffect(() => {
      const bookingDataString = localStorage.getItem("bookingData");
      // console.log("Booking data string:", bookingDataString);
      try {
        const bookingData = JSON.parse(bookingDataString);
        setBooking(bookingData);
      } catch (error) {
        console.error("Error parsing booking data:", error);
      }
    }, []);
    useEffect(() => {
      const date = localStorage.getItem("selectedDate");
      // console.log("Selected date string:", date);
      try {
        // const selectDate = JSON.parse(date);
        setDate(date);
      } catch (error) {
        console.error("Error parsing selected date:", error);
      }
    }, []);
    
    console.log("date", date)
   
  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // Send POST request to the server
      let response = await axios.post(`${BASE_URL}/booking`, data);

      if (response.status===200) {
        // If response is successful, reset form and show success message
         formrv.reset() 
        // formrv.reset();
        toast.success("Your Booking Confirm", {
          position: "top-center",
          autoClose: 1000,
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
          <div className="col-lg-8">
            <div className="bg-white rounded-12 shadow-2 py-1 px-30 md:py-20 md:px-20 mt-30">
              <div>
                <h2 className="text-30 md:text-24 fw-700">
                  Let us know who you are
                </h2>
                <form onSubmit={handleSubmit} name="formrv">
                  <div className="row y-gap-30 contactForm pt-30">
                    <div className="col-12">
                      <div className="form-input">
                        <input
                          type="text"
                          required
                          name="name"
                          // value={formData.name}
                          onChange={inputHandler}
                        />
                        <label className="lh-1 text-16 text-light-1">
                          Full Name
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-input">
                        <input
                          type="text"
                          required
                          name="email"
                          // value={formData.email}
                          onChange={inputHandler}
                        />
                        <label className="lh-1 text-16 text-light-1">
                          Email
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-input">
                        <input
                          type="text"
                          required
                          name="phone"
                          // value={formData.phone}
                          onChange={inputHandler}
                        />
                        <label className="lh-1 text-16 text-light-1">
                          Phone Number
                        </label>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-success btn-lg mt-4" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="pl-50 md:pl-0">
              <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20">
                <h2 className="text-20 fw-500">Your booking details</h2>

                <div className=" mt-30">
                 <span style={{width:"50", height:"50"}}> <img src={booking.imageSrc} alt="image" /></span>
                  
                  <div className="ml-2 mt-5">
                   <span className="fs-4"> {booking.product}</span>
                  </div>
                </div>

                <div className="line mt-20 mb-20"></div>

                <div className="">
                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Date:</div>
                    <div className="">{date}</div>
                  </div>

                  {/* <div className="d-flex items-center justify-between">
                    <div className="fw-500">Time:</div>
                    <div className="">10:00 am</div>
                  </div> */}

                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Duration:</div>
                    <div className="">{booking.duration}</div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Tickets:</div>
                    <div className="">Adult x2 = $98</div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="fw-500"></div>
                    <div className="">Youth x3 = $383</div>
                  </div>
{/* 
                  <div className="d-flex items-center justify-between">
                    <div className="fw-500"></div>
                    <div className="">Children x6 = $394</div>
                  </div> */}
                </div>
{/* 
                <div className="line mt-20 mb-20"></div>

                <div className="y-gap-15">
                  <div className="d-flex justify-between">
                    <div className="fw-500">Service per booking</div>
                    <div className="">$30.00</div>
                  </div>

                  <div className="d-flex justify-between">
                    <div className="fw-500">
                      Service per person 1 Adult, 2 Youth, 4 Children
                    </div>
                    <div className="">$179.00</div>
                  </div>
                </div> */}

                <div className="line mt-20 mb-20"></div>

                <div className="">
                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Subtotal</div>
                    <div className="">$382</div>
                  </div>

                  {/* <div className="d-flex items-center justify-between"> */}
                    {/* <div className="fw-500">Total</div>
                    <div className="">$23</div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Amount Paid</div>
                    <div className="">$3.482</div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Amount Due</div>
                    <div className="">$43.242</div>
                  </div> */}
                </div>
              </div>

              <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20 mt-30">
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
              </div>

              <div className="mt-30">
                <button className="button -md -dark-1 bg-accent-1 text-white col-12">
                  Complete My Order
                  <i className="icon-arrow-top-right text-16 ml-10"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
