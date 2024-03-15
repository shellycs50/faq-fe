import { useEffect, useState } from "react";
import Searcher from "../../Searcher";
import ContainerAnswerListing from "../../ContainerAnswerListing";
import PostModal from "../../PostModal";

function StudentHome() {
    const [answers, setAnswers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    
    function modalOpen(id) {
        setIsModalOpen(true);
        setModalContent(answers[id].answer);
    }
    return (
        <div>
            {isModalOpen ? <PostModal content={modalContent} setIsModalOpen={setIsModalOpen} /> : (
                <>
                    <Searcher setAnswers={setAnswers} url={"student/faq"} answers={answers}/>
                    <ContainerAnswerListing modalOpen={modalOpen} answers={answers} isAnswer={true}/>
                </>
            )}
        </div>
    )
}
export default StudentHome