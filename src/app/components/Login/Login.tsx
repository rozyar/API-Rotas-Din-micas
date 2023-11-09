"use client";
import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    if (!name || !email) {
      console.error("Nome e email são obrigatórios.");
      return;
    }

    const data = {
      name: name,
      email: email,
    };

    try {
      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setSuccessMessage("Cadastro realizado com sucesso!");
      const dataResponse = await response.json();
      return dataResponse;
    } catch (error) {
      setSuccessMessage("Erro ao cadastrar usuário.");
      console.error("Error found: ", error);
    }
  };

  useEffect(() => {
    if(successMessage){
     const timer = setTimeout(() => {
        setSuccessMessage('')
      }, 3000);

      return () => {
        clearTimeout(timer); // Limpa o temporizador se o componente for desmontado antes dos 3 segundos
      };

    }
  }, [successMessage])
  return (
    <>
      <div className="flex items-center justify-center w-screen h-full mt-52">
        <form
          className="flex w-96 h-80 bg-slate-800 flex-col items-center justify-center rounded-lg border-4 border-slate-700"
          onSubmit={handleSubmit}
        >
          <legend className="text-2xl text-white">Cadastro</legend>
          <input
            type="text"
            className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 m-5"
            placeholder="Nome"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 m-5"
            placeholder="E-mail"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="w-1/2">
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      {successMessage && ( // Exibe a mensagem de sucesso se successMessage não estiver vazio
        <div className="bg-green-200 text-green-800 p-2 text-center">
          {successMessage}
        </div>
      )}
    </>
  );
}
