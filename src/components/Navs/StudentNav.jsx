import React from 'react';
import { Link, useLocation, } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
        <div className={`${navHeight} ${navColor} ${fontColor} ${fontSize} bg-gradient-to-b   dark:bg-gray-900 fixed top-0 left-0 right-0 w-screen transition-all duration-1000 flex flex-col justify-center z-10`}>
        <nav>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/studenthome" className="flex items-center space-x-3 rtl:space-x-reverse">
                    
                    <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">FAQ</span>
                </Link>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 bg-none">
                        <li>
                            <Link
                                to="/studentpost"
                                className={`block py-2 px-3 ${
                                    location.pathname === '/studentpost'
                                        ? ' bg-blue-700 rounded md:bg-transparent md:p-0 underline'
                                        : ' rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0   dark:hover:bg-gray-700  md:dark:hover:bg-transparent'
                                }`}
                               
                            >
                                Ask Question
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/studenthome"
                                className={`block py-2 px-3 ${
                                    location.pathname === '/studenthome'
                                        ? 'underline bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white '
                                        : 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                                }`}
                            >
                                View Archive
                            </Link>
                        </li>
                        <li>
                            <a
                                onClick={LogOut}
                                className="cursor-pointer block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </div>
    );
}

export default StudentNav;
