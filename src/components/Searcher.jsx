import { useEffect, useState, useRef } from "react";
// import useThrottle from "../Helpers/useThrottle";
import Cookies from 'js-cookie'
import DOMPurify from "dompurify";
function Searcher({ answers, setAnswers, url }) {
    const [userQuery, setUserQuery] = useState("");
    const [query, setQuery] = useState("");
    // const throttle = useThrottle();
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

// function listify(str_arr) {
//     let output = ''
//     str_arr.forEach((string) => {
//         output += `'${string}',`
//     })
//     return output.slice(0, output.length - 1)
// }

async function fetchQaps() {
    let path = `https://faq-api-demo.robsheldrick.dev.io-academy.uk/api/${url}`;
    const response = await fetch(path, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('auth_key'),
            'no-cors': 'true'
        },
    });
    const data = await response.json();
    let clean = data.data.map((item) => {
        return {
            ...item,
            answer: DOMPurify.sanitize(item.answer)
        };
    });
    setAnswers(clean);
}


useEffect(() => {
    fetchQaps();
    // Cookies.get('search') && setQuery(Cookies.get('search')); needs fixing
    sortQaps()
}, [])

useEffect(() => {
    // throttle(sortQaps, 1000) throttle 
    // Cookies.set('search', query); needs fixing
    sortQaps()
}, [query])

function sortQaps() { 
    const Qaps = answers; 
    const tokens = basicTokenizer(query);
    setAnswers(tokenSort(tokens, Qaps));
}


function tokenSort(queryArray, resultsArray) {
    // count case insensitive matches of words in the query string with words in question title, (for each question answer pair object)
    // sort desc on matches
    // serialise back to qap without score (probably a waste of compute but OK for now)
    // return sorted results array

    let rankedPosts = [];
    resultsArray.forEach(qap => {
        let questionTokens = qap.tokens.toLowerCase().split(" ");
        let matches = queryArray.filter(token => questionTokens.includes(token));
        let score = matches.length;
        rankedPosts.push({
            'post': qap,
            'score': score
        });
    });
    rankedPosts.sort((a, b) => b.score - a.score);
    rankedPosts = rankedPosts.map(post => post.post);
    return rankedPosts;
}


return (
    <div onSubmit={(e) => e.preventDefault()} className="flex flex-col pt-20 items-center font-sans text-6xl">
        <form className="flex flex-row justify-center border-b-4 border-b-solid border-black  text-black w-1/2 placeholder-slate-900">
            <input placeholder="Search for answers"type="text" value={userQuery} onChange={(e) => setUserQuery(e.target.value)} className="w-full h-24 text-slate-900 p-3 focus:placeholder-no-outline" />
        </form>
    </div>
)
}


export default Searcher