import Link from "next/link";

interface btnProps {
    NameBtn: string;
    Page: string;
}

export default function buttonList({NameBtn, Page}: btnProps) {
    return(
        <Link className="flex justify-center items-center px-2 py-4 bg-orange-500 text-white font-semibold rounded-md active:opacity-50 transition" href={Page}>
            <p className="text-center"> {NameBtn}</p>
        </Link>
    )
}