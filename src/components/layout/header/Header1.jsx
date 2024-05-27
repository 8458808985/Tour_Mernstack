import { useEffect, useState } from "react";
// import HeaderSerch from "../components/HeaderSerch";
import Destinations from "../components/Destinations";
import Activities from "../components/Activities";
import Currency from "../components/Currency";
import MobileMenu from "../components/MobileMenu";
// import { searchUser } from "@/redux/Feature/Searchslice";



import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchUser } from "../Redux/feature/Searchslice";

export default function Header1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data , setData]=useState('')

  useEffect(()=>{
    const localdata=localStorage.getItem("role")
    // console.log(localdata)
    setData(localdata)
  })

  const logoutData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role")
    setLoggedIn(false);
    navigate('/');
  }


  const pageNavigate = (pageName) => {
    navigate(pageName);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [addClass, setAddClass] = useState(false);

  // Add a class to the element when scrolled 50px

  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setAddClass(true);
    } else {
      setAddClass(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

//  search 

  const [searchdata, setSearchData] = useState("");
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(searchUser(searchdata));
    navigate("/tour-list-1");
  };

  return (
    <>
      <header
        className={`header -type-1 js-header ${addClass ? "-is-sticky" : ""}`}
      >
        <div className="header__container container-fluid">
          <div className="headerMobile__left">
            {/* <button
              onClick={() => setMobileMenuOpen(true)}
              className="header__menuBtn js-menu-button"
            >
              <i className="icon-main-menu"></i>
            </button> */}
          </div>

          <div className="header__logo">
            <Link to="/" className="header__logo">
              <img src="/img/Logo/renomadic-color-logo.png" style={{width:"120px"}} alt="logo icon" />
            </Link>

            <form className="d-flex" onSubmit={handleSearchSubmit}>
                <input
                  className="form-control me-2 border-1"
                  onChange={(e) => setSearchData(e.target.value)}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
          </div>

          <div className="headerMobile__right">
            <button
              onClick={() => pageNavigate("/tour-list-1")}
              className="d-flex"
            >
              <i className="icon-search text-18"></i>
            </button>

            <button
              onClick={() => pageNavigate("/login")}
              className="d-flex ml-20"
            >
              <i className="icon-person text-18"></i>
            </button>
          </div>

          <div className="header__right">
            <Destinations />
            <Activities />
            <Currency />

            {data === "admin" ? (
              
  <>

    <Link to="/db-main" className="button -sm -dark-1 bg-accent-1 rounded-200 text-white ml-30">
      Dashboard
    </Link>


  </>
) : (
  <>
{data === 'user'?
(
<Link  className="ml-30 button -sm -dark-1 bg-accent-1 rounded-200 text-white"  onClick={logoutData}>
      Logout
    </Link>
):(
<>
  <Link to="/register" className="ml-10">
      Sign up
    </Link>
    <Link to="/login" className="button -sm -dark-1 bg-accent-1 rounded-200 text-white ml-30">
      Log in
    </Link>
    </>
)
}


  
  </>
)}


            {/* <button
              onClick={() => setMobileMenuOpen(true)}
              className="header__menuBtn ml-30 js-menu-button"
            >
              <i className="icon-main-menu"></i>
            </button> */}
          </div>
        </div>
      </header>
      <MobileMenu
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />
    </>
  );
}
