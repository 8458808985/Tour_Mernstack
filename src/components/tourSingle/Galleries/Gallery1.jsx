import React, { useEffect, useState } from "react";
import ImageLightBox from "./ImageLightBox";
import BASE_URL from "@/Urls/baseUrl";
import { useParams } from "react-router-dom";

export default function Gallery1() {
  const [activeLightBox, setActiveLightBox] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // Start from the first image
  const [productData, setProductData] = useState(null);
  const { id } = useParams(); // Destructure id from useParams

  useEffect(() => {
    fetch(`${BASE_URL}/product/${id}`)
      .then(res => res.json())
      .then(data => setProductData(data))
      .catch(err => console.error('Error fetching product:', err));
  }, [id]); // Add id to dependency array

  const handleSeeAllPhotos = () => {
    setActiveLightBox(true); // Open the image lightbox
    setCurrentSlideIndex(0); // Set the current slide index to the first image
  };
  
  return (
    <>
      {productData && productData.imageSrc && (
        <div className="tourSingleGrid -type-1 mt-30">
          <div className="tourSingleGrid__grid mobile-css-slider-2">
            {productData.imageSrc.map((image, index) => ( 
              <img key={index} src={image} alt={`image ${index + 1}`} />
            ))}
          </div>
          <div className="tourSingleGrid__button">
            <div style={{ cursor: "pointer" }} className="js-gallery" data-gallery="gallery1">
              <span
                onClick={handleSeeAllPhotos}
                className="button -accent-1 py-10 px-20 rounded-200 bg-dark-1 lh-16 text-white"
                >
                See all photos
              </span>
            </div>
          </div>
        </div>
      )}
      
      {activeLightBox && (
  <div className="image-lightbox">
    <div className="image-lightbox-content">
      {productData.imageSrc.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`image ${index + 1}`}
          onClick={() => setCurrentSlideIndex(index)}
        />
      ))}
    </div>
    <div className="image-lightbox-close mt-2" onClick={() => setActiveLightBox(false)}>
      <button className="btn btn-danger">Close</button> 
    </div>
  </div>
)}

    </>
  );
}
