import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useEffect, useState } from 'react';
function NewAnswerListing({ question, language, id, modalOpen, }) {
    const [isEvenIndex, setIsEvenIndex] = useState(false)
    useEffect(() => {
        id % 2 === 0 ? setIsEvenIndex(true) : setIsEvenIndex(false)
    }, [id])
    return (
        // <a onClick={() => {modalOpen(id)}} className={`group transition-all duration-500 ease-in-out flex flex-row w-9/12 justify-between cursor-pointer border-b-4 border p-3 rounded-xl bg-opacity-10
        // ${isEvenIndex ? "bg-gradient-to-tr from-offwhite via-neutral-400 to-offwhite hover:from-offwhite hover:via-neutral-400 hover:to-baseblue" : "bg-gradient-to-tr from-neutral-400 via-offwhite to-neutral-400 hover:from-neutral-400 hover:via-offwhite hover:to-baseblue"}` }>


        // <h1 className="text-2xl font-sans w-2/3 my-3 py-2 font-medium ">{question}</h1>
        // <div className='flex flex-col justify-center'><p className="group border rounded-lg my-3 p-2 overflow-hidden ">{language}</p></div>
        // <OpenInNewIcon className="m-0 p-1 self-start group-hover:text-offwhite transition-all duration-500 ease-in-out"/>

        // </a>

        <a onClick={() => {modalOpen(id)}} className=''>
            <Card>
                <CardHeader>
                    <CardTitle>{question.length > 65 ? `${question.slice(0, 65)}...` : question}</CardTitle>
                    <CardDescription>{language}</CardDescription>
                </CardHeader>
            </Card>

        </a>
    )

}

export default NewAnswerListing

