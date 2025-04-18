'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { IoIosSwap, IoIosHome, IoIosCalculator, IoIosFlash } from "react-icons/io";



export default function TabBar() {
    const pathname = usePathname();

    const navLinks = [
        { name: "Inicio", href:"/inicio", icon: <IoIosHome size={24}/>},
        { name: "Calculadoras", href:"/calculadoras", icon: <IoIosCalculator size={24}/>},
        { name: "Conversões", href:"/conversoes", icon: <IoIosSwap size={24}/>},
        { name: "Sobre", href:"/sobre", icon: <IoIosFlash size={24}/>},
      ]
    return(
        <div className="fixed flex justify-center gap-4 bottom-0 w-full bg-zinc-800">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);

          return(
            <Link href={link.href} key={link.name}
            className={`flex flex-col items-center p-2
            ${isActive ? "transition duration-700 text-blue-500" : "text-zinc-400"}`}>
              {link.icon}
              <p className={isActive ? "transition duration-700" : ""}>{link.name}</p>
            </Link>
          )
        })}
        </div>
    )
}