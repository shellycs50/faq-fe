import LanguageSelect from "../LanguageSelect";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import QuestionBuilder from "../../QuestionBuilder";
import { useParams } from "react-router-dom";

function TrainerEdit() {
    const [cache, setCache] = useState({
        title: "",
        selectedLangId: null,
    });
    const [selectedLangId, setSelectedLangId] = useState(undefined);
    const [title, setTitle] = useState(""); 
    const [uploadError, setUploadError] = useState("");
    const editorRef = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();
    let nonStateTitle = ""
    let nonStateLang = null
   

    async function fetchQuestion(id) {
        const response = await fetch(`https://faq-api-demo.robsheldrick.dev.io-academy.uk/api/trainer/faq/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('auth_key')}`,
            },
        })
        const data = await response.json();
        return data.data;
    }

    useEffect(() => {
        if (nonStateLang != null && nonStateTitle != "") {
            return;
        }

        const fetchData = async () => {
            const question = await fetchQuestion(id);
            setSelectedLangId(question.language_id);
            setTitle(question.question);
            setCache({
                title: question.question,
                selectedLangId: question.language_id,
            });
            
        };

        fetchData();
    }, []);

    async function submitHandler(event) {
        event.preventDefault();
        setUploadError(false);
        const answer = editorRef.current.getContent();
        const bodyObj = {
            qap_id: id,
            question: title,
            language_id: selectedLangId,
        }

        if (answer !== "<p>Write your answer here.</p>") {
            bodyObj['answer'] = answer;
        }

        if (title !== cache.title) {
            bodyObj['question_rename'] = title;
        }
        
        try {
          const response = await fetch("https://faq-api-demo.robsheldrick.dev.io-academy.uk/api/trainer/faq", {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${Cookies.get('auth_key')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyObj),
          });
      
          const result = await response.json();
          if (result.message === "Success") {
            navigate("/success");
        }
        if (result.message === "Validation error") {
            let errorstr = "";
            for (const key in result.errors) {
                errorstr += result.errors[key];
            }
            setUploadError(errorstr);   
        }
            
        } catch (error) {
            setUploadError(error)
        }
      }

      function resetToCache() {
        setSelectedLangId(cache.selectedLangId);
        setTitle(cache.title);
      }

    return (
        <div className="bg-slate-500 h-screenminusnav">
    <div className="rounded-lg bg-slate-800 pb-10">
        <h1 className="text-4xl text-center font-bold p-10 bg-slate-500 text-white rounded-lg">Quick Add</h1>
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
                    {uploadError != "" && <h4 className="pb-6 text-lg text-red-500">{uploadError}</h4>}
                </div>
                <QuestionBuilder editorRef={editorRef}/>
            </div>
            <div className="flex flex-row justify-center gap-5">
                <a onClick={resetToCache} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer">Reset All Values</a> 
                <button type='submit' onClick={submitHandler} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer">Submit</button>
            </div>
        </form>
    </div>
</div>

    );
}

export default TrainerEdit;