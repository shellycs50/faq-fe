import { useEffect, useState } from "react";
import ContainerAnswerListing from "../../ContainerAnswerListing";
import PostModal from "../../PostModal";
import TrainerSearcher from "../../TrainerSearcher";
import { useNavigate } from "react-router-dom";

function TrainerArchive() {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState([])
    const [query, setQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    
    function modalOpen(id) {
        console.log(id)
        navigate(`/traineredit/${id}`)
    }
    useEffect(() => {
        console.log({answers})
    }, [answers])
    return (
        <div>
            {isModalOpen ? <PostModal content={modalContent} setIsModalOpen={setIsModalOpen} /> : (
                <>
                    <TrainerSearcher setAnswers={setAnswers} url={"trainer/faq"} setQuery={setQuery} query={query} answers={answers}/>
                    <ContainerAnswerListing modalOpen={modalOpen} answers={answers} isAnswer={false}/>
                </>
            )}
        </div>
    )
}
export default TrainerArchive