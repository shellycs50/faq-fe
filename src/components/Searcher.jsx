import { useEffect, useState, useRef } from "react";
import useThrottle from "../Helpers/useThrottle";
import Cookies from 'js-cookie'
function Searcher({ setAnswers, url }) {
    const [query, setQuery] = useState("")
    const [userQuery, setUserQuery] = useState("");
    // debounce
    const timeoutRef = useRef(null);
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setQuery(userQuery);
        }, 300);
    }, [userQuery]);

function basicTokenizer(text) {
    text = text.replace(/[^\w\s]/g, ' ');
    text = text.replace(/\s+/g, ' ').trim();
    return text.toLowerCase().split(' ');
}
function listify(str_arr) {
    let output = ''
    str_arr.forEach((string) => {
        output += `'${string}',`
    })
    return output.slice(0, output.length - 1)

}

async function fetchQaps() {
    let path = `http://localhost:8000/api/${url}`;
    const tokens = basicTokenizer(query);
    path += '?searchtokens=['
    path += listify(tokens)
    path += ']'
    console.log(path)
    const response = await fetch(path, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('auth_key')
        },
    });
    const data = await response.json();
    console.log(data)
    return data
}
const throttle = useThrottle();
useEffect(() => {
    if (query === '') return;
    setAnswers(throttle(fetchQaps, 1000))
}, [query])


return (
    <div className="flex flex-col pt-20 items-center font-guminert text-6xl">
        <form className="flex flex-row justify-center border-b-4 border-b-solid border-black  text-black w-1/2 placeholder-slate-900">
            <input placeholder="Search for answers"type="text" value={userQuery} onChange={(e) => setUserQuery(e.target.value)} className="w-full h-24 text-slate-900 p-3 focus:placeholder-no-outline" />

        </form>
    </div>
)
}

export default Searcher