import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useState, useEffect } from 'react';
function QuestionListing({ question, id, modalOpen, }) {
    const [isEvenIndex, setIsEvenIndex] = useState(false)
    useEffect(() => {
        id % 2 === 0 ? setIsEvenIndex(true) : setIsEvenIndex(false)
    }, [id])
    return (
        <a onClick={() => {modalOpen(id)}} className={`group transition-all duration-500 ease-in-out flex flex-row w-9/12 justify-between cursor-pointer border-b-4 border p-3 rounded-xl bg-opacity-10 h-24
        ${isEvenIndex ? "bg-gradient-to-tr from-offwhite via-neutral-400 to-offwhite hover:from-offwhite hover:via-neutral-400 hover:to-baseblue" : "bg-gradient-to-tr from-neutral-400 via-offwhite to-neutral-400 hover:from-neutral-400 hover:via-offwhite hover:to-baseblue"}` }>
            
            
        <h1 className="text-2xl font-sans w-2/3 my-3 py-2 font-medium group-hover:text-baseblue">{question}</h1>
        <p className="group border rounded-lg my-3 p-2 overflow-hidden ">Answer me</p>
        <OpenInNewIcon className="m-0 p-1 self-start group-hover:text-offwhite transition-all duration-500 ease-in-out"/>

        </a>
    )
}

export default QuestionListing