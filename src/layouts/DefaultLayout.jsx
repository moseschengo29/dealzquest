import Footer from "../components/Footer"
import Header from "../components/Header"
import ButtonGradient from "../assets/svg/ButtonGradient";
import { Outlet } from "react-router-dom";


function DefaultLayout() {
  return (
    <>
        <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
          <Outlet />
        <Footer />
      </div>

      <ButtonGradient />
    </>
  )
}

export default DefaultLayout