import Sidebar from "../Sidebar";
import Header from "../Header";
import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import BASE_URL from "@/Urls/baseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const tabs = ["Content", "Location", "Pricing", "Included"];
export default function AddProduct() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Content");
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/blog`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error("Error fetching tours:", err));
  }, []);
//   console.log(product);

  const [formData, setFormData] = useState({
    title: "",
    continent: "",
    author: "",
    desc: "",
    badge: "",
    imageSrc: "",
    date: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const FileHandler = (e) => {
    setFormData({ ...formData, imageSrc: e.target.files[0] });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(formData);
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("continent", formData.continent);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("desc", formData.desc);
      formDataToSend.append("badge", formData.badge);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("imageSrc", formData.imageSrc);

      const response = await fetch(
        "https://test1.buyjugaad.com/api/v1/blog/new",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      toast.success("Successfully Added ", {
        position: "top-center"
      })
      if (!response.ok) {
        throw new Error("Failed to submit form");
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
    <ToastContainer/>
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
              <h1 className="text-30">All Article</h1>
              {/* <p className="">Your products are the goods</p> */}

              {/* <!-- Button trigger modal --> */}
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i class="fa-solid fa-circle-plus"></i> Add Article
              </button>
            </div>

            {/* <!-- Modal --> */}
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content" >
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Add Article
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
                        <h2 style={{ fontSize: "18px" }}>
                          Content <span className="text-danger">*</span>
                        </h2>

                        <div className="row pt-40">
                          <div className="col-xl-9 col-lg-10">
                            <div className="tabs__content js-tabs-content">
                              <div
                                className={`tabs__pane  ${
                                  activeTab == "Content"
                                    ? "is-tab-el-active"
                                    : ""
                                }`}
                              >
                                <form
                                  method="post"
                                  onSubmit={handleSubmit}
                                  encType="multipart/form-data"
                                >
                                  <div className="contactForm row y-gap-30">
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="title"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Title{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          required
                                          name="continent"
                                          type="text"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                        continent{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="author"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                           Author
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="desc"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Description
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <div className="col-6 col-sm-12 col-lg-12">
                                          <div className="form-input ">
                                            <input
                                              type="text"
                                              required
                                              name="badge"
                                              onChange={inputHandler}
                                            />
                                            <label className="lh-1 text-16 text-light-1">
                                            Badge
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                       
                                      </div>
                                    </div>
                                    
                                    <div className="col-6 col-sm-12 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="Date"
                                          required
                                          name="date"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Date
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-12">
                                      <h4 className="text-18 fw-500 mb-20">
                                        Gallery
                                      </h4>

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
                                            name="imageSrc"
                                            accept="image/*"
                                            id="imageInp1"
                                            type="file"
                                            style={{ display: "none" }}
                                          />
                                        </div>
                                      </div>

                                      <div className="text-14 mt-20">
                                        PNG or JPG no bigger than 800px wide and
                                        tall.
                                      </div>
                                    </div>
                                  </div>
                                  <button class="btn btn-primary mt-30" type="submit">
                                    Save changes
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="layout-pt-xl">
      <div className="container">
        <div className="row justify-between items-end y-gap-10 mt-20">
          <div className="col-auto">
            {/* <h2
              data-aos="fade-up"
              data-aos-delay=""
              className="text-30 md:text-24 "
            >
              Travel Articles
            </h2> */}
          </div>

          {/* <div className="col-auto">
            <Link
              to={"/blog-list-1"}
              data-aos="fade-right"
              data-aos-delay=""
              className="buttonArrow d-flex items-center  "
            >
              <span>See all</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div> */}
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

                <div className="blogCard__content mt-30">
                  <div className="blogCard__info text-14">
                    <div className="lh-13">{elm.date}</div>
                    <div className="blogCard__line"></div>
                    <div className="lh-13">By {elm.author}</div>
                  </div>

                  <h3 className="blogCard__title text-18 fw-500 mt-10">
                    {elm.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
        </div>
      </div>
    </>
  );
}
