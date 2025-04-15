'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function TabBar() {
    const pathname = usePathname();

    const navLinks = [
        { name: "Inicio", href:"/inicio"},
        { name: "Calculadoras", href:"/calculadoras"},
        { name: "Conversões", href:"/conversoes"},
        { name: "Sobre", href:"/sobre"},
      ]
    return(
        <div className="fixed flex justify-center gap-4 bottom-0 w-full  bg-black">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);

          return(
            <Link href={link.href} key={link.name}
            className={isActive ? "transition duration-700 bg-amber-600 text-blue-500" : "text-white"}>
              <p className={isActive ? "font-bold transition duration-700" : ""}>{link.name}</p>
            </Link>
          )
        })}
        </div>
    )
}