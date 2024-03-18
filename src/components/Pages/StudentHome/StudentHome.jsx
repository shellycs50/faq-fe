import { useEffect, useState } from "react";
import Searcher from "../../Searcher";
import ContainerAnswerListing from "../../ContainerAnswerListing";
import PostModal from "../../PostModal";
import { useQuery } from "@tanstack/react-query";
import Cookies from 'js-cookie'
import DOMPurify from "dompurify";

function StudentHome() {
    const [answers, setAnswers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    
const { isLoading, error, data: queryData } = useQuery({
    queryFn: () => fetchQaps(),
    queryKey: ['studentqaps'],
    staleTime: 1000000,
})

useEffect(() => {
    if (queryData) {
        setAnswers(queryData);
    }
}, [queryData])

async function fetchQaps() {
    console.log('attempting to fetch')
    let path = `https://faq-api-demo.robsheldrick.dev.io-academy.uk/api/student/faq`;
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
    return clean
}


    function modalOpen(id) {
        setIsModalOpen(true);
        setModalContent(answers[id].answer);
    }
    return (
        <div>
            {isModalOpen ? <PostModal content={modalContent} setIsModalOpen={setIsModalOpen} /> : (
                <>
                    <Searcher setAnswers={setAnswers} answers={answers}/>
                    <ContainerAnswerListing modalOpen={modalOpen} answers={answers} isAnswer={true}/>
                </>
            )}
        </div>
    )
}
export default StudentHome