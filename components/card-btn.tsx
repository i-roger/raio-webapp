import Button from "./buttonList";

interface cardBtnProps {
    titulo: string;
    texto: string;
    href: string;
}

export default function CardFaq ({titulo, texto, href} : cardBtnProps) {
    return(
        <div className='flex flex-col gap-4 m-2 p-4 bg-zinc-800 rounded-xl'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-[20px] font-semibold text-white'>{titulo}</h1>
                <p className='text-zinc-500 text-start'>{texto}</p>
            </div>
                <Button NameBtn='Instagram' Page={href} />
        </div>
    )
}