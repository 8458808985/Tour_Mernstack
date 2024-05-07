



import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import { toast } from "react-toastify";

// import Map from "../pages/contact/Map";

const tabs = ["Content", "Location", "Pricing", "Included"];
export default function AddProduct() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Content");

  const [product, setProduct]=useState({
    product:"",
    discount:"",
    oldprice: "",
    newprice: "",
    time: "",
    image:""
  });

  const inputHandler =(e)=>{
    setProduct({
      ...product,
      [e.target.name]: e.target.value
  });
  }
// console.log(formData)

   const FileHandler =(event)=>{
       setProduct({...product ,[event.target.name]: event.target.files[0]})
    console.log(event.target.files)
      }

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
const handleSubmit = async(event)=>{
       event.preventDefault();
        try {
        const form_data = new FormData();
        // console.log(form_data)
     form_data.append("product", product.product);
    form_data.append("discount", product.discount
    );
    form_data.append("book_history", product.oldprice);
    form_data.append("book_publish", product.newprice);
     form_data.append("book_category", product.time);
     form_data.append("book_images", product.image, product.image.name);

     const response = await fetch('http://localhost:5000/api/v1/product/new', {
     method:'POST',
     headers: {
        'Content-Type': 'application/json'
     },
     body: JSON.stringify(product)
 });
//  const notify = () => toast.success('Hello, world!');

         console.log(response)
       alert('product Add successfully successful');
     
  //   let book_result=  await axios.post('http://localhost:5000/api/v1/product/new', form_data)
  // //     console.log(book_result)
  // //   console.log(data.image.name)
  // //  console.log(author_result)
  // if(book_result.data.success){
  //  alert(book_result.data.message)
   }
    catch (error) {
      console.error('Error signing up:', error);
            alert('Signup failed');
    }
      }

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
            
              <h2 style={{fontSize:"18px"}}>Content <span className="text-danger">*</span></h2>

                <div className="row pt-40">
                  <div className="col-xl-9 col-lg-10">
                    <div className="tabs__content js-tabs-content">
                      <div
                        className={`tabs__pane  ${
                          activeTab == "Content" ? "is-tab-el-active" : ""
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
                              <input  required name='discount' type="number" onChange={inputHandler} />
                              <label className="lh-1 text-16 text-light-1">
                              Discount <span className="text-danger">*</span>
                              </label>
                            </div>
                          </div>
                       
                          <div className="col-6 col-sm-6 col-lg-6">
                            <div className="form-input ">
                              <input type="number" required name='oldprice' onChange={inputHandler}/>
                              <label className="lh-1 text-16 text-light-1">
                              Old Price<span className="text-danger">*</span>
                              </label>
                            </div>
                          </div>
                          <div className="col-6 col-sm-6 col-lg-6">
                            <div className="form-input ">
                              <input type="number" required  name='newprice' onChange={inputHandler}/>
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
                                   onChange={FileHandler}
                                   name="image"
                                    accept="image/*"
                                    id="imageInp1"
                                    type="file"
                                    style={{ display: "none" }}
                                  />
                                </div>
                              
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

