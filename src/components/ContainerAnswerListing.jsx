
import { useEffect } from "react";
import AnswerListing from "./AnswerListing";
import QuestionListing from "./QuestionListing";
import { motion, useAnimationControls } from "framer-motion"

function ContainerAnswerListing({ modalOpen, answers, isAnswer }) {
    const controls = useAnimationControls()
    useEffect(() => {
        (async () => {
            
            controls.start({ opacity: [.5, 1], transition: { duration: 1 } })
        })()
    }, [answers])

    return (
        
        <div className="flex flex-col gap-6 items-center w-full pt-16">
            {isAnswer ? (
                answers.map((item, i) => (
                    <div className="w-2/3">
                    <motion.div key={i} initial={{ opacity: 0 }} animate={controls} className="w-full flex justify-center" whileHover={{x: 5 , transition: { duration: .3, delay: .2 }}}>
                        <AnswerListing key={i} question={item.question} answer={item.answer} answerer_id={item.answerer_id} language={item.language} id={i} modalOpen={modalOpen} />
                    </motion.div>
                    </div>
                ))
            ) : (
                answers.map((item, i) => (
                    <QuestionListing key={i} question={item.question} answer={item.answer} answerer_id={item.answerer_id} language={item.language} id={item.id} modalOpen={modalOpen} />
                ))
            )}
        </div>
    )
}

export default ContainerAnswerListing;
