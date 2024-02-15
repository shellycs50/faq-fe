import { FaTimes } from 'react-icons/fa';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useEffect } from 'react';

function PostModal({ content, setIsModalOpen }) {
    useEffect(() => {
        const unhighlightedElements = document.querySelectorAll('pre code:not([data-highlighted="yes"])');

        unhighlightedElements.forEach(element => {
            hljs.highlightElement(element);
        });
    }, [content]);

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-90 h-90vh flex flex-col overflow-y-auto rounded-lg">
                <div className="flex justify-end p-4 fixed top-0 right-0">
                    <FaTimes
                        className="text-gray-500 cursor-pointer w-6 h-6"
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>
                <div className="p-4" dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
        </div>
    );
}

export default PostModal;
