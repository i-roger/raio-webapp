import Link from "next/link";

interface btnListProps {
    NameBtn: string;
    Page: string;
}

export default function buttonList({NameBtn, Page}: btnListProps) {
    return(
        <button disabled className="flex justify-center items-center h-24 w-40 bg-stone-800 text-white font-semibold rounded-md active:opacity-50 transition">
            
        </button>
    )
}