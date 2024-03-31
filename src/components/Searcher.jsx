import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Switch } from "../../components/ui/switch";
// import useThrottle from "../Helpers/useThrottle";
function Searcher({ answers, setAnswers, setShouldFilter, toggle, setToggle, userQuery, setUserQuery }) {
    
    const [query, setQuery] = useState("");
    const [prevTokens, setPrevTokens] = useState([]);
    const [prevToggle, setPrevToggle] = useState(false);
    // const throttle = useThrottle();
    // debounce
    const timeoutRef = useRef(null);
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setQuery(userQuery);
        }, 500);
    }, [userQuery]);

function basicTokenizer(text) {
    if (!text) return [];
    text = text.replace(/[^\w\s]/g, ' ');
    text = text.replace(/\s+/g, ' ').trim();
    let tokens = text.toLowerCase().split(' ').filter(token => token.length > 2 && token != 'how');
    // tokens.length == 0 && tokens.push("")
    return tokens
}

useEffect(() => {
    // throttle(sortQaps, 1000) throttle 
    // Cookies.set('search', query); needs fixing
    sortQaps()
}, [query, toggle])

function sortQaps() {
    const Qaps = answers; 
    let tokens = basicTokenizer(query);

    const arraysEqual = tokens.length === prevTokens.length && tokens.every((value, index) => value === prevTokens[index]);
    if (arraysEqual && toggle == prevToggle) return;
    setShouldFilter(toggle)
    if (tokens.length == 0) {
        setShouldFilter(false);
        setAnswers(Qaps);
    }
    setAnswers(tokenSort(tokens, Qaps));
    setPrevTokens(tokens);
}


function tokenSort(queryArray, resultsArray) {
    // count case insensitive matches of words in the query string with words in question title, (for each question answer pair object)
    // sort desc on matches
    // serialise back to qap with score
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
    rankedPosts = rankedPosts.map(function (item) { 
        let listing = item.post
        listing.score = item.score
        return listing
    });
    return rankedPosts;
}

const handleToggleChange = (event) => {
    setPrevToggle(toggle);
    setToggle(event);
  };

  // weird behaviour - monitor

//   useEffect(() => {
//     setInterval(() => {
//         console.log(toggle)
//     }, 1000)
//     }, [toggle])


return (
    <div onSubmit={(e) => e.preventDefault()} className="flex flex-row pt-20 justify-center font-sans sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl -z-10">
        <form className="gap-4 md:gap-0 flex flex-col md:flex-row md:justify-evenly p-0 border-b-solid border-black  text-black w-2/3 lg:w-1/2 placeholder-slate-900">
            <motion.input initial={{scale: 0.98}} whileFocus={{scale: 1, transition: { duration: 0.01}}} placeholder="Search for answers"type="text" value={userQuery} onChange={(e) => setUserQuery(e.target.value)} className="text-left placeholder-muted-foreground shadow-2xl w-full lg:h-24 text-slate-900 p-6 lg:p-14 border-2 rounded-full outline-none bg-slate-200 focus:bg-white transition-all duration-500 ease-in-out" />
            <div className="self-center flex flex-row md:flex-col md:items-center w-20 gap-2 h-full justify-center">
                <p className="order-first md:order-none text-sm text-center text-slate-600 font-semibold">Only Show Matches</p>
                <Switch className="self-center" onCheckedChange={handleToggleChange} checked={toggle}  data-state="checked" />
            </div>
        </form>
    </div>
)
}


export default Searcher