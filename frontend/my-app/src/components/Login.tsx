import { useRef, useState } from "react";
import { useUserContext } from "../context/UserContext";
import Popup from "./Popup";

export default function Login() {
  //refs for inputs
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  //state for popup
  const [open, setOpen] = useState<boolean>(false);

  //custom hook user context
  const {userId, setUserId} = useUserContext();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //login
    try {
      const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'email': email.current?.value as string,
          'password': password.current?.value as string
        },
        credentials: 'include'
      });
      if(res.status !== 200) {
        //open popup
        setOpen(true);
      }
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
      const result = await res.json();
      if (result.message === 'Login successful') {
        setUserId(result.id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg w-1/4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 p-5">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
              ref={email}
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 p-5">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
              ref={password}
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between py-0.2">
          <button
              className="bg-cyan-500 shadow-lg shadow-cyan-500/50 hover:bg-[#0081A7] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-between">
          </div>
        </form>
      </div>
      {open && <Popup text='Invalid parameters' closePopup={(() => setOpen(false))}/>}
    </div>
  )
}