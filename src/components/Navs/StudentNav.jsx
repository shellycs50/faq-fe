import React from 'react';
import { Link, useLocation, } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"

const StudentNav = ({ LogOut }) => {
    const location = useLocation();
    const [navHeight, setnavHeight] = useState("h-32");
    const [navColor, setnavColor] = useState("bg-transparent");
    const [fontColor, setFontColor] = useState("text-black");
    const [fontSize, setFontSize] = useState("text-2xl");

    const listenScrollEvent = () => {
        window.scrollY > 20 ? setnavColor("from-juicypastel to-black") : setnavColor("bg-transparent");
        window.scrollY > 20 ? setFontColor("text-offwhite") : setFontColor("text-black");
        window.scrollY > 20 ? setnavHeight("h-16") : setnavHeight("h-32");
        window.scrollY > 20 ? setFontSize("text-xl") : setFontSize("text-2xl");
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    return (
        <div className={`${navHeight} ${navColor} ${fontColor} ${fontSize} bg-gradient-to-b dark:bg-gray-900 fixed top-0 left-0 right-0 w-screen transition-all duration-1000 flex flex-col justify-center z-10`}>
            <nav>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <motion.div whileHover={{ scale: 1.05, transition: { duration: .2 } }}>
                        <Link to="/studenthome" className="flex items-center space-x-3 rtl:space-x-reverse">

                            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">FAQ</span>
                        </Link>
                    </motion.div>
                    <div className='block md:hidden'>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <Link to="/studenthome">
                                    <DropdownMenuItem>Home</DropdownMenuItem>
                                </Link>
                                <Link to="/studentpost">
                                    <DropdownMenuItem>Ask Question</DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <a onClick={LogOut}
                                >
                                <DropdownMenuItem>Log Out</DropdownMenuItem>
                                </a>
                               
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 bg-none">
                            <li>
                                <motion.div whileHover={{ scale: 1.05, transition: { duration: .2 } }}>
                                    <Link
                                        to="/studentpost"
                                        className={`block py-2 px-3 ${location.pathname === '/studentpost'
                                            ? ' bg-blue-700 rounded md:bg-transparent md:p-0 font-semibold'
                                            : ' rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0   dark:hover:bg-gray-700  md:dark:hover:bg-transparent'
                                            }`}

                                    >
                                        Ask Question
                                    </Link>
                                </motion.div>
                            </li>
                            <li>
                                <motion.div whileHover={{ scale: 1.05, transition: { duration: .2 } }}>
                                    <Link
                                        to="/studenthome"
                                        className={`block py-2 px-3 ${location.pathname === '/studenthome'
                                            ? 'font-semibold bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white' 
                                            : 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                                            }`}
                                    >
                                        View Archive
                                    </Link>
                                </motion.div>
                            </li>
                            <li>
                                <motion.div whileHover={{ scale: 1.05, transition: { duration: .2 } }}>
                                    <a
                                        onClick={LogOut}
                                        className="cursor-pointer block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Logout
                                    </a>
                                </motion.div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default StudentNav;
