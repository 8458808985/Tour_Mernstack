import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";

import Map from "../pages/contact/Map";
import BASE_URL from "@/Urls/baseUrl";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const tabs = ["Content", "Location", "Pricing", "Included"];
export default function AddBanner() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [banner, setBanner] = useState([]);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/banner`)
      .then(res => res.json())
      .then(data => setBanner(data))
      .catch(err => console.error('Error fetching tours:', err));
  }, [banner]);
  
  const [formData, setFormData] = useState({
    banner: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);


  const FileHandler = (e) => {
    setFormData({ ...formData, banner: e.target.files[0] });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formDataToSend = new FormData();
        // formDataToSend.append('name', formData.name);
      formDataToSend.append('banner', formData.banner);

      const response = await fetch('https://test1.buyjugaad.com/api/v1/banner/new', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        // throw new Error('Failed to submit form');
        frm.reset()
        toast.success("Successfully Add Banner ", {
          position: "top-center",
          autoClose: 500
        })
      }

      setSubmitted(true);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  const deleteBanner = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/banner/${id}`);
      if (response.status === 200) {
        setBanner(banner.filter(banner => banner._id !== id));
        hideDeleteModal();
        // If the deletion is successful, show a success message
        toast.success("Successfully deleted the banner", {
          position: "top-center",
          autoClose: 2000
        });
      } else {
        // Handle other status codes or errors if necessary
        toast.error("Failed to delete the banner");
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  // Function to show the delete confirmation modal
  const showDeleteModal = (id) => {
    setBannerToDelete(id);
    setShowModal(true);
  };

  // Function to close the delete confirmation modal
  const hideDeleteModal = () => {
    setShowModal(false);
    setBannerToDelete(null);
  };

    // const delete_banner = async(id) => {
    //   try {
    //     const result =await axios.delete(`${BASE_URL}/banner/${id}`);
    //   if (result.status === 200) {
  
    //     setBanner(banner.filter(banner => banner._id !== id));
    //     // If the deletion is successful, show a success message
    //     toast.success("Successfully deleted the Banner", {
    //       position: "top-center",
    //       autoClose: 500
  
    //     });
    //   } else {
    //     // Handle other status codes or errors if necessary
    //     alert("failed deleted")
    //   }
    //   } catch (error) {
    //     console.log(error)
    //   }
      
    // };
  return (
    <>
        <ToastContainer />

      <div
        className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""
          } js-dashboard`}
      >
        <Sidebar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30 mx-3">Add Banner</h1>
            <form name="frm" action="" onSubmit={handleSubmit}>
              <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-60">
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-12">
                    <div className="mb-3">
                      <label htmlFor="formFile" style={{ fontWeight: "700" }} className="form-label mx-3">
                        Select File Here
                      </label>
                      <input className="form-control fs-4" style={{ border: "1px solid black" }} type="file" id="formFile" name="banner" onChange={FileHandler} />
                    </div>
                    <div className="btn btn-success text-light w-25 float-end shadow ">
                      <button className="text-light fs-4" type="submit" style={{ fontWeight: "700" }}>Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            {banner.map((elm, i) => (

              <tr key={i}  className="d-flex justify-content-between mt-5 mx-5" >

                <td className="mb-1">
                  <img
                    src={elm.banner}
 className="mt-5 mb-5"
                    style={{ width: "200px", height: "100px" }}
                  />
                </td>
                <td  className="mt-10">
                <Button 
              style={{ backgroundColor: "red", marginLeft: "10px", border:"none"  }}
              onClick={() => showDeleteModal(elm._id)}
            >
              <i className="fa-sharp fa-solid fa-trash "></i>
            </Button>
                             {/* Delete confirmation modal */}
       {/* Delete confirmation modal */}
       <Modal show={showModal} onHide={hideDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this banner?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteBanner(bannerToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
                  <Button style={{marginLeft:"7px"}}  data-bs-toggle="modal"
                          data-bs-target="#modelExample" onClick={() => {
                            edit_article(elm._id);
                          }}>
                     <i class="fa-solid fa-pen-to-square fs-6  " ></i>
                  </Button>
                  
                </td>
                
              </tr>
            ))}
            
          </div>

        </div>
      </div>
    </>
  );
}
