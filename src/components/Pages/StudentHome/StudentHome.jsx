import { useEffect, useState } from "react";
import Searcher from "../../Searcher";
import ContainerAnswerListing from "../../ContainerAnswerListing";

function StudentHome() {
    const [answers, setAnswers] = useState([])
    
    function modalOpen(id) {
        console.log(`Modal Opened for ${id}`);
    }
    useEffect(() => {
        // console.log(answers)
    }, [answers])
    return (
        <div className="w-screen h-screen">
        <Searcher setAnswers={setAnswers} url={"student/faq"}/>
        <ContainerAnswerListing modalOpen={modalOpen}/>
        </div>
    )
}
export default StudentHome