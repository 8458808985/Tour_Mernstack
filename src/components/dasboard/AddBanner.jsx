import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

import Map from "../pages/contact/Map";

const tabs = ["Content", "Location", "Pricing", "Included"];
export default function AddBanner() {
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("Content");
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
                className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""
                    } js-dashboard`}
            >
                <Sidebar setSideBarOpen={setSideBarOpen} />

                <div className="dashboard__content">
                    <Header setSideBarOpen={setSideBarOpen} />

                    <div className="dashboard__content_content">
                        <h1 className="text-30 mx-3">Add Banner</h1>

                        <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-60">
                            <div className="row">
                                <div className="col-md-10 col-sm-10 col-12">
                                    <div className="mb-3">
                                        <label htmlFor="formFile" style={{fontWeight:"700"}} className="form-label mx-3">
                                        Select File Here
                                        </label>
                                        <input className="form-control" type="file" id="formFile" />
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
