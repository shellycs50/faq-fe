import { Separator } from '../../components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';

import { useEffect, useRef, useState } from 'react';
function NewAnswerListing({ question, language, id, modalOpen, tutorImg, conditionalStyles }) {

    const [isTitleLengthened, setIsTitleLengthened] = useState(false)
    const questionNeedsShortening = question.length > 50
    const lengthenManager = useRef(null)

    const handleHover = () => {
        if (!questionNeedsShortening) return
        if (lengthenManager.current) {
            clearTimeout(lengthenManager.current)
        }
        lengthenManager.current = setTimeout(() => {
            setIsTitleLengthened(true)
        }, 300)
    }
    const handleEndHover = () => {
        if (!questionNeedsShortening) return
        setIsTitleLengthened(false)
        if (lengthenManager.current) {
            clearTimeout(lengthenManager.current)
        }
    }

    return (

        <a onClick={() => { modalOpen(id) }} onMouseEnter={() => handleHover()} onMouseLeave={() => handleEndHover()} className="w-screen md:w-full h-full flex flex-col">
            <Card className={`w-11/12 self-center md:w-full ${conditionalStyles}`}>
                <CardHeader>
                    <CardTitle>{!isTitleLengthened && questionNeedsShortening ? `${question.slice(0, 50)}...` : question}</CardTitle>
                    <div className='flex flex-col h-full justify-end'>
                        <div className='flex flex-row justify-between'>
                            <Avatar>
                                <AvatarImage src={tutorImg} />
                            </Avatar>
                            <CardDescription>{language}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </a>
    )

}

export default NewAnswerListing

