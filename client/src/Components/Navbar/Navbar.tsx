import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/Images/Logo12.png";
import Button from "../Button/Button";
import NavLinks from "./NavLinks";
import IonIcon from '@reacticons/ionicons';
import Cart from "../Cart/Cart";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className=" fixed top-0 bg-white w-screen shadow-md z-50">
      <div className="flex items-center font-medium justify-between">
        <div className="z-50 p-4 md:w-auto w-full flex justify-between">
          <img src={Logo} alt="logo" className="h-9 lg:ml-8" />
          <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
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

        <div className="relative group text-3xl md:block hidden" onClick={(e) => console.log(e)}>
          <div className=" flex lg:mr-16 bg-red-200/60 text-black/50  px-10 py-3 rounded-full font-[josefin] items-center "><IonIcon className="" name={`cart-outline`}></IonIcon></div>
        <Cart />
        </div>


        {/* Mobile nav */}
        <ul
          className={`
        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
        >
          <li>
            <Link to="/" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLinks />
          <div className="text-3xl md:hidden " onClick={(e) => console.log(e)}>
            <IonIcon name={`cart-outline`}></IonIcon>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
