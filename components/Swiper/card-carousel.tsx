interface cardBtnProps {
    titulo: string;
    texto: string;
    href: string;
    namebtn: string;
    corbtn: string;
    corcard: string;
}

export default function CardCarousel ({titulo, texto, href, namebtn, corbtn, corcard} : cardBtnProps) {
    return(
        <div className={`flex flex-col gap-4 p-4 w-full ${corcard} rounded-xl justify-center`}>
            <div className='flex flex-col gap-2'>
                <h1 className='text-[20px] font-semibold text-white'>{titulo}</h1>
                <p className='text-zinc-400 text-justify'>{texto}</p>
            </div>
                <a className={`${corbtn} flex justify-center items-center px-2 py-4 text-white font-semibold rounded-md active:opacity-50 transition`} 
                href={href}>
                    {namebtn}
                </a>
        </div>
    )
}