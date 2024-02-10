import LanguageSelect from "../LanguageSelect";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
function TrainerPost() {
    const [selectedLangId, setSelectedLangId] = useState(0);

    const navigate = useNavigate();
    useEffect(() => {
        validate()
    }, [])

   async function validate() {
        const response = await fetch("http://localhost:8000/api/validateadmin", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Bearer': Cookies.get('auth_key'),
            },
        })
        const data = await response.json();
        if (data.status !== 200) {
            console.log({data})
            console.log('Not Authorized')
        }
    }
    return (
        <div>
            <form> 
                <LanguageSelect selectstyles="w-1/2 h-24 text-6xl" optionstyles="text-6xl" selectedLangId={selectedLangId} setSelectedLangId={setSelectedLangId} />
            </form>
        </div>
    );
}

export default TrainerPost;