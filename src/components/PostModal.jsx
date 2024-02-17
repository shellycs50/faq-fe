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

    function scrollToTop() {
        var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentPosition > 0) {
          window.requestAnimationFrame(scrollToTop);
          window.scrollTo(0, currentPosition - currentPosition / 8);
        }

    }

    useEffect(() => {   
        scrollToTop();
    }, [])

    return (
        <div className=" flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white flex flex-col rounded-lg mt-10 m-3">

                    <div className='flex flex-row justify-end'>
                    <FaTimes
                        className="cursor-pointer hover:text-red-500 transition-all duration-300 ease-in-out relative right-7 top-7 text-3xl"
                        onClick={() => setIsModalOpen(false)}
                    />
                    </div>
                
                <div className="mx-60 pb-12 rounded-lg" dangerouslySetInnerHTML={{ __html: content }}></div>
                <div className='h-80 bg-black bg-opacity-50'></div>
            </div>
        </div>
    );
}

export default PostModal;
