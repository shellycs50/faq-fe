import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const StudentNav = ({ LogOut }) => {
    const location = useLocation();

    return (
        <nav className="my-2">
            <ul className="flex justify-around">
                <li className={`p-2 ${location.pathname === '/studentpost' ? 'text-blue-700 shadow-lg rounded-full p-4' : 'text-blue-500 p-4'}`}>
                    <Link
                        to="/studentpost"
                        className="hover:text-blue-700 transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        Ask Question
                    </Link>
                </li>
                <li className={`p-2 ${location.pathname === '/studenthome' ? 'text-blue-700 shadow-lg rounded-full p-4' : 'text-blue-500 p-4'}`}>
                    <Link
                        to="/studenthome"
                        className="hover:text-blue-700 transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        View Archive
                    </Link>
                </li>
                <li className="text-blue-500 hover:text-blue-700 p-4 cursor-pointer">
                    <a
                        onClick={LogOut}
                        href="/"
                        className=""
                    >
                        Logout
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default StudentNav;
