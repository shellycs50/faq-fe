import { useEffect, useState } from "react";
import Searcher from "../../Searcher";
import ContainerAnswerListing from "../../ContainerAnswerListing";
import PostModal from "../../PostModal";
import { useQuery } from "@tanstack/react-query";
import Cookies from 'js-cookie'
import DOMPurify from "dompurify";
import { motion, AnimatePresence } from 'framer-motion'

function StudentHome() {
    const [answers, setAnswers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [shouldFilter, setShouldFilter] = useState(false);
    const { isLoading, error, data: queryData, refetch } = useQuery({
        queryFn: () => fetchQaps(),
        queryKey: ['studentqaps'],
        staleTime: 60000,
    })


    useEffect(() => {
        if (queryData) {
            setAnswers(queryData);
        }
    }, [queryData])

    async function fetchQaps() {

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
        <div className="bg-gradient-to-tr from-baseblue via-baseblue to-blue-200 " >
            {isModalOpen ? <PostModal content={modalContent} setIsModalOpen={setIsModalOpen} /> :
                <div className="py-16 min-h-screen">
                    <Searcher setAnswers={setAnswers} answers={answers} setShouldFilter={setShouldFilter} />
                    <AnimatePresence>
                        <motion.div key="answer-container" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}>
                            <ContainerAnswerListing modalOpen={modalOpen} answers={answers} isAnswer={true} shouldFilter={shouldFilter} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            }

        </div>
    )
}
export default StudentHome