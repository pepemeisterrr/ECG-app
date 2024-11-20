import React from "react";
import { NavbarMenu } from "../mockData/data";
import ResponsiveMenu from "./ResponsiveMenu";
import { FcLike } from "react-icons/fc";
import { FiActivity } from "react-icons/fi";
import { FiDatabase } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    return ( 
    <>
        <nav>
            <div className="container flex justify-between items-center py-8">
                {/*Logo section*/}
                <div className="text-2xl flex items-cente 
                gap-2 font-bold uppercase">
                    <FcLike />
                    <p>ECG</p>
                    <p className="text-primary">App</p>
                </div>
                {/*Menu section*/}
                <div className="hidden md:block">
                    <ul className="flex items-center gap-6
                    text-gray-600">
                        {NavbarMenu.map((item)=> {
                            return(
                                <li key={item.id}>
                                    <a href={item.link} className="
                                    inline-block py-1 px-3 hover:text-secondary font-semibold"
                                    >
                                        {item.title}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {/*Icons section*/}
                <div className="flex items-conter gap-4">
                    <button className="text-2xl hover:bg-quaternary
                    hover:text-white rounded-full p-2
                    duration-200">
                        <FiActivity />
                    </button>
                    <button className="text-2xl hover:bg-tertiary
                    hover:text-white rounded-full p-2
                    duration-200">
                        <FiDatabase />
                    </button>
                    <button className="text-2xl hover:bg-secondary
                    hover:text-white rounded-full p-2
                    duration-200">
                        <FiSettings />
                    </button>
                    <button className="text-2xl hover:bg-primary
                    hover:text-white rounded-full p-2
                    duration-200 hidden md:block">
                        <FiUser />
                    </button>
                    
                </div>
                {/*Mobile hamburger Menu section */}
                <div className="md:hidden" onClick={() =>
                setOpen(!open)}>
                    <MdMenu className="text-4xl" />
                </div>
            </div>
        </nav>

        {/*Mobile Sidebar section */}
        <ResponsiveMenu open={open} />
    </>
    );
};

export default Navbar;