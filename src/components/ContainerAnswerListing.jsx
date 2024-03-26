
import { useEffect } from "react";
import AnswerListing from "./AnswerListing";
import QuestionListing from "./QuestionListing";
import { motion, useAnimationControls } from "framer-motion"
import NewAnswerListing from "./NewAnswerListing";

function ContainerAnswerListing({ modalOpen, answers, isAnswer, shouldFilter }) {
    const controls = useAnimationControls()
    useEffect(() => {
        (async () => {

            controls.start({ opacity: [.5, 1], transition: { duration: 1 } })
        })()
    }, [answers])


    return (
        <div className="flex w-full flex-row justify-center">
            <div className="gap-6 w-full flex flex-row flex-wrap justify-center lg:px-40 lg:pt-20">
                {isAnswer ? (
                    answers.map((item, i) => (
                            shouldFilter && item.score > 0 || !shouldFilter ? (
                                <div key={i}>
                                <motion.div key={i} initial={{ opacity: 0 }} animate={controls} className="w-96 h-36" whileHover={{ y: -3, scale: 1.01, transition: { duration: .3, delay: .2 } }}>
                                    <NewAnswerListing key={i} question={item.question} answer={item.answer} answerer_id={item.answerer_id} language={item.language} id={i} modalOpen={modalOpen} />
                                </motion.div>
                                </div>
                            ) : null
                        
                    ))

                ) : (
                    answers.map((item, i) => (
                        <QuestionListing key={i} question={item.question} answer={item.answer} answerer_id={item.answerer_id} language={item.language} id={item.id} modalOpen={modalOpen} />
                    ))
                )}
                {answers.length > 0 && shouldFilter && answers.filter((item) => item.score > 0).length == 0 ? (
                    <motion.div key={Math.random() * 100} initial={{ opacity: 0 }} animate={controls} className="w-96 h-36" >
                        <div className="text-2xl text-center text-white">No results found</div>
                    </motion.div>)
                    : null}
            </div>
        </div>
    )
}

export default ContainerAnswerListing;
