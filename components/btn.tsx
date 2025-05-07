import Link from "next/link";

interface btnProps {
    name: string;
    page: string;
    cor: string;
}

export default function buttonList({name, page, cor}: btnProps) {
    return(
        <Link className={`${cor} flex justify-center items-center px-2 py-4 text-white font-semibold rounded-md active:opacity-50 transition`} href={page}>
            <p className="text-center">{name}</p>
        </Link>
    )
}