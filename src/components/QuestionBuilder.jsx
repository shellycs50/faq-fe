
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
function QuestionBuilder() {
    const editorRef = useRef(null);
    const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <Editor
        apiKey='3sl4l9qujv8w3c1ks86rbw3zoy9s2nmh2xkg4v0rb1lxf648'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
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
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <div className="flex flex-row justify-center gap-5">
      <a onClick={log} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">Log editor content</a>
      </div>
    </div>
  );
}
export default QuestionBuilder;