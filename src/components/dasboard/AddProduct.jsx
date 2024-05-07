



import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



// import Map from "../pages/contact/Map";

const tabs = ["Content", "Location", "Pricing", "Included"];
export default function AddProduct() {
  // const [book , setBook] = useState({
  //   "book_title":"",
  //   "book_author":"",
  //   "book_publish":"",
  //   "book_price":"",
  //   "book_category":"",
  //   "book_image":"",
  //   "book_document":""
  //     })
    
  //   const inputvalue =(event)=>{
  //       setBook({...book ,[event.target.name]: event.target.value})
  //   }
  //   const FileHandler =(event)=>{
  //      setBook({...book ,[event.target.name]: event.target.files[0]})
  //   console.log(event.target.files)
  //     }
    
  //   const Add_book = async(event)=>{
  //     event.preventDefault();
  //     try {
  //       const form_data = new FormData();
  //       // console.log(form_data)
  //   form_data.append("book_title", book.book_title);
  //   form_data.append("book_author", book.book_author);
  //   form_data.append("book_history", book.book_history);
  //   form_data.append("book_publish", book.book_publish);
  //   form_data.append("book_category", book.book_category);
  //   form_data.append("book_price", book.book_price);
  //   form_data.append("book_images", book.book_image, book.book_image.name);
  //   form_data.append("book_document", book.book_document, book.book_document.name);
  //   //  await axios.post(http://localhost:4000/author, authore)
  //   let book_result=  await axios.post('http://localhost:4000/add_books', form_data)
  //   // console.log(book_result)
  //   //  console.log(data.image.name)
  //   //  console.log(author_result)
  //   // if(book_result.data.success){
  //   // alert(book_result.data.message)
  //   // }
  //   } catch (error) {
        
  //   }
  //     }
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Content");
  const [formData, setFormData] = useState({
    product: "",
    discount: '',
    oldprice: '',
    newprice: '',
    time: '',
  });

  const inputHandler = (e) => {
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
        className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""} js-dashboard`}>
        <Sidebar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <div className="row">
              <div className="col-md-6">
                <h1 className="text-30">Add Product</h1>
                <p className="">Your products are the goods</p>
              </div>
              <div className="col-md-6 col-sm-6 col-12">
                <div className="text-end me-4">
                  <button className="btn" style={{ fontWeight: "600", color: "white", backgroundColor: "#78006E", }} >Add Product</button>
                </div>  
              </div>
            </div>


            


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
                <h2 style={{ fontSize: "18px" }}>Content <span className="text-danger">*</span></h2>
                <div className="row pt-40">
                  <div className="col-xl-9 col-lg-10">
                    <div className="tabs__content js-tabs-content">
                      <div
                        className={`tabs__pane  ${activeTab == "Content" ? "is-tab-el-active" : ""
                          }`}
                      >
                        <form action="" onSubmit={handleSubmit}>
                          <div className="contactForm row y-gap-30">
                            <div className="col-6 col-sm-6 col-lg-6">
                              <div className="form-input ">
                                <input type="text" required name="product" onChange={inputHandler} />
                                <label className="lh-1 text-16 text-light-1">
                                  Product Name <span className="text-danger">*</span>
                                </label>
                              </div>
                            </div>
                            <div className="col-6 col-sm-6 col-lg-6">
                              <div className="form-input ">
                                <input required name='discount' type="number" onChange={inputHandler} />
                                <label className="lh-1 text-16 text-light-1">
                                  Discount <span className="text-danger">*</span>
                                </label>
                              </div>
                            </div>

                            <div className="col-6 col-sm-6 col-lg-6">
                              <div className="form-input ">
                                <input type="number" required name='oldprice' onChange={inputHandler} />
                                <label className="lh-1 text-16 text-light-1">
                                  Old Price<span className="text-danger">*</span>
                                </label>
                              </div>
                            </div>
                            <div className="col-6 col-sm-6 col-lg-6">
                              <div className="form-input ">
                                <input type="number" required name='newprice' onChange={inputHandler} />
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
                                <input type="Date" required name='time' onChange={inputHandler} />
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
                                ) :
                                  (
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
                                {/* {image2 ? (
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
                              )} */}
                              </div>

                              <div className="text-14 mt-20">
                                PNG or JPG no bigger than 800px wide and tall.
                              </div>
                            </div>

                            <div className="col-12">
                              <button type="submit" className="button -md -dark-1 bg-accent-1 text-white">
                                Save Changes
                                <i className="icon-arrow-top-right text-16 ml-10"></i>
                              </button>
                            </div>
                          </div>
                        </form>
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

