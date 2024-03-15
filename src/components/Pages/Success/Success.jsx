

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Success() {
    const [isAdmin, setIsAdmin] = useState(undefined);
    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get('admin') == 1) {
            setIsAdmin(true);
        }
        if (Cookies.get('admin') == 0) {
            setIsAdmin(false);
        }
        if (!Cookies.get('admin')) {
            navigate('/login')
        }
    }, [])
    const studentSuccess = "Your question has been submitted successfully";
    const trainerSuccess = "Your answer has been submitted successfully";
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-xl md:text-3xl">Success!</h1>
            <p className="text-base md:text-xl">{isAdmin === false ? studentSuccess : isAdmin == true && trainerSuccess}</p>
            <Link
                to={isAdmin === false ? "/studenthome" : isAdmin == true && "/trainerarchive"}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
            >Return</Link>

        </div>
    )
}
export default Success