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
function NewQuestionListing({ question, qap_id, modalOpen, language }) {

    return (
        <a onClick={() => {
            console.log(qap_id)
            modalOpen(qap_id)}} className='w-full'>
            <Card>
                <CardHeader>
                    <CardTitle>{question.length > 65 ? `${question.slice(0, 65)}...` : question}</CardTitle>
                    <CardDescription>{language}</CardDescription>
                </CardHeader>
            </Card>

        </a>
    )

}

export default NewQuestionListing

