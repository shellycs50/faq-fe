import { useEffect, useState } from "react";
import Searcher from "../../Searcher";
import ContainerAnswerListing from "../../ContainerAnswerListing";
import PostModal from "../../PostModal";
import { useQuery } from "@tanstack/react-query";
import Cookies from 'js-cookie'
import DOMPurify from "dompurify";
import { motion, AnimatePresence } from 'framer-motion'
import { Separator } from "../../../../components/ui/separator";

function StudentHome() {
    const [answers, setAnswers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [modalLang, setModalLang] = useState("");
    const [shouldFilter, setShouldFilter] = useState(true);
    const [userQuery, setUserQuery] = useState("");
    const [query, setQuery] = useState("");
    const [toggle, setToggle] = useState(true);

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
        setModalContent(answers[id].answer);
        setModalTitle(answers[id].question);
        setModalLang(answers[id].language);
        setIsModalOpen(true);
    }
    return (
        <div className="bg-gradient-to-tr from-baseblue via-baseblue to-blue-200" >
            {isModalOpen ? <PostModal title={modalTitle} content={modalContent} lang={modalLang} setIsModalOpen={setIsModalOpen} /> :
                <div className="py-16 min-h-screen">
                    <Searcher query={query} setQuery={setQuery} setAnswers={setAnswers} answers={answers} setShouldFilter={setShouldFilter} toggle={toggle} setToggle={setToggle} userQuery={userQuery} setUserQuery={setUserQuery}/>
                    
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