"use client";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "../ServerActions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
const BASE_URL = "http://localhost:3001";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);

  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }
  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      // console.log(name,password,captcha)
      const { data } = await axios.post(`${BASE_URL}/login`, {
        name,
        password,
        inputCaptcha: isVerified,
      });
      if (!data.access_token) {
        setError("LOGIN GAGAL");
      }
      localStorage.access_token = data.access_token;
      router.push("/users");
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col bg-slate-400 p-5 rounded-xl">
        <form onSubmit={handleLogin}>
          <h1 className="text-3xl">Form Login</h1>
          <hr />
          {error && (
            <h1 className="text-xl text-red-500 bg-white mt-2"> {error}!</h1>
          )}
          <div className="mt-2">
            <label htmlFor="name">Nama: </label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Tulis nama di sini"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tulis password di sini"
            />
          </div>
          <div className="mt-2">
            <ReCAPTCHA
              sitekey= {"6Le8jcsnAAAAAGCVJWmz-c906TQ_JTA-_gcrzZmj"}
              ref={recaptchaRef}
              onChange={handleCaptchaSubmission}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-2 rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:bg-red-500 "
            disabled={!isVerified}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
