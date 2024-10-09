import React, { useState } from 'react';
import { NavbarMenu } from 'public/utils/data';
import navblogo from "../../../public/assets/navlogo.svg"
import cartlogo from "../../../public/assets/cart.svg"
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import ResponsiveMenu from '~/components/ResponsiveMenu';
import ResponsiveNav from '~/components/navbarResponsive/ResponsiveNav';
import Sidebar from '~/components/navbarResponsive/sidebar';



const Nav = () => {

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="bg-black ">
        <nav className='max-w-container 4k:max-w-container2 mx-auto '>
          <div className="flex items-center  justify-between py-[30px]">
            {/* logo section  */}
            <div className="md:m-0 m-auto">
              <img src={navblogo} alt="Evoked logo" />
            </div>

            {/* menu section */}
            <div className="hidden lg:block ">
              <ul className='flex items-center gap-6 text-white'>
                {NavbarMenu.map((item) => <li className='hover:text-[#EDCF5D] duration-500 font-medium' key={item.id}>
                  {item.titile}
                </li>)}
                <img src={cartlogo} className='md:ml-[80px]' alt="Cart icon" />
              </ul>
            </div>

            {/* mobile hamburgersection  */}
            <div className="lg:hidden flex items-center gap-x-[2.75rem]" >
              <img src={cartlogo} className='md:ml-[80px cursor-pointer' alt="Cart icon" />
              <div onClick={()=>setOpen(!open)} className="" >
                <Sidebar/>
                {/* <HiOutlineMenuAlt2 className='text-white  text-5xl cursor-pointer hover:text-[#EDCF5D] duration-500' /> */}
              </div>
            </div>
          </div>

        </nav>

          {/* mobile sidebar section */}
        <div className=" hidden">
        <ResponsiveMenu open={open} />
        </div>
      </div>
      {/* <ResponsiveNav/> */}
  
    </>
  );
};

export default Nav;
