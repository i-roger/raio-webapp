import Link from "next/link";

interface btnListProps {
    NameBtn: string;
    Page: string;
}

export default function buttonList({NameBtn, Page}: btnListProps) {
    return(
        <Link className="bg-blue-500 text-center text-white font-semibold py-2 px-4 rounded-md active:opacity-50 transition" href={Page}>
            <p className=""> {NameBtn}</p>
        </Link>
    )
}