import LanguageSelect from "../../languageSelectMenu/LanguageSelect";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import { QueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

function StudentPost() {
    const [selectedLangId, setSelectedLangId] = useState(0);
    const [title, setTitle] = useState("");
    const [uploadError, setUploadError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const editorRef = useRef(null);
    const navigate = useNavigate();
    const queryClient = new QueryClient();

    async function submitHandler(event) {
        event.preventDefault();
        setUploadError(false);
        try {
            const response = await fetch("https://faq-api-demo.robsheldrick.dev.io-academy.uk/api/student/faq", {
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
            if (result.message == "Validation error") {
                let newstr = ""
                for (const key in result.errors) {
                    newstr += result.errors[key]
                }
                setErrorMessage(newstr);
            }
            if (response.status === 201) {
                queryClient.invalidateQueries('studentqaps');
                navigate("/success");
            }
        } catch (error) {
            let errorString = "";
            for (const key in error.errors) {
                errorString += error.errors[key] + " ";
            }
            setErrorMessage(errorString);
        }
    }

    return (
        <div className="pt-20 md:pt-0 flex flex-col items-center justify-center bg-gradient-to-tr from-baseblue via-baseblue to-blue-200 min-h-screen">
            <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0}} exit={{opacity: 0, y: 100}} className="flex flex-col items-center justify-center bg-gradient-to-tr from-tealywheely via-juicypastel to-tealywheely p-10  md:pt-20 rounded-xl md:h-1/2 lg:h-3/4 md:w-2/3">
            <h2 className="text-3xl font-semibold">Submit a Question</h2>
            <div className="max-md:flex max-md:flex-col md:grid md:grid-cols-3 gap-4 mt-8">
                <div className="w-auto md:w-1/2">
                <LanguageSelect
                    id="langselect"
                    selectstyles="text-lg rounded-lg p-1 w-full"
                    optionstyles="text-lg"
                    selectedLangId={selectedLangId}
                    setSelectedLangId={setSelectedLangId}
                />
                </div>
                <div className="flex flex-col md:w-72">
                    <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
                    >
                       Your Question
                    </label>
                    <textarea
                        id="message"
                        rows="8" // Increase the number of rows to make the textarea larger
                        className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="What's that Git thing again?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></textarea>
                </div>
                {/* this is horrible but im rushing */}
                <div></div> 
                <div></div>
                <div className="flex flex-col items-center">
                {errorMessage != "" && <p className="col-span-3 text-red-500">{errorMessage}</p>}
                <button
                    className="col-span-3 px-4 py-2 mt-4 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 w-full"
                    onClick={submitHandler}
                >
                    Submit
                </button>
                </div>
                
                
            </div>
            </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default StudentPost;