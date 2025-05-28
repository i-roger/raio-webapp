// components/Accordion.tsx
'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Arrow from "../assets/arrow-accordion.svg";
import Image from 'next/image';

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  return (
    <div
      className="mx-2 p-4 border-t border-orange-400"
      data-state={isOpen ? 'open' : 'closed'}
    >
      <button
        onClick={toggleAccordion}
        className="group flex justify-between w-full mb-2 transition active:opacity-80">
          <h2 className="text-lg font-semibold text-left text-white break-words">{title}</h2>
          <Image src={Arrow} alt='Seta para baixo' className={`w-6 h-6 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${isOpen? 'rotate-180' : ''}`}/>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration:.5, ease:'anticipate' }}
            className="overflow-hidden"
          >
            <p className='text-justify mb-2 text-gray-300'>{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
