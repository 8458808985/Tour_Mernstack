import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "@/Urls/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Pagination from "../common/Pagination";
import { Button, Modal } from "react-bootstrap";

const tabs = ["Content", "Location", "Pricing", "Included"];
export default function AddProduct() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Content");
  const [product, setProduct] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [tourToDelete, setTourToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // console.log(pageCount)

  //handle next
  const handleNext = () => {
    if (page === pageCount) return page;
    setPage(page + 1);
  };
  //handle previos
  const handlePre = () => {
    if (page === 1) return page;
    setPage(page - 1);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/product`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching tours:", err));
  }, [page, product]);

  //pagination useEffect
  useEffect(() => {
    const pagedatacount = Math.ceil(product.length / 6);
    setPageCount(pagedatacount);

    if (page) {
      const LIMIT = 6;
      const skip = LIMIT * page;
      const dataskip = product.slice(page === 1 ? 0 : skip - LIMIT, skip);
      setPageData(dataskip);
    }
  }, [product]);

  const [formData, setFormData] = useState({
    product: "",
    included: [""],
    tourType: [""],
    discount: "",
    adultOldPrice: "",
    adultNewPrice: "",
    time: "",
    imageSrc: [],
    city: "",
    country: "",
    rating: "",
    duration: "",
    childPrice: "",
    ages: "",
    languages: "",
    tourOverview: "",
    tourMap: "",
    faq: [{ question: "", answer: "" }],
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageSrc: files,
    }));
  };

  const handleAddTourType = () => {
    setFormData({ ...formData, tourType: [...formData.tourType, ""] });
  };

  const handleRemoveTourType = (index) => {
    setFormData({
      ...formData,
      tourType: formData.tourType.filter((_, i) => i !== index),
    });
  };

  const handleTourTypeChange = (index, value) => {
    const newTourTypes = [...formData.tourType];
    newTourTypes[index] = value;
    setFormData({ ...formData, tourType: newTourTypes });
  };

  const handleAddIncluded = () => {
    setFormData({ ...formData, included: [...formData.included, ""] });
  };

  const handleRemoveIncluded = (index) => {
    setFormData({
      ...formData,
      included: formData.included.filter((_, i) => i !== index),
    });
  };

  const handleIncludedChange = (index, value) => {
    const newIncluded = [...formData.included];
    newIncluded[index] = value;
    setFormData({ ...formData, included: newIncluded });
  };

  const handleAddFaq = () => {
    setFormData({
      ...formData,
      faq: [...formData.faq, { question: "", answer: "" }],
    });
  };

  const handleRemoveFaq = (index) => {
    setFormData({
      ...formData,
      faq: formData.faq.filter((_, i) => i !== index),
    });
  };

  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...formData.faq];
    newFaqs[index][field] = value;
    setFormData({ ...formData, faq: newFaqs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(formData);
    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          const value = formData[key];
          if (key === "imageSrc") {
            value.forEach((image) => {
              formDataToSend.append("imageSrc", image);
            });
          } else if (key === "tourType") {
            formData.tourType.forEach((type, index) => {
              formDataToSend.append(`tourType[${index}]`, type);
            });
          } else if (key === "included") {
            formData.included.forEach((include, index) => {
              formDataToSend.append(`included[${index}]`, include);
            });
          } else if (key === "faq") {
            formData.faq.forEach((faq, index) => {
              formDataToSend.append(`faq[${index}][question]`, faq.question);
              formDataToSend.append(`faq[${index}][answer]`, faq.answer);
            });
          } else {
            formDataToSend.append(key, value);
          }
        }
      }

      const response = await fetch(
        "https://test1.buyjugaad.com/api/v1/product/new",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.status === 200) {
        frmAdd.reset();
        toast.success("Successfully Add Product", {
          position: "top-center",
          autoClose: 500,
        });
      }

      setSubmitted(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteTour = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/product/${id}`);
      if (response.status === 200) {
        setProduct(product.filter((product) => product._id !== id));
        hideDeleteModal();
        // If the deletion is successful, show a success message
        toast.success("Successfully deleted the tour", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        // Handle other status codes or errors if necessary
        toast.error("Failed to delete the tour");
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  // Function to show the delete confirmation modal
  const showDeleteModal = (id) => {
    setTourToDelete(id);
    setShowModal(true);
  };

  // Function to close the delete confirmation modal
  const hideDeleteModal = () => {
    setTourToDelete(null);
    setShowModal(false);
  };
  const edit_product = async (eid) => {
    let product = await axios.get(`${BASE_URL}/product/${eid}`);
    // console.log(book.data.edit_book)
    console.log(product.data);
    // localStorage.setItem("product_edit", JSON.stringify(book.data.edit_book));

    // navigate("/update_book")
  };

  return (
    <>
      <ToastContainer />

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
              <h1 className="text-30">All Product</h1>
              {/* <p className="">Your products are the goods</p> */}

              {/* <!-- Button trigger modal --> */}
              <button
                type="button"
                class="btn"
                style={{ backgroundColor: "#78006E", color: "white" }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i class="fa-solid fa-circle-plus"></i> Add Product
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
                <div class="modal-content" style={{ width: "168%" }}>
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Add Product
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
                                  name="frmAdd"
                                  onSubmit={handleSubmit}
                                  encType="multipart/form-data"
                                >
                                  <div className="contactForm row y-gap-30">
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="product"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Product Name{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          required
                                          name="discount"
                                          type="number"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Discount{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="number"
                                          required
                                          name="adultOldPrice"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                         Adult Old Price
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    {/* <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="number"
                                          required
                                          name="adultNewPrice"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Adult New Price
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div> */}
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <div className="col-6 col-sm-12 col-lg-12">
                                          <div className="form-input ">
                                            <input
                                              type="text"
                                              required
                                              name="city"
                                              onChange={inputHandler}
                                            />
                                            <label className="lh-1 text-16 text-light-1">
                                              city
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                        {/* <select class="form-select" aria-label="Default select example">
                                        <option selected >City
                                         </option>
                                       <option value={formData.city} name='city' onChange={inputHandler}>Indore</option>
                                         </select> */}
                                      </div>
                                    </div>

                                    <div className="col-6 ">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="country"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          country
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-6">
                                      {formData.included.map((item, index) => (
                                        <div className="form-input" key={index}>
                                          <input
                                            type="text"
                                            required
                                            name={`included-${index}`}
                                            value={item}
                                            onChange={(e) =>
                                              handleIncludedChange(
                                                index,
                                                e.target.value
                                              )
                                            }
                                          />
                                          <label className="lh-1 text-16 text-light-1">
                                            Included{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleRemoveIncluded(index)
                                            }
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      ))}
                                      <button
                                        type="button"
                                        onClick={handleAddIncluded}
                                      >
                                        Add Included
                                      </button>
                                    </div>

                                    <div className="col-6">
                                      {formData.tourType.map((type, index) => (
                                        <div className="form-input" key={index}>
                                          <input
                                            type="text"
                                            required
                                            name={`tourType-${index}`}
                                            value={type}
                                            onChange={(e) =>
                                              handleTourTypeChange(
                                                index,
                                                e.target.value
                                              )
                                            }
                                          />
                                          <label className="lh-1 text-16 text-light-1">
                                            TourType {index + 1}{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleRemoveTourType(index)
                                            }
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      ))}
                                      <button
                                        type="button"
                                        onClick={handleAddTourType}
                                      >
                                        Add TourType
                                      </button>
                                    </div>

                                    <div className="col-6 ">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="duration"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Duration
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6 ">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="languages"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Languages
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="form-input">
                                        <input
                                          type="text"
                                          required
                                          name="childPrice"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                        ChildPrice
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="tourMap"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          TourMap
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-6">
                                      {formData.faq.map((faq, index) => (
                                        <div key={index}>
                                          <div className="form-input">
                                            <input
                                              type="text"
                                              required
                                              name={`faq-question-${index}`}
                                              value={faq.question}
                                              onChange={(e) =>
                                                handleFaqChange(
                                                  index,
                                                  "question",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <label className="lh-1 text-16 text-light-1">
                                              Question{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                          <div className="form-input mt-4">
                                            <input
                                              type="text"
                                              required
                                              name={`faq-answer-${index}`}
                                              value={faq.answer}
                                              onChange={(e) =>
                                                handleFaqChange(
                                                  index,
                                                  "answer",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <label className="lh-1 text-16 text-light-1 mt-2">
                                              Answer{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleRemoveFaq(index)
                                            }
                                          >
                                            Remove FAQ
                                          </button>
                                        </div>
                                      ))}
                                      <button type="button" onClick={handleAddFaq}>
                                        Add FAQ
                                      </button>
                                    </div>

                                    <div className="col-6 ">
                                      <div className="form-input ">
                                        <input
                                          type="Date"
                                          required
                                          name="time"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Date
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-12 col-lg-12">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="tourOverview"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          TourOverview
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-12">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="formFile"
                                          style={{ fontWeight: "700" }}
                                          className="form-label mx-3"
                                        >
                                          Select File Here
                                        </label>
                                        <input
                                          className="form-control fs-6"
                                          style={{ border: "1px solid black" }}
                                          type="file"
                                          id="formFile"
                                          multiple
                                          name="imageSrc"
                                          onChange={handleFileChange}
                                          accept="image/*"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    class="btn mt-20"
                                    style={{
                                      backgroundColor: "#78006E",
                                      color: "white",
                                    }}
                                    type="submit"
                                  >
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

            {/* // edit Model  */}
            <div
              class="modal fade"
              id="editModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content" style={{ width: "168%" }}>
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Edit Product
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
                                  name="frm"
                                  onSubmit={handleSubmit}
                                  encType="multipart/form-data"
                                >
                                  <div className="contactForm row y-gap-30">
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="product"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Product Name{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          required
                                          name="discount"
                                          type="number"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Discount{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="number"
                                          required
                                          name="adultOldPrice"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Old Price
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="number"
                                          required
                                          name="adultNewPrice"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          New Price
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
                                              name="city"
                                              onChange={inputHandler}
                                            />
                                            <label className="lh-1 text-16 text-light-1">
                                              city
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                        {/* <select class="form-select" aria-label="Default select example">
                            <option selected >City

                            </option>
                            <option value={formData.city} name='city' onChange={inputHandler}>Indore</option>
                           
                          </select> */}
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <div className="col-6 col-sm-12 col-lg-12">
                                          <div className="form-input ">
                                            <input
                                              type="text"
                                              required
                                              name="country"
                                              onChange={inputHandler}
                                            />
                                            <label className="lh-1 text-16 text-light-1">
                                              country
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-6 col-sm-12 col-lg-12">
                                          <div className="form-input ">
                                            <input
                                              type="text"
                                              required
                                              name="duration"
                                              onChange={inputHandler}
                                            />
                                            <label className="lh-1 text-16 text-light-1">
                                              Duration
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-6 col-sm-12 col-lg-12">
                                          <div className="form-input ">
                                            <input
                                              type="text"
                                              required
                                              name="languages"
                                              onChange={inputHandler}
                                            />
                                            <label className="lh-1 text-16 text-light-1">
                                              Languages
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-6 col-sm-12 col-lg-12">
                                          <div className="form-input ">
                                            <input
                                              type="text"
                                              required
                                              name="childPrice"
                                              onChange={inputHandler}
                                            />
                                            <label className="lh-1 text-16 text-light-1">
                                            ChildPrice
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-6 col-sm-12 col-lg-12">
                                          <div className="form-input ">
                                            <input
                                              type="text"
                                              required
                                              name="ages"
                                              onChange={inputHandler}
                                            />
                                            <label className="lh-1 text-16 text-light-1">
                                              Ages
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-12 col-lg-12">
                                      <div className="form-input ">
                                        <input
                                          type="Date"
                                          required
                                          name="time"
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
                                            multiple
                                            // onChange={FileHandler}
                                            name="imageSrc"
                                            accept="image/*"
                                            id="imageInp1"
                                            type="file"
                                            style={{ display: "none" }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    class="btn mt-20"
                                    style={{
                                      backgroundColor: "#78006E",
                                      color: "white",
                                    }}
                                    type="submit"
                                  >
                                    Update
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
                    {/* <button class="btn" style={{ backgroundColor: "#78006E", color: "white" }} type="submit" >Save changes</button> */}
                  </div>
                </div>
              </div>
            </div>
            {/* --------------------------------- */}
          </div>
          <section className="layout-pt-xl">
            <div className="container">
              <div className="row justify-between items-end y-gap-10">
                <div className="col-auto">
                  <h2
                    data-aos="fade-up"
                    data-aos-delay=""
                    className="text-30 md:text-24 "
                  ></h2>
                </div>

                <div className="col-auto">
                  <Link
                    to={"/blog-list-1"}
                    data-aos="fade-right"
                    data-aos-delay=""
                    className="buttonArrow d-flex items-center  "
                  >
                    <span>See all</span>
                    <i className="icon-arrow-top-right text-16 ml-10"></i>
                  </Link>
                </div>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay=""
                className="row y-gap-30 pt-5 sm:pt-10"
              >
                {pageData.map((elm, i) => (
                  <div key={i} className="col-lg-4 col-md-4 col-sm-4 col-12">
                    <div className="card border-0 rounded-3 mb-1 mt-1">
                      <div className="card-body">
                        <Link
                          to={`/blog-single/${elm.id}`}
                          className="blogCard -type-1"
                        >
                          <div className="btn d-flex justify-content-end"></div>
                          <div className="blogCard__image ratio ratio-41:30">
                            <img
                              src={elm.imageSrc[0]}
                              alt="image"
                              className="img-ratio rounded-12"
                            />
                          </div>

                          <div className="blogCard__content mt-30">
                            <div className="blogCard__info text-14 d-flex justify-content-center">
                              <div
                                className="lh-13"
                                style={{ fontSize: "14px" }}
                              >
                                {" "}
                                <label
                                  htmlFor=""
                                  className="mb-2"
                                  style={{ fontSize: "15px" }}
                                >
                                  City Name :
                                </label>{" "}
                                {elm.city}
                              </div>
                              <div className="blogCard__line"></div>
                              <div
                                className="lh-13"
                                style={{ fontSize: "14px" }}
                              >
                                {" "}
                                <label
                                  htmlFor=""
                                  className="mb-2"
                                  style={{ fontSize: "15px" }}
                                >
                                  Cuntary Name :
                                </label>{" "}
                                By {elm.country}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p
                                style={{ fontWeight: "700", fontSize: "15px" }}
                              >
                                Product Name
                              </p>
                              <b>
                                {" "}
                                <span style={{ fontSize: "17px" }}>
                                  {elm.product}
                                </span>{" "}
                              </b>
                            </div>

                            <h5 className="blogCard__title text-18 fw-500 mt-10  d-flex justify-content-between">
                              <p
                                style={{ fontWeight: "700", fontSize: "15px" }}
                              >
                                Time:
                              </p>{" "}
                              <span style={{ fontSize: "15px" }}>
                                {" "}
                                {elm.time}
                              </span>
                            </h5>
                            <h3 className="blogCard__title text-18 fw-500 mt-10  d-flex justify-content-between">
                              {elm.adultOldPrice && (
                                <span
                                  className="text-dark-1 me-4"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "700",
                                  }}
                                >
                                  Old Price:{" "}
                                  <span style={{ marginLeft: "2px" }}>
                                    <del>${elm.adultOldPrice}</del>
                                  </span>
                                </span>
                              )}
                            </h3>
                            <h3 className="blogCard__title text-18 fw-500 mt-10  d-flex justify-content-between">
                              {elm.discount && (
                                <span
                                  className="text-dark-1 me-4"
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "700",
                                  }}
                                >
                                  Discount: {elm.discount}%
                                </span>
                              )}
                            </h3>
                            <h3 className="blogCard__title text-18 fw-500 mt-10  d-flex justify-content-between">
                              {elm.adultOldPrice && elm.discount && (
                                <span
                                  className="text-16 fw-500"
                                  style={{
                                    fontSize: "17px",
                                    fontWeight: "700",
                                  }}
                                >
                                  New Price: $
                                  {(
                                    elm.adultOldPrice -
                                    (elm.adultOldPrice * elm.discount) / 100
                                  ).toFixed(2)}
                                </span>
                              )}
                              {elm.adultOldPrice && !elm.discount && (
                                <span
                                  className="text-16 fw-500"
                                  style={{
                                    fontSize: "17px",
                                    fontWeight: "700",
                                  }}
                                >
                                  New Price: ${elm.adultOldPrice}
                                </span>
                              )}
                            </h3>
                          </div>
                        </Link>

                        <hr />
                        <Button
                          style={{
                            backgroundColor: "red",
                            marginLeft: "10px",
                            border: "none",
                          }}
                          onClick={() => showDeleteModal(elm._id)}
                        >
                          <i class="fa-sharp fa-solid fa-trash "></i>
                        </Button>
                        {/* Delete confirmation modal */}
                        {/* Delete confirmation modal */}
                        <Modal show={showModal} onHide={hideDeleteModal}>
                          <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure you want to delete this Product?
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={hideDeleteModal}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => deleteTour(tourToDelete)}
                            >
                              Delete
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <Button
                          style={{ marginLeft: "7px" }}
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          onClick={() => {
                            edit_article(elm._id);
                          }}
                        >
                          <i class="fa-solid fa-pen-to-square fs-6  "></i>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <nav
              className=" mb-30"
              aria-label="Page navigation example"
              style={{ marginTop: "20px" }}
            >
              <ul class="pagination">
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    style={{ color: "black", fontSize: "20px" }}
                    onClick={handlePre}
                    disabled={page === 1}
                  >
                    Previous
                  </a>
                </li>

                {Array(pageCount)
                  .fill(null)
                  .map((item, index) => {
                    return (
                      <>
                        <li className="page-item ">
                          <a
                            style={{ color: "black", fontSize: "20px" }}
                            class="page-link"
                            href="#"
                            onClick={() => setPage(index + 1)}
                          >
                            {index + 1}
                          </a>
                        </li>
                      </>
                    );
                  })}

                {/* active={page === index + 1 ? true : false} */}
                <li class="page-item">
                  <a
                    class="page-link"
                    style={{ color: "black", fontSize: "20px" }}
                    href="#"
                    onClick={handleNext}
                    disabled={page === pageCount}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
