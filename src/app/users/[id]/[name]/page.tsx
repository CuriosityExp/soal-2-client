"use client"
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const BASE_URL = "http://localhost:3001";
export default function EditPage() {
    const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()
  const params = useParams()
  const handleEdit = async (event:any) => {
    event.preventDefault()
    try {
        const {data} = await axios({
            method: "put",
            url: `${BASE_URL}/users/${params.id}`,
            data:{
                name, password
            },
            headers: {
                access_token : localStorage.access_token
            }
        })
        router.push('/users')
    } catch (error:any) {
        console.log(error)
        setError(error.response.data.message)
    }
  }
  useEffect(()=>{
    setName(String(params.name))
  },[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-5 bg-slate-300 rounded-xl">
        <form onSubmit={handleEdit}>
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
              value={name}
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
  )
}
