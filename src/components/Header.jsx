import { Link } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";
import DropdownUser from "./DropdownUser";

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [showloginModal, setShowloginModal] = useState(false)
  const [showsignupModal, setShowsignupModal] = useState(false)

  function handleShowloginModal (){
    setShowloginModal(true)
  }

  function handleCloseloginModal (){
    setShowloginModal(false);
  }

  function handleShowsignupModal (){
    setShowsignupModal(true)
  }

  function handleClosesignupModal (){
    setShowsignupModal(false);
  }

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  function openSignUp(){
    setShowsignupModal(true)
    setShowloginModal(false)
  }

  function openLogin(){
    setShowsignupModal(false)
    setShowloginModal(true)
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 px-6 py-6 md:py-4 lg:-mr-0.25 lg:text-xs lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      {showloginModal && <SigninModal close={handleCloseloginModal} showSignUp={openSignUp}/>}
      {showsignupModal && <SignupModal close={handleClosesignupModal} showLogin={openLogin}/>}

      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link to='/' className="block w-[12rem] xl:mr-8" >
          <h1 className="text-2xl font-bold text-[#fff]">Dealz<span className="text-[#FFF94F]">Quest</span></h1>
        </Link>

        <ul className=" justify-center items-center flex gap-8 text-base">
          <Link to='/search'>Search</Link>
          <Link to='/featured_products'>Featured Products</Link>
        </ul>

        {openNavigation && <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >

          <HamburgerMenu />
        </nav>}


        {/* <div className="flex gap-3 items-center">
        <Button className="hidden lg:flex" onClick={handleShowloginModal}>
          Sign in
        </Button>

        <Button className="hidden lg:flex" onClick={handleShowsignupModal}>
          Sign Up
        </Button>
        </div> */}

        <div className="flex gap-4 items-center">
          <span className="text-sm">Hello, Moses</span>
          <DropdownUser />
        </div>

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
