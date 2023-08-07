import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../context/UserContext";
import Note, { NoteData } from "./Note";
import Createnote from "./Createnote";
import Popup from "./Popup";
import {HiLogout} from 'react-icons/hi';

export default function Header() {
  //custom hook user context
  const {userId, setUserId} = useUserContext();
  //state for archive notes
  const [archive , setArchive] = useState(0);
  //state for notes
  const [notesData, setNotesData] = useState<null | NoteData[]>(null);
  //state for categories
  const [categoriesData, setCategoriesData] = useState<null | string[]>(null)
  //state for selected categorie
  const [cat, setCat] =useState<string | null>(null);
  //state for createNote
  const [open, setOpen] = useState<boolean>(false);
  //state for popup
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  //value for popup
  const popupValue = useRef<string | null>(null);


  const fetchNotes = async () => {
    try {
      const res = await fetch('http://localhost:8000/get-notes', {
        method: 'GET',
        headers: {
          'userId': userId.split(' ')[0],
          'archived': ''+archive,
          'category': cat ? cat : '0'
        },
        credentials: 'include'
      });
      //if session expired
      if (res.status === 401) setUserId('');
      //if notes don't exist
      if (res.status === 409) {
        setNotesData(null);
      }
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await res.json();
      setNotesData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  //get categories
  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:8000/get-categories', {
        method: 'GET',
        headers: {
          'userId': userId.split(' ')[0]
        },
        credentials: 'include'
      });
      //if session expired
      if (res.status === 401) setUserId('');
      //if notes don't exist
      if (res.status === 409) {
        setCategoriesData(null);
      }
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await res.json();
      const categories = data.map((obj: { category: string }) => obj.category);
      setCategoriesData(categories);
      console.log(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  //handle logout
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8000/logout', {
        method: 'POST',
        credentials: 'include'
      });
      //if session expired
      if (res.status === 401) setUserId('');
      if (res.status === 200) {
        setUserId('');
      } else {
        popupValue.current = await res.json();
        setOpenPopup(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  //set cat on select change
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCat(event.target.value);
  };


  useEffect(()=> {
    fetchNotes();
    fetchCategories();

    //rerender if archive, cat or userId changes
  }, [archive, cat, userId]);
  
  return (
    <>
      <header className="flex justify-center items-center bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white p-10">
        <h3 className="text-4xl font-bold">{archive === 0 ? 'My Notes' : 'Archived Notes'}</h3>
        <HiLogout title="logout" className="mx-2" size={40} onClick={handleLogout}/>
      </header>
        <div className="flex justify-center items-center p-10 space-x-4 max-w-4xl mx-auto">
          <button className="bg-black shadow-lg shadow-cyan-500/50 hover:bg-[#0081A7] text-white font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
          onClick={(() => {
            setOpen(true);
          })}
          >
            Create Note
          </button>
          <button className="bg-black shadow-lg shadow-cyan-500/50 hover:bg-[#0081A7] text-white font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
          onClick={()=> {
            archive === 0 ? setArchive(1) : setArchive(0);
          }}>
            {archive === 0 ? 'Archived Notes' : 'Unarchived Notes'}
          </button>
        </div>
        <div className="flex justify-center items-center">
          {
          categoriesData && 
            <select title="categories" onChange={handleCategoryChange}>
              <option value={0}>
                All categories
              </option>
              {categoriesData.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          }
        </div>
      {open && <Createnote closePopup={(() => setOpen(false))}/>}
      {notesData && <Note notesData={notesData} archived={archive}/>}
      {openPopup && <Popup text={popupValue.current as string} closePopup={(() => setOpenPopup(false))}/>}
    </>
  );
}