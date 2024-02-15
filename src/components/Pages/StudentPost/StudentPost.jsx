import LanguageSelect from "../LanguageSelect";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";


function StudentPost() {
    const [selectedLangId, setSelectedLangId] = useState(0);
    const [title, setTitle] = useState("");
    const [uploadError, setUploadError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const editorRef = useRef(null);
    const navigate = useNavigate();


    async function submitHandler(event) {
        event.preventDefault();
        setUploadError(false);
        console.log('attempting to upload')
        try {
            const response = await fetch("http://localhost:8000/api/student/faq", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${Cookies.get('auth_key')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: title,
                    language_id: selectedLangId,
                }),
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Error:", error);
            let errorString = "";
            for (const key in error.errors) {
                errorString += error.errors[key] + " ";
            }
            setErrorMessage(errorString);
        }
    }

    return (
        <div className="flex flex-col items-center pt-5">
            <h2 className="text-3xl">Submit a Question</h2>
            <div className="grid grid-cols-3 gap-4 mt-8 max-h-screen">
                <div>
                <LanguageSelect
                    id="langselect"
                    selectstyles="text-lg"
                    optionstyles="text-lg"
                    selectedLangId={selectedLangId}
                    setSelectedLangId={setSelectedLangId}
                />
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                       Your Question
                    </label>
                    <textarea
                        id="message"
                        rows="8" // Increase the number of rows to make the textarea larger
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="What's that Git thing again?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></textarea>
                </div>
                {uploadError && <p className="col-span-3 text-red-500">{errorMessage && errorMessage}</p>}
                <button
                    className="col-span-3 px-4 py-2 mt-4 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={submitHandler}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default StudentPost;