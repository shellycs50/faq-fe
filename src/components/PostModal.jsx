import { FaTimes } from 'react-icons/fa';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '../../components/ui/separator';

function PostModal({ content, setIsModalOpen, title, lang }) {

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

    // useEffect(() => {
    //     if (modalContentRef.current) {
    //         modalContentRef.current.scrollIntoView({ behavior: 'smooth' });
    //         window.scrollBy(0, -500);
    //     }
    // }, [])

    return (

        <div className=' flex flex-col min-h-screen w-full justify-center items-center bg-baseblue pt-20 md:pt-32 -z-10'>
            <div className=''>
                <div className="flex flex-col justify-center items-center rounded-3xl p-10 h-full max-w-7xl relative" ref={modalContentRef}>
                    <AnimatePresence >
                        <motion.div key="modal" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className='flex flex-col bg-white p-4 border-4 border-slate-200 rounded-xl justify-start' id="post-modal">
                            <div className='flex flex-row justify-between'>
                            <p className='font-semibold text-slate-700'>{lang}</p>
                            <motion.div whileHover={{ scale: 1.4, rotateZ: 180, transition: { duration: .2 } }} className='cursor-pointer hover:relative hover:text-blue-500 transition-all duration-300 ease-in-out text-3xl'>
                                <FaTimes
                                    className=""
                                    onClick={() => setIsModalOpen(false)}
                                />
                            </motion.div>
                            </div>
                            <div className='text-4xl font-bold flex flex-col items-center py-4'>
                                <h1 className='py-4 max-w-75% text-center'>{title}</h1>
                                <Separator orientation="horizontal" className="w-3/4" />
                            </div>

                            <div className='self-center flex flex-col justify-center md:text-xl relative max-w-xs  sm:max-w-xl md:max-w-3xl lg:max-w-none md:w-auto'>
                                <div className="p-5 pt-30 overflow-y-auto prose-lg prose-code:font-semibold prose-code:rounded-xl prose-code:bg-opacity-50 prose-code:text-xl" dangerouslySetInnerHTML={{ __html: content }}></div>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>


    );
}

export default PostModal;
