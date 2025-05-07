'use client';

import { useEffect, useState } from 'react';
import Button from "./btn";

import DonationIcon from "../assets/donation-icon-black.svg"
import Image from 'next/image';

const PopupModalDonation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Busca a informação no localstorage e verifica se o modal já foi exibido anteriormente
    const hasSeenModal = localStorage.getItem('hasSeenDonationModal');

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000); // Modal in 10s

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Adiciona ou remove a classe para impedir o scroll quando o modal está visível
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
    localStorage.setItem('hasSeenDonationModal', 'true'); // Armazena no localstorage se o modal já foi exibido
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black/80">
          <div className="bg-white p-6 rounded-xl shadow-lg relative w-11/12 max-w-md transform transition-transform bg duration-300 starting:scale-0">
          <button
              onClick={handleClose}
              className="absolute top-0 right-2 text-gray-500 hover:text-gray-700 text-4xl cursor-pointer"
              aria-label="Fechar modal"
            >
              &times;
            </button>
            <div className='flex justify-center'>
              <Image width={128} alt="Icone de doação" src={DonationIcon}/>
            </div>
            <div className='mt-4 mb-4'>
              <h2 className="text-xl font-semibold mb-4">Gostando do nosso aplicativo?</h2>
              <p className='text-justify'>
                Considere apoiar o desenvolvimento com uma doação. Cada contribuição ajuda a manter o projeto vivo! <br/><br/> Você pode enviar através do Qr Code ou Pix Copia e Cola.
              </p>
            </div>
            <div onClick={handleClose}>
              <Button cor='bg-cyan-600' name='Fazer doação!' page='/donation'/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupModalDonation;
