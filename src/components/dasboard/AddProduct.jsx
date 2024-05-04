// import React, { useState } from 'react'

// const AddProduct = () => {
//   const [formData, setFormData]=useState({
//     discount:'',
//     oldprice: '',
//     newprice: '',
//     time: '',
//   });

//   const inputHandler =(e)=>{
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//   });
//   }
// console.log(formData)
// const handleSubmit =async (e) => {
//   e.preventDefault();
//   try {
//    const response = await fetch('http://localhost:5000/api/v1/product/new', {
//     method:'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(formData)
// });

//         console.log(response)
//       alert('product Add successfully successful');
//   } catch (error) {
//       console.error('Error signing up:', error);
//       alert('Signup failed');
//   }
// };
//   return (
//     <>
//     <div className="card_section">
//   <div className="container">
//     <div className="row">
//       <h2 className="mt-3 mb-2" style={{ fontWeight: 700, fontSize: 18 }}>
//         Product card form
//       </h2>
//       <form action="" onSubmit={handleSubmit}>
//       <div className="col-md-6 col-sm-6 col-12 mt-1 mb-1">
//         <label htmlFor="exampleInputEmail1" className="form-label">
//           City <span className="text-danger ">*</span>{" "}
//         </label>
//         <select className="form-select" aria-label="Default select example">
//           <option selected="">City </option>
//           <option value={1}>One</option>
//           <option value={2}>Two</option>
//           <option value={3}>Three</option>
//         </select>
//       </div>
//       <div className="col-md-6 col-sm-6 col-12  mt-1 mb-1">
//         <label
//           htmlFor="exampleInputEmail1"
//           style={{ fontWeight: 700, fontSize: 14 }}
//           className="form-label"
//         >
//           Country <span className="text-danger ">*</span>{" "}
//         </label>
//         <select className="form-select" aria-label="Default select example">
//           <option selected="">Country</option>
//           <option value={1}>One</option>
//           <option value={2}>Two</option>
//           <option value={3}>Three</option>
//         </select>
//       </div>
//       <div className="col-md-6 col-sm-6 col-12  mt-1 mb-1">
//         <form>
//           <div className="mb-3">
//             <label
//               htmlFor="exampleInputEmail1"
//               style={{ fontWeight: 700, fontSize: 14 }}
//               className="form-label"
//             >
//               Discount <span className="text-danger ">*</span>{" "}
//             </label>
//             <input
//             name='discount'
//               type="number"
//               className="form-control"
//               placeholder="Discount"
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//               onChange={inputHandler}
//             />
//           </div>
//         </form>
//       </div>
//       <div className="col-md-6 col-sm-6 col-12  mt-1 mb-1">
//         <form>
//           <div className="mb-3">
//             <label
//               htmlFor="exampleInputEmail1"
//               style={{ fontWeight: 700, fontSize: 14 }}
//               className="form-label"
//             >
//               Old price <span className="text-danger ">*</span>
//             </label>
//             <input
//             name='oldprice'
//               type="number"
//               className="form-control"
//               placeholder="Old price "
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//               onChange={inputHandler}
//             />
//           </div>
//         </form>
//       </div>
//       <div className="col-md-6 col-sm-6 col-12  mt-1 mb-1">
//         <form>
//           <div className="mb-3">
//             <label
//               htmlFor="exampleInputEmail1"
//               style={{ fontWeight: 700, fontSize: 14 }}
//               className="form-label"
//             >
//               New price <span className="text-danger ">*</span>{" "}
//             </label>
//             <input
//             name='newprice'
//               onChange={inputHandler}
//               type="number"
//               className="form-control"
//               placeholder="New price "
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//             />
//           </div>
//         </form>
//       </div>
//       <div className="col-md-6 col-sm-6 col-12  mt-1 mb-1">
//         <form>
//           <div className="mb-3">
//             <label
//               htmlFor="exampleInputEmail1"
//               style={{ fontWeight: 700, fontSize: 14 }}
//               className="form-label"
//             >
//               Time/hours <span className="text-danger ">*</span>{" "}
//             </label>
//             <input
//               name='time'
//               onChange={inputHandler}
//               type="time"
//               className="form-control"
//               step={3600000}
//               placeholder="New price "
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//             />
//           </div>
//         </form>
//       </div>
//       <div className="col-md-6 col-sm-6 col-12  mt-1 mb-1"></div>
//       <div className="col-md-6 col-sm-6 col-12  mt-1 mb-1 text-end">
//         <button type='submit' className="btn btn-success w-25"> Submit</button>
//       </div>
//       </form>
//     </div>
//   </div>
// </div>
//     </>
//   )
// }

