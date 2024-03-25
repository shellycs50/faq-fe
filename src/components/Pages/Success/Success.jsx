

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Success() {
    const [isAdmin, setIsAdmin] = useState(undefined);
    const [timer, setTimer] = useState(5);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        switch (Cookies.get('admin')) {
            case '1':
            setIsAdmin(true);
            break;
            case '0':
            setIsAdmin(false);
            break;
            default:
            navigate('/login');
        }
    }, [])

    useEffect(() => {
        let actualtimer = 5;
        const interval = setInterval(() => {
            actualtimer--
            setTimer(prevTimer => prevTimer - 1);
            if (actualtimer <= 0) {
                console.log("redirecting")
                setShouldRedirect(true);
                
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (shouldRedirect) {
            navigate(isAdmin === false ? "/studenthome" : isAdmin == true && "/trainerarchive")
        }
    }, [shouldRedirect])

    const studentSuccess = "Your question has been submitted successfully";
    const trainerSuccess = "Your answer has been submitted successfully";
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-xl md:text-3xl">Success!</h1>
            <p className="text-base md:text-xl">{isAdmin === false ? studentSuccess : isAdmin == true && trainerSuccess}</p>
            <p className="">Returning home in {timer}</p>
            <Link
                to={isAdmin === false ? "/studenthome" : isAdmin == true && "/trainerarchive"}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
            >Return</Link>

        </div>
    )
}
export default Success