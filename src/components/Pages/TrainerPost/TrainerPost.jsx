import LanguageSelect from "../LanguageSelect";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import QuestionBuilder from "../../QuestionBuilder";

function TrainerPost() {
    const [selectedLangId, setSelectedLangId] = useState(0);
    const [title, setTitle] = useState(""); 
    const [uploadError, setUploadError] = useState(false);
    const editorRef = useRef(null);
    const navigate = useNavigate();
    // useEffect(() => {
    //     validate()
    // }, [])

   async function validate() {
    // not working
        const response = await fetch("http://localhost:8000/api/validateadmin", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Bearer': Cookies.get('auth_key'),
            },
        })
        if (response.status !== 200) {
            console.log('Not Authorized')
        }
        else {
            console.log('Authorized')
        }
        const data = await response.json();
        console.log(data)
    }
    async function submitHandler(event) {
        event.preventDefault();
        setUploadError(false);
        const answer = editorRef.current.getContent();
        console.log('attempting to upload')
        try {
          const response = await fetch("https://faq-api-demo.robsheldrick.dev.io-academy.uk/api/trainer/faq", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${Cookies.get('auth_key')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: title,
                answer: answer,
                language_id: selectedLangId,
            }),
          });
      
          const result = await response.json();
            console.log(result);
        } catch (error) {
          console.error("Error:", error);
        }
      }

    return (
        <div className="rounded-lg bg-slate-800">
            <div className="flex flex-row justify-between"></div>
            <h1 className="text-4xl text-center font-bold p-10 bg-slate-500 text-white rounded-lg">Add a Question and Answer in one go.</h1>
            <form className="mt-10">
                <div className="flex flex-row justify-around h-full w-full">
                <div className="px-10 flex flex-col justify-start gap-12"> 
                <div className="flex flex-col gap-1">
                    <label htmlFor='langselect' className="text-sm text-gray-500">Language</label>
                    <LanguageSelect id='langselect' selectstyles="text-lg rounded-lg p-1" optionstyles="text-lg" selectedLangId={selectedLangId} setSelectedLangId={setSelectedLangId} />
                    </div>
                    
                    <div className="mb-2 flex flex-col gap-1">
                        <label className="text-sm text-gray-500">Question/Title</label>
                        <textarea
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-4 mt-1 p-2 w-full rounded-md text-lg resize-none"
                            style={{ height: "200px" }}
                        />
                    </div>
                
                </div>
                <QuestionBuilder editorRef={editorRef}/>
                </div>
                <div className="flex flex-row justify-center gap-5"> 
                <button type='submit' onClick={submitHandler} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer">Submit</button>
                </div>
            </form>
            {uploadError && <h4 className="pb-6 text-lg text-red-500">There was an error uploading the question.</h4>}
        </div>
    );
}

export default TrainerPost;