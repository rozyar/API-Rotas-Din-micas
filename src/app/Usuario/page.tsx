"use client";
import {AiFillEye} from 'react-icons/ai'
import { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Post } from "../../../lib/data";
import Link from 'next/link';

export default function Usuario({}) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function getUsuarios() {
      try {
        const response = await fetch("http://localhost:3000/api/usuarios");
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        return setUsuarios(data.posts);
      } catch (error) {
        console.error("Error found: ", error);
      }
    }
    getUsuarios();
  }, []);

  console.log(usuarios);

  return (
    <>
      <div>
        <Header currentPage={"Usuarios"} />
        <div className="flex w-screen mt-32"></div>

        <div className="flex w-full h-full justify-center items-center flex-col">
          <div className="flex h-full w-30 flex-col bg-slate-700">
              <h1 className="text-white text-lg text-center mt-3 mb-3">Usuarios</h1>
            {usuarios.length > 0 &&
              usuarios?.map((usuario: Post) => (
                  <div
                  className="text-white border-2 border-slate-800 m-2"
                  key={usuario.id}
                  >
                  <p className="m-2">Nome: {usuario.name}</p>
                  <p className="m-2">Email: {usuario.email}</p>
                  <div className="flex w-full justify-center">
                    <Link href={`/Usuario/UserPage/${usuario.id}`}> <AiFillEye className="fill-white h-8 w-8 m-3 hover:fill-red-800"/> </Link>
                    </div>
                </div>
              ))}
          </div>
        </div>

        <div className="flex mb-20"></div>
        <Footer />
      </div>
    </>
  );
}
