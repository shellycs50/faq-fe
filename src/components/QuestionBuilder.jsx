
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef } from "react";
function QuestionBuilder({editorRef}) {
  return (
    <div className="flex flex-col gap-5">
      <Editor
        apiKey='3sl4l9qujv8w3c1ks86rbw3zoy9s2nmh2xkg4v0rb1lxf648'
        onInit={(evt, editor) => editorRef.current = editor}
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
  );
}
export default QuestionBuilder;