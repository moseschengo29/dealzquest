import { Link, NavLink } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useEffect, useState } from "react";
import DropdownUser from "./DropdownUser";
import { useAuth } from "../context/AuthContext";
import { MdOutlineCompareArrows } from "react-icons/md";
import { useCompare } from "../context/CompareContext";

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const { currentUser, logoutuser } = useAuth();
  const {compareItems, setCompareItems} = useCompare()

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  useEffect(() => {
    console.log(compareItems)
  }, [compareItems, setCompareItems])


  


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
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-[#FFF94F] pb-1 text-[#FFF94F]"
                : "text-[#FFF94F] hover:text-[#FFF94F]"
            }
          >
            Search
          </NavLink>

          {currentUser && (
            <>
              <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-[#FFF94F] pb-1 text-[#FFF94F]"
                    : "text-[#FFF94F] hover:text-[#FFF94F]"
                }
              >
                Favourites
              </NavLink>

              <NavLink
                to="/featured_products"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-[#FFF94F] pb-1 text-[#FFF94F]"
                    : "text-[#FFF94F] hover:text-[#FFF94F]"
                }
              >
                Recommended Products
              </NavLink>

              <NavLink
                to="/reviews"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-[#FFF94F] pb-1 text-[#FFF94F]"
                    : "text-[#FFF94F] hover:text-[#FFF94F]"
                }
              >
                Reviews
              </NavLink>
            </>
          )}
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
            <Link to={'/compare_prices'} className="relative">
            <MdOutlineCompareArrows size={40} />
              <span className=" px-1.5 bg-yellow-400 text-black text-[10px] absolute rounded-full bottom-0 right-0">{compareItems?.length || '0'}</span>
            </Link>
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
