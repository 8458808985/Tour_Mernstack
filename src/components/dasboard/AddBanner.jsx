import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";

import Map from "../pages/contact/Map";
import BASE_URL from "@/Urls/baseUrl";
import axios from "axios";
import { Button } from "react-bootstrap";

const tabs = ["Content", "Location", "Pricing", "Included"];
export default function AddBanner() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/banner`)
      .then(res => res.json())
      .then(data => setBanner(data))
      .catch(err => console.error('Error fetching tours:', err));
  }, []);
  console.log(banner)
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
    console.log(formData)
    try {
      const formDataToSend = new FormData();
      //   formDataToSend.append('name', formData.name);
      formDataToSend.append('banner', formData.banner);

      const response = await fetch('https://test1.buyjugaad.com/api/v1/banner/new', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitted(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };
 
  
  const handleDelete =async(did)=>{
  
// alert(did)
const response = await axios.delete(`https://test1.buyjugaad.com/api/v1/banner/${did}`)

  }
  return (
    <>
      <div
        className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""
          } js-dashboard`}
      >
        <Sidebar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30 mx-3">Add Banner</h1>
            <form action="" onSubmit={handleSubmit}>
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
                <td  className="">
                  <Button style={{ backgroundColor: "red", marginLeft: "100px", border:"none" }} onClick={() => handleDelete(elm._id)}>
                    <i class="fa-sharp fa-solid fa-trash "></i>
                  </Button>
                </td>
              </tr>
            ))}
            <div className="text-center pt-30">
              © Copyright Viatours {new Date().getFullYear()}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
