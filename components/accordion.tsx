// components/Accordion.tsx
'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  return (
    <div
      className="m-2 border-b border-orange-400"
      data-state={isOpen ? 'open' : 'closed'}
    >
      <button
        onClick={toggleAccordion}
        className="flex justify-between w-full p-4 hover:bg-blue-200 transition-colors"
      >
        <h2 className="text-lg font-semibold text-left text-white">{title}</h2>
        <h2> ICONE DE SETA </h2>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 1 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 1 }}
            transition={{ duration:.5, ease:'anticipate' }}
            className="overflow-hidden"
          >
            <p className='break-all mx-4 mb-2 text-gray-300'>{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
