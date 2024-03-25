import { useEffect, useState } from "react";
import ContainerAnswerListing from "../../ContainerAnswerListing";
import PostModal from "../../PostModal";
import TrainerSearcher from "../../TrainerSearcher";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Cookies from 'js-cookie'
import DOMPurify from "dompurify";
import Searcher from "../../Searcher";

function TrainerArchive() {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState([])
    const [query, setQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    
    const { isLoading, error, data: queryData } = useQuery({
        queryFn: () => fetchQaps(),
        queryKey: ['trainerqaps'],
        staleTime: 60000, // 1 min
    })
    
    useEffect(() => {
        if (queryData) {
            setAnswers(queryData);
        }
    }, [queryData])
    
    async function fetchQaps() {
        console.log('attempting to fetch')
        let path = `https://faq-api-demo.robsheldrick.dev.io-academy.uk/api/trainer/faq`;
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
        navigate(`/traineredit/${id}`)
    }
    
    return (
        <div>
            {isModalOpen ? <PostModal content={modalContent} setIsModalOpen={setIsModalOpen} /> : (
                <>
                    <Searcher setAnswers={setAnswers} setQuery={setQuery} query={query} answers={answers}/>
                    <ContainerAnswerListing modalOpen={modalOpen} answers={answers} isAnswer={false}/>
                </>
            )}
        </div>
    )
}
export default TrainerArchive