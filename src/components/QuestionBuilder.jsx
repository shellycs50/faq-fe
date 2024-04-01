
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
function QuestionBuilder({ editorRef }) {
  const [editorIsLoaded, setEditorIsLoaded] = useState(false)
  function handleEditorInit(event, editor) {
    console.log("called")
    editorRef.current = editor
    setEditorIsLoaded(true)
  }

  useEffect(() => {
    console.log(editorRef.current)
  }, [editorRef])
  return (
    <>
    {!editorIsLoaded && 
    <AnimatePresence>
    <motion.div initial={{opacity: 1}} animate={{opacity:1, transition: {duration: .3}}} exit={{opacity: 0}} className="mb-5 w-full h-500px lg:w-601px bg-white rounded-xl flex flex-col justify-center items-center text-xl">
      <div role="status" className="w-full animate-pulse flex flex-col items-start">
    
    <span className="sr-only">Loading...</span>
</div>
    </motion.div>
    </AnimatePresence>}
    
    {<AnimatePresence>
      <motion.div initial={{opacity: 0}} animate={{opacity:1, transition: {duration: .3}}}>
        <div className={` flex-col gap-5 + ${editorIsLoaded ? "flex" : "hidden"}`}>
          <Editor
            apiKey='3sl4l9qujv8w3c1ks86rbw3zoy9s2nmh2xkg4v0rb1lxf648'
            onInit={handleEditorInit}
            initialValue=""
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'codesample'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'bullist | ' +
                'removeformat | help' + 'codesample',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              placeholder: 'Write your answer here...',
            }}
          />
          <div className="flex flex-row justify-center gap-5">
          </div>
        </div>
      </motion.div>
    </AnimatePresence>}
    </>
  );
}
export default QuestionBuilder;