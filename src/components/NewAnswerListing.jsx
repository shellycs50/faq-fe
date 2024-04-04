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
function NewAnswerListing({ question, language, id, modalOpen, }) {

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

    const randomTutorGenerator = () => {
        let tutors = [
            "https://io-academy.uk/wp-content/uploads/2020/10/DSC_2808-01-520x670.jpeg",
            "https://io-academy.uk/wp-content/uploads/2020/10/Mike4bw-520x670.jpg",
        ]
        const randomIndex = Math.floor(Math.random() * tutors.length)
        return tutors[randomIndex]
    }

    const tutor = randomTutorGenerator()
    
    return (

        <a onClick={() => { modalOpen(id) }} onMouseEnter={() => handleHover()} onMouseLeave={() => handleEndHover()} className='w-full h-full'>
            <Card>
                <CardHeader>
                    <CardTitle>{!isTitleLengthened && questionNeedsShortening ? `${question.slice(0, 50)}...` : question}</CardTitle>
                    <div className='flex flex-col h-full justify-end'>
                        <div className='flex flex-row justify-between'>
                            <Avatar>
                                <AvatarImage src={tutor} />
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

