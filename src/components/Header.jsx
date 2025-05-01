import { Link } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import DropdownUser from "./DropdownUser";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const { currentUser, logoutuser } = useAuth();

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };
  console.log(currentUser)


  


  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 px-6 py-6 md:py-4 lg:-mr-0.25 lg:text-xs lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >


      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link to='/' className="block w-[12rem] xl:mr-8" >
          <h1 className="text-2xl font-bold text-[#fff]">Dealz<span className="text-[#FFF94F]">Quest</span></h1>
        </Link>

        
        <ul className="justify-center items-center flex gap-8 text-base">
          <Link className="text-base" to='/search'>Search</Link>
          {currentUser && 
          <>
            <Link to='/favourites'>Favourites</Link>
            <Link to='/featured_products'>Recommended Products</Link>
          </>
          }
        </ul>

        {openNavigation && (
          <nav className={`fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}>
            <HamburgerMenu />
          </nav>
        )}

        {!currentUser ? (
          <div className="flex gap-3 items-center">
              <Link to='/signin'>
                <Button className="hidden lg:flex">Sign In</Button>
              </Link>
            
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <span className="text-sm">HELLO, {currentUser.username.toUpperCase()}</span>
            <DropdownUser logout={logoutuser}/>
          </div>
        )}

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
