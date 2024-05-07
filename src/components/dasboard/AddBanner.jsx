import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

import Map from "../pages/contact/Map";

const tabs = ["Content", "Location", "Pricing", "Included"];
export default function AddBanner() {
    const [sideBarOpen, setSideBarOpen] = useState(true);
     const [banner , setBanner] = useState({
        banner:"",
       })
    
  
       const FileHandler =(event)=>{
       setBanner({...book ,[event.target.name]: event.target.files[0]})
    console.log(event.target.files)
      }
    
    const Add_banner = async(event)=>{
      event.preventDefault();
      try {
        const form_data = new FormData();
    form_data.append("banner", banner.banner, book.banner.name);

    let book_result=  await axios.post('http://localhost:4000/add_books', form_data)
    
    } catch (error) {
        
    }
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
                        <form action="" onSubmit={Add_banner}>
                        <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-60">
                            <div className="row">
                                <div className="col-md-10 col-sm-10 col-12">
                                    <div className="mb-3">
                                        <label htmlFor="formFile" style={{fontWeight:"700"}} className="form-label mx-3">
                                        Select File Here
                                        </label>
                                        <input className="form-control" style={{border:"1px solid black"}} type="file" id="formFile"  />
                                    </div>
<div className="btn btn-success text-light w-25 float-end shadow ">
    <button className="text-light" style={{fontWeight:"700"}}>Submit</button>
</div>
                                </div>
                            </div>
                        </div>
                        </form>
                        <div className="text-center pt-30">
                            © Copyright Viatours {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
