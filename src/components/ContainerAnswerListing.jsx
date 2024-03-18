
import AnswerListing from "./AnswerListing";
import QuestionListing from "./QuestionListing";

function ContainerAnswerListing({modalOpen, answers, isAnswer}) {
    return (
        <div className="flex flex-col gap-14 items-center w-full pt-16">
            {isAnswer ? (
                answers.map((item, i) => (
                    <AnswerListing key={i}  question={item.question} answer={item.answer} answerer_id={item.answerer_id} language={item.language} id={i} modalOpen={modalOpen} />
                ))
            ) : (
                answers.map((item, i) => (
                    <QuestionListing key={i}  question={item.question} answer={item.answer} answerer_id={item.answerer_id} language={item.language} id={item.id} modalOpen={modalOpen} />
                ))
            )}
        </div>
    )
}

export default ContainerAnswerListing;
