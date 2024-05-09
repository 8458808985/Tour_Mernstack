// import React, { useState } from "react";

// export default function Pagination({ range = 20 }) {
//   const [activeIndex, setActiveIndex] = useState(1);
//   return (
//     <div className="pagination justify-center">
//       <button
//         onClick={() => setActiveIndex((pre) => (pre > 1 ? pre - 1 : 1))}
//         className="pagination__button customStylePaginationPre button -accent-1 mr-15 -prev"
//       >
//         <i className="icon-arrow-left text-15"></i>
//       </button>

//       <div className="pagination__count">
//         <div
//           style={{ cursor: "pointer" }}
//           onClick={() => setActiveIndex(1)}
//           className={activeIndex == 1 ? `is-active` : ""}
//         >
//           1
//         </div>
//         {range > 1 && (
//           <div
//             style={{ cursor: "pointer" }}
//             href="#"
//             onClick={() => setActiveIndex(2)}
//             className={activeIndex == 2 ? `is-active` : ""}
//           >
//             2
//           </div>
//         )}
//         {range > 2 && (
//           <div
//             style={{ cursor: "pointer" }}
//             href="#"
//             onClick={() => setActiveIndex(3)}
//             className={activeIndex == 3 ? `is-active` : ""}
//           >
//             3
//           </div>
//         )}
//         {range > 3 && (
//           <div
//             style={{ cursor: "pointer" }}
//             href="#"
//             onClick={() => setActiveIndex(4)}
//             className={activeIndex == 4 ? `is-active` : ""}
//           >
//             4
//           </div>
//         )}

//         {activeIndex == 5 && range != 5 && (
//           <div
//             style={{ cursor: "pointer" }}
//             href="#"
//             onClick={() => setActiveIndex(5)}
//             className={activeIndex == 5 ? `is-active` : ""}
//           >
//             5
//           </div>
//         )}

//         {range > 5 && <div>...</div>}
//         {activeIndex > 5 && activeIndex < range && (
//           <div style={{ cursor: "pointer" }} href="#" className="is-active">
//             {activeIndex}
//           </div>
//         )}
//         {range > 4 && (
//           <div
//             style={{ cursor: "pointer" }}
//             href="#"
//             onClick={() => setActiveIndex(range)}
//             className={activeIndex == range ? `is-active` : ""}
//           >
//             {range}
//           </div>
//         )}
//       </div>

//       <button
//         onClick={() => setActiveIndex((pre) => (pre < range ? pre + 1 : pre))}
//         className="pagination__button customStylePaginationNext button -accent-1 ml-15 -next"
//       >
//         <i className="icon-arrow-right text-15"></i>
//       </button>
//     </div>
//   );
// }



import React, { useState } from 'react';

const Pagination = ({ itemsPerPage, totalItems, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? 'active' : ''}>
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <ul className="pagination">
        {renderPageNumbers()}
      </ul>
    </div>
  );
};

export default Pagination;









// import React, { useState } from 'react';
// import Pagination from './Pagination'; // Import the pagination component

// const YourComponent = () => {
//   // Sample data
//   const [items, setItems] = useState(Array.from({ length: 50 }, (_, index) => index + 1));
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const onPageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   return (
//     <div>
//       <ul>
//         {currentItems.map((item) => (
//           <li key={item}>{item}</li>
//         ))}
//       </ul>
//       <Pagination
//         itemsPerPage={itemsPerPage}
//         totalItems={items.length}
//         onPageChange={onPageChange}
//       />
//     </div>
//   );
// };

// export default YourComponent;


