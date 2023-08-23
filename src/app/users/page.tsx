"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
const BASE_URL = "http://localhost:3001";
export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleDelete = async (id: number) => {
    try {
      const { data } = await axios({
        method: "delete",
        url: `${BASE_URL}/users/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      });
      getUsersData();
      console.log(data.message);
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const getUsersData = async () => {
    try {
      setLoading(true);
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}/users`,
        headers: {
          access_token: localStorage.access_token,
        },
      });
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsersData();
  }, []);
  if (loading) {
    return <div className=" min-h-screen flex justify-center items-center"> 
        <h1 className="text-3xl text-center">Loading . . .</h1>
        </div>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col">
        <div className="w-full mb-5">
          <Link className="p-5 bg-emerald-400 rounded-lg" href={"register"}>
            Register New User
          </Link>
        </div>
        {message && (
          <div className="w-full mb-5 bg-green-200 flex justify-around items-center">
            <p className="text-xl">{message}</p>
            <button className="p-2 bg-slate-200 hover:bg-slate-300" onClick={()=>{
                setMessage("")
            }}>X</button>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Password</th>
              <th>Ctime</th>
              <th>Fungsi</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any, idx:number) => {
              return (
                <tr key={idx}>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.createdAt.slice(0,10)}</td>
                  <td>
                    <Link className="text-yellow-600" href={`/users/${user.id}/${user.username}`}>Edit</Link> |{" "}
                    <button
                      className="text-red-600"
                      onClick={() => {
                        handleDelete(user.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
