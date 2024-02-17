import { useEffect, useState, useRef } from "react";
import useThrottle from "../Helpers/useThrottle";
import Cookies from 'js-cookie'
import DOMPurify from "dompurify";
function Searcher({ answers, setAnswers, url, query, setQuery }) {
useEffect(() => {   
    if (Cookies.get('student_search') !== undefined) {
        setQuery(Cookies.get('student_search'))
    }
}, [])

    const [userQuery, setUserQuery] = useState("");
    // debounce
    // user query is not being used for display, its just the middleman between input, debounce and query
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
const throttle = useThrottle();

//main hook to fetch data
useEffect(() => {
    console.log(query)
    fetchQaps();
    Cookies.set('student_search', query, { expires: 1 });
}, [])

useEffect(() => { 
    throttle(sortQaps, 1000)
}, [query])

function sortQaps() { 
    const Qaps = answers; 
    const tokens = basicTokenizer(query);
    setAnswers(tokenSort(tokens, Qaps));
}

function tokenSort(queryArray, resultsArray) {
    let rankedPosts = [];
    resultsArray.forEach(qap => {
        console.log(qap.tokens, queryArray)
        let questionTokens = qap.tokens.toLowerCase().split(" ");
        let matches = queryArray.filter(token => questionTokens.includes(token));
        let score = matches.length; // Simple scoring based on token matches
        rankedPosts.push({
            'post': qap,
            'score': score
        });
    });

    // Sort FAQ posts based on relevance scores
    rankedPosts.sort((a, b) => b.score - a.score); // Sort in descending order of scores

    rankedPosts = rankedPosts.map(post => post.post); // Remove the score from the list
    return rankedPosts;
}


return (
    <div className="flex flex-col pt-20 items-center font-sans text-6xl">
        <form className="flex flex-row justify-center border-b-4 border-b-solid border-black  text-black w-1/2 placeholder-slate-900">
            <input placeholder="Search for answers"type="text" value={userQuery} onChange={(e) => setUserQuery(e.target.value)} className="w-full h-24 text-slate-900 p-3 focus:placeholder-no-outline" />
        </form>
    </div>
)
}

export default Searcher