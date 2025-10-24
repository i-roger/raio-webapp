export default function Obrigado() {
    return(
        <>
        <div className="flex flex-col justify-center w-full min-h-[70vh] gap-2 px-4">
            <h1 className="font-bold text-[28px] text-white">Sua mensagem foi enviada! ✅</h1>
            <a href="/inicio" className="font-semibold text-center text-[20px] bg-amber-600 hover:bg-amber-700 active:opacity-50 transition text-white py-2 px-4 rounded mt-4 cursor-pointer">
            Retornar ao site
            </a>
        </div>
        </>
    )
}