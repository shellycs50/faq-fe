import React from 'react';
import { Link } from 'react-router-dom';

const PlaceholderNav = () => {
    
    return (
        <div className={` h-32 text-black bg-transparent bg-gradient-to-b  border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 w-screen bg-opacity-70 transition-all duration-500 flex flex-col justify-center text-2xl`}>
            <nav>
                
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a className="flex items-center space-x-3 rtl:space-x-reverse">

                        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white blur-md">FAQ</span>
                    </a>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 bg-none">
                            <li>
                                <a
                                    className='blur-md rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0   dark:hover:bg-gray-700  md:dark:hover:bg-transparent'
                                    aria-current="page"
                                >
                                    Ask Question
                                </a>
                            </li>
                            <li>
                                <a
                                    className=
                                    'blur-md text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                                >
                                    View Archive
                                </a>
                            </li>
                            <li>
                                <a

                                    className=" blur-md block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
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
export default PlaceholderNav