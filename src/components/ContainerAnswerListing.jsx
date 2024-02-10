import AnswerListing from "./AnswerListing";

function ContainerAnswerListing({modalOpen}) {
    return (
        <div className="flex flex-col gap-20 items-center w-full pt-16">
            {new Array(10).fill(0).map((_, i) => (
                <AnswerListing key={i} question="How to use React Router Dom" topic="Routing" id={i} modalOpen={modalOpen} />
            ))}
        </div>
    )
}
export default ContainerAnswerListing