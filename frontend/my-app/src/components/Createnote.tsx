import { useRef } from "react";
import { useUserContext } from "../context/UserContext";

interface CreatenoteProps {
  closePopup: () => void
}

export default function Createnote({closePopup}: CreatenoteProps) {
  //custom hook user context
  const {userId, setUserId} = useUserContext();
  const title = useRef<HTMLInputElement>(null);
  const category = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);

  const createNote = async () => {
    try {
      const res = await fetch('http://localhost:8000/create-notes', {
        method: 'POST',
        headers: {
          'title': title.current?.value as string,
          'description': content.current?.value as string,
          'category': category.current?.value as string,
          'userId': userId.split(' ')[0]
        },
        credentials: 'include'
      });
      //if session expired
      if (res.status === 401) setUserId('');
      if (res.status === 200) {
        //alert('Note created successfully');
        //change userId to force render from parent
        setUserId(userId+' edited');
      } else {
        //alert('Error creating note, please try another title');
      }
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    createNote();
    closePopup();
  }
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded z-20 w-1/3">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Title
            </label>
            <input
              className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
              ref={title}
              type="text"
              placeholder="Enter title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Category
            </label>
            <input
              className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
              ref={category}
              type="text"
              placeholder="Enter category"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Description
            </label>
            <textarea
              className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
              ref={content}
              minLength={20}
              placeholder="Enter description"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#00AFB9] hover:bg-[#0081A7] text-white font-bold py-2 rounded-md focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Create Note
            </button>
          </div>
        </form>
        <button className="my-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded-md focus:outline-none focus:shadow-outline" onClick={() => {
          closePopup();
        }
          }>Cancel</button>
      </div>
    </div>
  )
}
