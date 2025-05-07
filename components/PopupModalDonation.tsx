'use client';

import { useEffect, useState } from 'react';

import Card from './card';

const PopupModalDonation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  useEffect(() => {
    if (!hasBeenClosed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500); // Exibe o modal após 5 segundos

      return () => clearTimeout(timer);
    }
  }, [hasBeenClosed]);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setHasBeenClosed(true);
  };

  return (
    <>
      {isVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black/80"
        >
          <div
            className="bg-white p-6 rounded-xl shadow-lg relative w-11/12 max-w-md transform transition-transform bg duration-300 starting:scale-0"
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
              aria-label="Fechar modal"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Gostando do nosso aplicativo? </h2>
            <p>Considere apoiar o desenvolvimento com uma doação. Cada contribuição ajuda a manter o projeto vivo!</p>
            <Card
            cor='bg-pink-500'
            titulo='Fazer doação!'
            texto='Apoie o criador dessa ferramenta!'
            namebtn='Doar!'
            href=''/>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupModalDonation;
