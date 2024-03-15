import OpenInNewIcon from '@mui/icons-material/OpenInNew';
function QuestionListing({ question, id, modalOpen, }) {
    return (
        <a onClick={() => { modalOpen(id) }} className="flex flex-row w-9/12 justify-between cursor-pointer border-b-4 border p-3 border-opacity-100 rounded-xl">
            {/* h1 text should wrap behind 60%, after 2 lines - chars h1 gets ... and no more is added */}
            <h1 className="text-2xl font-sans w-2/3 my-3 py-2">{question}</h1>
            <div>
                <p className="border my-3 p-2 flex flex-row"><span className='self-center'>Answer me!</span></p>
            </div>
            <OpenInNewIcon className="m-0 p-1 self-start" />
        </a>
    )
}

export default QuestionListing