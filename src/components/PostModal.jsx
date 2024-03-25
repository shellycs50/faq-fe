import { FaTimes } from 'react-icons/fa';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useEffect, useRef } from 'react';
import { ScrollArea } from '../../components/ui/scroll-area';

function PostModal({ content, setIsModalOpen }) {
    const modalContentRef = useRef(null);
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
        if (modalContentRef.current) {
            modalContentRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        
    }, [])

    return (

        <div className=' flex flex-col min-h-screen min-w-full justify-center items-center bg-gray-200 pt-40'>
            <div className=''>
                <div className="flex flex-col justify-center items-center rounded-3xl p-10 h-full w-full relative" ref={modalContentRef}>

                    <div className='flex flex-col bg-baseblue bg-opacity-60 p-4 rounded-lg justify-start'>
                        <FaTimes
                            className="cursor-pointer hover:relative hover:text-blue-500 transition-all duration-300 ease-in-out text-3xl hover:text-5xl m-2 hover:m-0 self-end"
                            onClick={() => setIsModalOpen(false)}
                        />

                        <div className='justify-self-center flex flex-col justify-center text-xl relative'>
                            <div className="p-5 pt-30 overflow-y-auto" dangerouslySetInnerHTML={{ __html: content }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PostModal;
