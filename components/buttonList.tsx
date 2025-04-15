import Link from "next/link";

interface btnListProps {
    NameBtn: string;
    Page: string;
}

export default function buttonList({NameBtn, Page}: btnListProps) {
    return(
        <Link className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition" href={Page}>
            <p className="active:bg-red-400"> {NameBtn} teste</p>
        </Link>
    )
}