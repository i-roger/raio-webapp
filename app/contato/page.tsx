"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Contato() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    await fetch("https://formsubmit.co/rogercompany1@gmail.com", {
      method: "POST",
      body: formData,
    });

    router.push("/contato/obrigado");
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="m-4 text-center font-semibold text-white text-[28px]">
        Formulário de Contato
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center text-[16px] md:text-[20px] text-white px-4 w-full md:w-[700px]"
      >
        <label htmlFor="name">Nome</label>
        <input
          className="bg-stone-800 rounded p-2 my-2"
          type="text"
          name="name"
          id="name"
          required
        />

        <label htmlFor="email">Seu E-mail</label>
        <input
          className="bg-stone-800 rounded p-2 my-2"
          type="email"
          name="email"
          id="email"
          required
        />

        <label htmlFor="message">Mensagem</label>
        <textarea
          className="bg-stone-800 rounded p-2 my-2 text-inherit min-h-52 resize-none"
          name="message"
          id="message"
          required
        ></textarea>

        <input type="hidden" name="_captcha" value="false" />

        <button
          type="submit"
          disabled={isSubmitting}
          className="font-semibold bg-amber-600 hover:bg-amber-700 active:opacity-50 transition text-white py-2 px-4 rounded mt-4 cursor-pointer"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
