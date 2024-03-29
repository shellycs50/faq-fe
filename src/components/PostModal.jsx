import { FaTimes } from 'react-icons/fa';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function PostModal({ content, setIsModalOpen }) {

    const modalContentRef = useRef(null);
    

    useEffect(() => {
        const unhighlightedElements = document.querySelectorAll('pre code:not([data-highlighted="yes"])');

        unhighlightedElements.forEach(element => {
            hljs.highlightElement(element);
        });
    }, [content]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            const modal = document.getElementById('post-modal');
            if (modal && !modal.contains(event.target)) {
                setIsModalOpen(false);
            }
        };

        
            document.addEventListener('mousedown', handleClickOutside);
        

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    // function scrollToTop() {
    //     var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    //     if (currentPosition > 0) {
    //         window.requestAnimationFrame(scrollToTop);
    //         window.scrollTo(0, currentPosition - currentPosition / 8);
    //     }

    // }

    useEffect(() => {
        if (modalContentRef.current) {
            modalContentRef.current.scrollIntoView({ behavior: 'smooth' });
            window.scrollBy(0, -500);
        }
    }, [])

    return (
        
        <div className=' flex flex-col min-h-screen min-w-full justify-center items-center bg-gray-200 pt-20 md:pt-32 -z-10'>
            <div className=''>
                <div className="flex flex-col justify-center items-center rounded-3xl p-10 h-full w-full relative" ref={modalContentRef}>
                <AnimatePresence >
                    <motion.div key="modal" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0}} exit={{opacity: 0, y: 100}} className='flex flex-col bg-baseblue bg-opacity-60 p-4 rounded-lg justify-start' id="post-modal">
                        <motion.div whileHover={{scale: 1.2, rotateZ: 180, transition: {duration: .2}}} className='cursor-pointer hover:relative hover:text-blue-500 transition-all duration-300 ease-in-out text-3xl self-end'>
                            <FaTimes
                                className=""
                                onClick={() => setIsModalOpen(false)}
                            />
                        </motion.div>
                        <div className='justify-self-center flex flex-col justify-center md:text-xl relative w-screen md:w-auto'>
                            <div className="p-5 pt-30 overflow-y-auto" dangerouslySetInnerHTML={{ __html: content }}></div>
                        </div>

                    </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    

    );
}

export default PostModal;
