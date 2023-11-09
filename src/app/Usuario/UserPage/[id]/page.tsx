"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from '../../../../../lib/data';

type Params = {
  id: string;
};

export default function UserPage() {
  const [user, setUser] = useState<Post | null>();
  const [loading, setLoading] = useState(true)
  const userId = useParams<Params>().id;

  
  useEffect(() => {
      async function getUserById() {
        let id = userId;
      try {
        const response = await fetch(`http://localhost:3000/api/usuarios/${id}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setLoading(false);
        return setUser(data.post);
      } catch (err) {
        console.error("Error found: ", err);
        throw err;
      }
    }
    getUserById();
  }, [userId]);

 

  return (
    <>
      <div className="flex w-screen mt-32"></div>
      <div className="flex w-full h-full justify-center items-center flex-col">
        <div className="flex h-full w-30 flex-col bg-slate-700">
          <h1 className="text-white text-lg text-center mt-3 mb-3">Olá {user?.name}</h1>
          {user && ( // Verifica se user não é nulo
            <div className="text-white border-2 border-slate-800 m-2" key={user.id}>
              <p>Nome: {user.name}</p>
              <p>Email: {user.email}</p>
              <div></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
