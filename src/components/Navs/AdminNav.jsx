import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNav = ({ LogOut }) => {
    const location = useLocation();

    return (
        <nav className="my-2 text-xl">
            <ul className="flex justify-around">
                <li className={`p-2 ${location.pathname === '/trainerpost' ? 'text-blue-500 shadow-lg rounded-full p-4' : 'text-blue-700 p-4'}`}>
                    <Link
                        to="/trainerpost"
                        className="hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        Make a new post
                    </Link>
                </li>
                <li className={`p-2 ${location.pathname === '/trainerarchive' ? 'text-blue-500 shadow-lg rounded-full p-4' : 'text-blue-700 p-4'}`}>
                    <Link
                        to="/trainerarchive"
                        className="hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        Unanswered Questions
                    </Link>
                </li>
                <li className={`p-2 ${location.pathname === '/studenthome' ? 'text-blue-500 shadow-lg rounded-full p-4' : 'text-blue-700 p-4'}`}>
                    <Link
                        to="/studenthome"
                        className="hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        Student Archive
                    </Link>
                </li>
                <li className="text-blue-700 hover:text-blue-500 p-4 cursor-pointer">
                    <a
                        onClick={LogOut}

                    >
                        Log out
                    </a>
                </li>
            </ul >
        </nav >
    );
};

export default AdminNav;
