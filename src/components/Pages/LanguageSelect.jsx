import { useEffect, useState } from "react"
import Cookies from "js-cookie";
function LanguageSelect({selectstyles = '', optionstyles = '', fetchDependency, setFetchDependency, selectedLangId, setSelectedLangId}) {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchLanguages()
    }, [])

    async function fetchLanguages() {
        const response = await fetch("http://localhost:8000/api/languages", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('auth_key')
            },
        }
        );
        const result = await response.json();
        setData(result.data)
    }

    return (
        <select className={selectstyles}>
            {data.map((language) => (
                <option className={optionstyles} key={language.id} value={selectedLangId} onChange={(e) => setSelectedLangId(e.target.value)}>{language.name}</option>
            ))}
        </select>
    )
}

export default LanguageSelect