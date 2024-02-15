import React from 'react';
import { Link } from 'react-router-dom';

const StudentNav = ({LogOut}) => {
        return (
            <nav className="flex justify-center">
                <ul className="flex space-x-4">
                    <li className="p-2">
                        <Link
                            to="/studentpost"
                            className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out transform hover:scale-110"
                        >
                            Ask Question
                        </Link>
                    </li>
                    <li className="p-2">
                        <Link
                            to="/studenthome"
                            className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out transform hover:scale-110"
                        >
                            View Archive
                        </Link>
                    </li>
                    <li className="p-2">
                        <a onClick={LogOut}
                            to="/"
                            className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
                        >
                            Logout
                        </a>
                    </li>
                </ul>
            </nav>
        );
}

export default StudentNav;
