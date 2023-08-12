import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../Assets/Images/Logo12.png";
// import Button from "../Button/Button";
import NavLinks from "./NavLinks";
import IonIcon from '@reacticons/ionicons';
import Cart from "../Cart/Cart";
import UserDropMenu from "../UserDropMenu/UserDropMenu";
import InfoMessage from "../InfoMessage/InfoMessage";
import CartMobView from "../Cart/CartMobView";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openCartMobView, setOpenCartMobView] = useState(false);
  const { pathname } = useLocation()

  return (
    <nav className=" fixed top-0 bg-white w-screen max-w-[1440px] shadow-md z-40">
      <InfoMessage />
      <div className="flex items-center font-medium justify-between">
        <div className="z-40 p-4 md:w-auto w-full flex justify-between">
          <img src={Logo} alt="logo" className="h-9 lg:ml-8" />
          <div className={`flex items-center text-3xl md:hidden ${open ? "hidden" : ""}`} onClick={() => setOpen(!open)}>
            <IonIcon name={`${open ? "close" : "menu"}`}></IonIcon>
          </div>
        </div>

        <ul className="md:flex hidden uppercase items-center gap-8 font-[Josefin]">
          <li>
            <Link to="/" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLinks />
          <li>
            <Link to="/sale" className="py-7 px-3 inline-block">
              Sale
            </Link>
          </li>
        </ul>

        <div className="flex text-3xl items-center text-black/70">
          <button className=" flex group lg:mr-0 text-4xl text-black/70  pl-3 pr-10 py-3 rounded-full font-[josefin] items-center justify-center">
            <IonIcon name="person-circle-outline" />
            <UserDropMenu />
          </button>
          <div className=" group/cart  md:block hidden">
            <button className={` flex lg:mr-0 text-4xl  pl-3 pr-10 py-3 rounded-full font-[josefin] items-center ${pathname !== '/checkout' ? 'text-black/70' : 'text-black/30'}`}>
              <IonIcon name="bag-handle" />
            </button>
            <Cart />
          </div>
        </div>

        {/* {(openCartMobView && pathname !== '/checkout') && <CartMobView openCartMobView={openCartMobView} setOpenCartMobView={setOpenCartMobView}/>} */}
        <CartMobView openCartMobView={openCartMobView} setOpenCartMobView={setOpenCartMobView}/>

        {/* Mobile nav */}
        <ul
          className={`
        md:hidden bg-orange-200 fixed w-[220px] top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
        >
          <li className="text-xl text-right pr-3" onClick={() => setOpen(!open)}>
            <IonIcon name="close"></IonIcon>
          </li>
          <li>
            <Link to="/" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLinks />
          <li className={` flex lg:mr-0 text-4xl  pl-3 pr-10 py-3 rounded-full items-center ${pathname !== '/checkout' ? 'text-black/70' : 'text-black/30'}`} onClick={() => {setOpenCartMobView(!openCartMobView); setOpen(!open)}}>
            <IonIcon name={`bag-handle`}></IonIcon>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
