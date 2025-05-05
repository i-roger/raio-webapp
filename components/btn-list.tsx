import Link from "next/link";

interface btnListProps {
    NameBtn: string;
    Page: string;
}

export default function buttonList({NameBtn, Page}: btnListProps) {
    return(
        <Link className="flex justify-center items-center h-24 w-40 bg-orange-500 text-white font-semibold rounded-md active:opacity-50 transition" href={Page}>
            <p className="text-center"> {NameBtn}</p>
        </Link>
    )
}