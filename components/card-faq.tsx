interface cardBtnProps {
    titulo: string;
    texto: string;
}

export default function CardFaq ({titulo, texto} : cardBtnProps) {
    return(
        <div className='flex flex-col gap-4 m-2 p-4 bg-zinc-800 rounded-xl'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-[20px] font-semibold text-white'>{titulo}</h1>
                <p className='text-zinc-400 text-start'>{texto}</p>
            </div>
        </div>
    )
}