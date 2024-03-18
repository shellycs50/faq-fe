import React from 'react';
import { Link } from 'react-router-dom';

const PlaceholderNav = () => {

    return (
        <nav className="my-2 text-xl">
            <ul className="flex justify-around">
                <li className='text-blue-700 p-4'>
                    <a
                        
                        className="hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer blur-sm"
                    >
                        Ask Question
                    </a>
                </li>
                <li className='text-blue-700 p-4'>
                    <a
                        
                        className="hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer blur-sm"
                    >
                        View Archive
                    </a>
                </li>
                <li className='text-blue-700 p-4'>
                    <a
                        className="hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer blur-sm"
                    >
                        Logout
                    </a>
                </li>
            </ul>
        </nav>
    );
}
export default PlaceholderNav