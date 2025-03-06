'use client';
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [message, setMessage] = useState(null);
  const router = useRouter();
  
  const register = async (event) => {
    event.preventDefault();
    setMessage(null);
   
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData);
 
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    };
 
    try {
      const req = await fetch('http://localhost:1337/api/auth/local/register', reqOptions);
      const res = await req.json();
 
      if (res.error) {
        setMessage(res.error.message);
        return;
      }
 
      if (res.jwt && res.user) {
        setMessage('Successful registration.');
        setTimeout(()=>router.push("/login"),1500);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };
 
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h3 className="title-font font-small text-2xl text-gray-900">
            New user ? Create an account ......
          </h3>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
          <form onSubmit={register}>
            <div className="relative mb-4">
              <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Username</label>
              <input type="text" id="username" name="username" required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" name="email" required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Password</label>
              <input type="password" id="password" name="password" required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>

            <div>
            <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select id="Gender" name="Gender" required
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" >
              <option value="" disabled selected>Choose your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">Other</option>
            </select>
            </div>

            <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Submit
            </button>
          </form>
          {message && <p className="text-xs text-gray-500 mt-3">{message}</p>}
        </div>
      </div>
    </section>
  );
}
 