
import { useEffect, useState } from "react";
import AnswerListing from "./AnswerListing";
import QuestionListing from "./QuestionListing";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion"
import NewAnswerListing from "./NewAnswerListing";
import NewQuestionListing from "./NewQuestionListing";

function ContainerAnswerListing({ modalOpen, answers, isAnswer, shouldFilter }) {
    const controls = useAnimationControls()

    useEffect(() => {
        (async () => {

            controls.start({ opacity: [.5, 1], transition: { duration: 1 } })
        })()
    }, [answers])

    const [shouldRedGreen, setShouldRedGreen] = useState(false);

    useEffect(() => {
        answers.filter((item) => item.score > 0).length == 0 ? setShouldRedGreen(false) : setShouldRedGreen(true);
    }, [answers])


    return (

        <div className="flex w-full flex-row justify-center">
            <div className="gap-6 flex flex-col lg:flex-row lg:flex-wrap justify-center items-center lg:mx-40 mt-10 md:mt-20 w-full">
                {isAnswer ? (
                    answers.map((item, i) => (
                        shouldFilter && item.score > 0 || !shouldFilter ? (
                            <div key={i}>
                                <AnimatePresence>
                                    <motion.div key={i} initial={{ x: -10 }} animate={{ x: 0, transition: { duration: i / 10 } }}>
                                        <motion.div key={i} initial={{ opacity: 0 }} animate={controls} whileHover={{ y: -3, scale: 1.01, transition: { duration: .3 } }}
                                            className={`w-full max-w-xs md:max-w-none md:w-96 md:h-36 flex flex-row justify-center ${!shouldRedGreen ? "border-4 border-slate-200 rounded-xl" : item.score > 0 ? "border-4 border-green-300 rounded-xl" : "border-4 border-red-100 rounded-xl"}`}>
                                            <NewAnswerListing key={i} question={item.question} answer={item.answer} answerer_id={item.answerer_id} language={item.language} id={item.id} modalOpen={modalOpen} />
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        ) : null

                    ))

                ) : answers.map((item, i) => (
                    shouldFilter && item.score > 0 || !shouldFilter ? (
                        <div key={i}>
                            <AnimatePresence>
                                <motion.div key={i} initial={{ x: -10 }} animate={{ x: 0, transition: { duration: i / 10 } }}>
                                    <motion.div key={i} initial={{ opacity: 0 }} animate={controls} whileHover={{ y: -3, scale: 1.01, transition: { duration: .3 } }}
                                        className={`w-full max-w-xs md:max-w-none md:w-96 md:h-36 flex flex-row justify-center ${!shouldRedGreen ? "border-4 border-slate-200 rounded-xl" : item.score > 0 ? "border-4 border-green-300 rounded-xl" : "border-4 border-red-100 rounded-xl"}`}>
                                        <NewQuestionListing key={i} question={item.question} answer={item.answer} answerer_id={item.answerer_id} language={item.language} id={item.id} modalOpen={modalOpen} />
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    ) : null
                ))}
                    

                {/* wasteful of compute */}
                {shouldFilter && !shouldRedGreen ? (
                    <motion.div key={Math.random() * 100} initial={{ opacity: 0 }} animate={controls} className="w-96 h-36" >
                        <div className="text-2xl text-center text-white">No results found</div>
                    </motion.div>)
                    : null}
            </div>
        </div>
    )
}

export default ContainerAnswerListing;
