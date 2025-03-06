"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
 
export default function LoginForm() {
  const [message, setMessage] = useState(null);
  const { login } = useAuth();
  const router = useRouter();
 
  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage(null);
 
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData);
 
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });
 
      const data = await response.json();
 
      if (data.error) {
        setMessage(data.error.message);
        return;
      }
 
      if (data.jwt && data.user) {
        login(data.user, data.jwt); // Store user and JWT
        router.push("/"); // Redirect to home page
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };
 
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h3 className="title-font font-small text-2xl text-gray-900">
            Login to your account
          </h3>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <label htmlFor="identifier" className="leading-7 text-sm text-gray-600">Username/Email</label>
              <input type="text" id="identifier" name="identifier" required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
           
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input type="password" id="password" name="password" required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Submit
            </button>
          </form>
          {message && <p className="text-xs text-red-500 mt-3">{message}</p>}
        </div>
      </div>
    </section>
  );
}
 