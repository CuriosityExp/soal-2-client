"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const BASE_URL = "http://localhost:3001";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleRegister = async (event: any) => {
    event.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: `${BASE_URL}/register`,
        data: {
          name,
          password,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      });
      router.push("/users");
    } catch (error: any) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-5 bg-slate-300 rounded-xl">
        <form onSubmit={handleRegister}>
          <h1 className="text-3xl">Form Penambahan User</h1>
          <hr />

          {error && (
            <h1 className="text-xl text-red-500 bg-white mt-2"> {error}!</h1>
          )}
          <div className="mt-2">
            <label htmlFor="name">Nama: </label>
            <input
              type="text"
              placeholder="Tulis nama user"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="name">Password: </label>
            <input
              type="text"
              placeholder="Tulis password user"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full p-5 bg-emerald-500 mt-2 rounded-xl"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
