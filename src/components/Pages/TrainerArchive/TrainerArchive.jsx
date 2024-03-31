import { useEffect, useState } from "react";
import ContainerAnswerListing from "../../ContainerAnswerListing";
import PostModal from "../../PostModal";
import TrainerSearcher from "../../TrainerSearcher";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Cookies from 'js-cookie'
import DOMPurify from "dompurify";
import Searcher from "../../Searcher";
import { motion, AnimatePresence } from 'framer-motion'

function TrainerArchive() {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState([])
    const [query, setQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [shouldFilter, setShouldFilter] = useState(false);
    const [userQuery, setUserQuery] = useState("");
    const [toggle, setToggle] = useState(true);
    
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
        <div className="bg-gradient-to-tr from-baseblue via-baseblue to-blue-200">
            {isModalOpen ? <PostModal content={modalContent} setIsModalOpen={setIsModalOpen} /> : (
                <div className="py-16 min-h-screen">
                    <Searcher setAnswers={setAnswers} setShouldFilter={setShouldFilter} toggle={toggle} setToggle={setToggle} userQuery={userQuery} setUserQuery={setUserQuery} answers={answers}/>
                    <AnimatePresence>
                        <motion.div key="answer-container" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}>
                            <ContainerAnswerListing modalOpen={modalOpen} answers={answers} isAnswer={true} shouldFilter={shouldFilter} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
}
export default TrainerArchive
