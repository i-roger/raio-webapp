"use client"
import Image from "next/image";
import QrCode from "../../assets/DonationPix.png";
import DonationIcon from "../../assets/donation-icon-white.svg";

export default function Donation() {

    return(
        <div className="flex flex-col justify-center mb-20">
            <div className='flex flex-col justify-center m-2 p-4 bg-zinc-800 rounded-xl'>
                <div className='flex justify-center m-4'>
                    <Image width={64} alt="Icone de doação" src={DonationIcon}/>
                </div>
                <h1 className="text-[20px] font-semibold text-white text-center">Bem vindo a página de doação!</h1>
            </div>
            <div className='flex flex-col justify-center gap-2 m-2 p-4 bg-zinc-800 rounded-xl text-neutral-400'>
                <h1 className="text-[20px] font-semibold text-white">Pix Copia e Cola</h1>
                <p className="text-zinc-400 font-semibold">
                    1- Copie a chave do PIX abaixo. <br/>
                    2- Acesse o aplicativo do seu banco. <br/>
                    3- Procure por PIX ou Transferência Via PIX. <br/>
                    4- Escolha o valor que desejar. <br/>
                    5- Cole a chave e faça sua doação! 
                </p>
                <p className="text-2xl p-2 text-center text-orange-600 bg-stone-900 rounded">c5c09f23-1eb6-4558-8586-6a34af088e32</p>
                <h1 className="text-[20px] font-semibold text-white text-center">Muito obrigado por nos apoiar!</h1>
            </div>
            <div className='flex flex-col justify-center gap-4 m-2 p-4 bg-zinc-800 rounded-xl'>
                <h1 className="text-[20px] font-semibold text-white">Pix via QR CODE</h1>
                <p className="text-zinc-400 font-semibold">
                    Abra o aplicativo do seu banco e utilize a câmera para fazer a leitura do Pix Qr Code.
                </p>
                <div className="flex justify-center">
                    <Image className="rounded" width={250} alt="pix qr code" src={QrCode}></Image>
                </div>
            </div>
        </div>
    )
}