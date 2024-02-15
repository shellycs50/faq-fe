import { useEffect, useState } from "react";
import Searcher from "../../Searcher";
import ContainerAnswerListing from "../../ContainerAnswerListing";
import PostModal from "../../PostModal";

function StudentHome() {
    const [answers, setAnswers] = useState([])
    const [query, setQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    
    function modalOpen(id) {
        console.log(answers[id])
        console.log(`Modal Opened for ${id}`);
        setIsModalOpen(true);
        setModalContent(answers[id].answer);

    }
    useEffect(() => {
        console.log({answers})
    }, [answers])
    return (
        <div>
            {isModalOpen ? <PostModal content={modalContent} setIsModalOpen={setIsModalOpen} /> : (
                <>
                    <Searcher setAnswers={setAnswers} url={"student/faq"} setQuery={setQuery} query={query} answers={answers}/>
                    <ContainerAnswerListing modalOpen={modalOpen} answers={answers} isAnswer={true}/>
                </>
            )}
        </div>
    )
}
export default StudentHome