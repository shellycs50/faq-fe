import { useEffect, useState } from "react"
import Cookies from "js-cookie";
function LanguageSelect({selectstyles = '', optionstyles = '', selectedLangId, setSelectedLangId}) {
    const [langs, setLangs] = useState([]);
    useEffect(() => {
        fetchLanguages()
    }, [])

    async function fetchLanguages() {
        const response = await fetch("https://faq-api-demo.robsheldrick.dev.io-academy.uk/api/languages", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('auth_key')
            },
        }
        );
        const result = await response.json();
        setLangs(result.data)
    }
    // setInterval(() => {
    //     console.log({selectedLangId})
    // }, 1000)
    return (
        <select className={selectstyles} onChange={(e) => setSelectedLangId(e.target.value)} value={selectedLangId}>
            {langs.map((language) => (
                <option className={optionstyles} key={language.id} value={language.id}>{language.name}</option>
            ))}
        </select>
    )
    // selectedLangId={selectedLangId} setSelectedLangId={setSelectedLangId} 
}

export default LanguageSelect