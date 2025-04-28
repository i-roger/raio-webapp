import Link from "next/link";

interface btnListProps {
    NameBtn: string;
    Page: string;
}

export default function buttonList({NameBtn, Page}: btnListProps) {
    return(
        <Link className="flex justify-center items-center h-30 w-48 bg-blue-500 text-white font-semibold rounded-md active:opacity-50 transition" href={Page}>
            <p className="text-[20px] text-center"> {NameBtn}</p>
        </Link>
    )
}