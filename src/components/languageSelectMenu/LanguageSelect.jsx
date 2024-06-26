import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import LanguageSelectPlaceholder from "./LanguageSelectPlaceholder";
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
        });
        const result = await response.json();
        setLangs(result.data);
    }

    return (
        langs && langs.length < 1 ? <LanguageSelectPlaceholder selectstyles={selectstyles} optionstyles={optionstyles}/> :
        <select className={selectstyles} onChange={(e) => setSelectedLangId(e.target.value)} value={selectedLangId}>
            {langs && langs.map((language) => (
                <option className={optionstyles} key={language.id} value={language.id}>{language.name}</option>
            ))}
        </select>
    );
            }

export default LanguageSelect