// export default AddProduct





import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

import Map from "../pages/contact/Map";

const tabs = ["Content", "Location", "Pricing", "Included"];
export default function AddProduct() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Content");
  const [formData, setFormData]=useState({
    discount:'',
    oldprice: '',
    newprice: '',
    time: '',
  });

  const inputHandler =(e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
  });
  }
console.log(formData)
const handleSubmit =async (e) => {
  e.preventDefault();
  try {
   const response = await fetch('http://localhost:5000/api/v1/product/new', {
    method:'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
});

        console.log(response)
      alert('product Add successfully successful');
  } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed');
  }
};

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("/img/dashboard/addtour/1.jpg");
  const [image3, setImage3] = useState("/img/dashboard/addtour/2.jpg");
  const [image4, setImage4] = useState("/img/dashboard/addtour/3.jpg");

  const handleImageChange = (event, func) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        func(reader.result);
      };

      reader.readAsDataURL(file);
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
            <h1 className="text-30">Add Product</h1>
            <p className="">Your products are the goods</p>

            <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-60">
              <div className="tabs -underline-2 js-tabs">
                {/* <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
                  {tabs.map((elm, i) => (
                    <div
                      onClick={() => setActiveTab(elm)}
                      key={i}
                      className="col-auto"
                    >
                      <button
                        className={`tabs__button text-20 lh-12 fw-500 pb-15 lg:pb-0 js-tabs-button ${
                          activeTab == elm ? "is-tab-el-active" : ""
                        }`}
                      >
                        {i + 1}. {elm}
                      </button>


                    </div>
                  ))}
                </div> */}
              <h2 style={{fontSize:"18px"}}>Content <span className="text-danger">*</span></h2>

                <div className="row pt-40">
                  <div className="col-xl-9 col-lg-10">
                    <div className="tabs__content js-tabs-content">
                      <div
                        className={`tabs__pane  ${
                          activeTab == "Content" ? "is-tab-el-active" : ""
                        }`}
                      >
                        <div className="contactForm row y-gap-30">
                        <div className="col-6 col-sm-6 col-lg-6">
                            <div className="form-input ">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                              Product Name <span className="text-danger">*</span>
                              </label>
                            </div>
                          </div> 
                          <div className="col-6 col-sm-6 col-lg-6">
                            <div className="form-input ">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                              Discount <span className="text-danger">*</span>
                              </label>
                            </div>
                          </div>
                       
                          <div className="col-6 col-sm-6 col-lg-6">
                            <div className="form-input ">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                              Old Price<span className="text-danger">*</span>
                              </label>
                            </div>
                          </div>
                          <div className="col-6 col-sm-6 col-lg-6">
                            <div className="form-input ">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                             New Price<span className="text-danger">*</span>
                              </label>
                            </div>
                          </div>
                          <div className="col-6 col-sm-6 col-lg-6">
                            <div className="form-input ">
                           
                            <select class="form-select" aria-label="Default select example">
                            <option selected>City

                            </option>
                            <option value="1">Indore</option>
                           
                          </select>
                            
                            </div>
                          </div>
                          <div className="col-6 col-sm-6 col-lg-6">
                            <div className="form-input ">
                           
                            <select class="form-select" aria-label="Default select example">
                            <option selected>Country

                            </option>
                            <option value="1">India</option>
                           
                          </select>
                            
                            </div>
                          </div>
                          <div className="col-6 col-sm-6 col-lg-6">
                            <div className="form-input ">
                              <input type="Date" required name='time' onChange={inputHandler}/>
                              <label className="lh-1 text-16 text-light-1">
                              Date<span className="text-danger">*</span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="col-12">
                            <h4 className="text-18 fw-500 mb-20">Gallery</h4>

                            <div className="row x-gap-20 y-gap-20">
                              {image1 ? (
                                <div className="col-auto  ">
                                  <div className="relative">
                                    <img
                                      src={image1}
                                      alt="image"
                                      className="size-200 rounded-12 object-cover"
                                    />
                                    <button
                                      onClick={() => {
                                        setImage1("");
                                      }}
                                      className="absoluteIcon1 button -dark-1"
                                    >
                                      <i className="icon-delete text-18"></i>
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="col-auto  ">
                                  <label
                                    htmlFor="imageInp1"
                                    className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                                  >
                                    <img
                                      alt="image"
                                      src={"/img/dashboard/upload.svg"}
                                    />

                                    <div className="text-16 fw-500 text-accent-1 mt-10">
                                      Upload Images
                                    </div>
                                  </label>
                                  <input
                                    onChange={(e) =>
                                      handleImageChange(e, setImage1)
                                    }
                                    accept="image/*"
                                    id="imageInp1"
                                    type="file"
                                    style={{ display: "none" }}
                                  />
                                </div>
                              )}
                              {image2 ? (
                                <div className="col-auto  ">
                                  <div className="relative">
                                    <img
                                      src={image2}
                                      alt="image"
                                      className="size-200 rounded-12 object-cover"
                                    />
                                    <button
                                      onClick={() => {
                                        setImage2("");
                                      }}
                                      className="absoluteIcon1 button -dark-1"
                                    >
                                      <i className="icon-delete text-18"></i>
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="col-auto  ">
                                  <label
                                    htmlFor="imageInp2"
                                    className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                                  >
                                    <img
                                      alt="image"
                                      src={"/img/dashboard/upload.svg"}
                                    />

                                    <div className="text-16 fw-500 text-accent-1 mt-10">
                                      Upload Images
                                    </div>
                                  </label>
                                  <input
                                    onChange={(e) =>
                                      handleImageChange(e, setImage2)
                                    }
                                    accept="image/*"
                                    id="imageInp2"
                                    type="file"
                                    style={{ display: "none" }}
                                  />
                                </div>
                              )}
                              {image3 ? (
                                <div className="col-auto ">
                                  <div className="relative">
                                    <img
                                      src={image3}
                                      alt="image"
                                      className="size-200 rounded-12 object-cover"
                                    />
                                    <button
                                      onClick={() => {
                                        setImage3("");
                                      }}
                                      className="absoluteIcon1 button -dark-1"
                                    >
                                      <i className="icon-delete text-18"></i>
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="col-auto ">
                                  <label
                                    htmlFor="imageInp3"
                                    className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                                  >
                                    <img
                                      alt="image"
                                      src={"/img/dashboard/upload.svg"}
                                    />

                                    <div className="text-16 fw-500 text-accent-1 mt-10">
                                      Upload Images
                                    </div>
                                  </label>
                                  <input
                                    onChange={(e) =>
                                      handleImageChange(e, setImage3)
                                    }
                                    accept="image/*"
                                    id="imageInp3"
                                    type="file"
                                    style={{ display: "none" }}
                                  />
                                </div>
                              )}
                              {image4 ? (
                                <div className="col-auto ">
                                  <div className="relative">
                                    <img
                                      src={image4}
                                      alt="image"
                                      className="size-200 rounded-12 object-cover"
                                    />
                                    <button
                                      onClick={() => {
                                        setImage4("");
                                      }}
                                      className="absoluteIcon1 button -dark-1"
                                    >
                                      <i className="icon-delete text-18"></i>
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="col-auto ">
                                  <label
                                    htmlFor="imageInp4"
                                    className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                                  >
                                    <img
                                      alt="image"
                                      src={"/img/dashboard/upload.svg"}
                                    />

                                    <div className="text-16 fw-500 text-accent-1 mt-10">
                                      Upload Images
                                    </div>
                                  </label>
                                  <input
                                    onChange={(e) =>
                                      handleImageChange(e, setImage4)
                                    }
                                    accept="image/*"
                                    id="imageInp4"
                                    type="file"
                                    style={{ display: "none" }}
                                  />
                                </div>
                              )}
                            </div>

                            <div className="text-14 mt-20">
                              PNG or JPG no bigger than 800px wide and tall.
                            </div>
                          </div>

                          <div className="col-12">
                            <button className="button -md -dark-1 bg-accent-1 text-white">
                              Save Changes
                              <i className="icon-arrow-top-right text-16 ml-10"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                    
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-30">
              © Copyright Viatours {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

