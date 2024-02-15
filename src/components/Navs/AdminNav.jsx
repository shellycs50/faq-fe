import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = ({LogOut}) => {
        return (
            <nav className="">
                <ul className="flex justify-around">
                    <li className="p-2">
                        <Link
                            to="/trainerarchive"
                            className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out transform hover:scale-110"
                        >
                            Unanswered Questions
                        </Link>
                    </li>
                    <li className="p-2">
                        <Link
                            to="/studenthome"
                            className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out transform hover:scale-110"
                        >
                            Student Archive
                        </Link>
                    </li>
                    <li className="p-2">
                        <a
                            onClick={LogOut}
                            className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
                        >
                            Log out
                        </a>
                    </li>
                </ul>
            </nav>
        )
        }
export default AdminNav
