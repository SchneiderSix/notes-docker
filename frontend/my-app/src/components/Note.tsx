import {MdEditSquare, MdDeleteForever, MdArchive, MdUnarchive} from  'react-icons/md'
import Editnote from './Editnote';
import { useRef, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import Popup from './Popup';


export interface NoteData {
  id: string;
  title: string;
  category: string;
  description: string;
}

export default function Note(props: {notesData: NoteData[], archived: number}) {
  //custom hook user context
  const {userId, setUserId} = useUserContext();
  //state for editnote
  const [open, setOpen] = useState<boolean>(false);
  //state for popup
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  //value for popup
  const popupValue = useRef<string | null>(null);

  const archiveNote = async (id: string) => {
    try {
      const res = await fetch('http://localhost:8000/archive-notes', {
        method: 'POST',
        headers: {
          'id': id
        },
        credentials: 'include'
      });
      //if session expired
      if (res.status === 401) setUserId('');
      if (res.status === 200) {
        //popupValue.current = 'Note archived successfully';
        //setOpenPopup(true);
        //change userId to force render from parent
        setUserId(userId+' edited');
      } else {
        //popupValue.current = 'Error archiving note';
        //setOpenPopup(true);
      }
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const res = await fetch('http://localhost:8000/delete-notes', {
        method: 'POST',
        headers: {
          'id': id
        },
        credentials: 'include'
      });
      //if session expired
      if (res.status === 401) setUserId('');
      if (res.status === 200) {
        //popupValue.current = 'Note deleted successfully';
        //setOpenPopup(true);
        //change userId to force render from parent
        setUserId(userId+' edited');
      } else {
        //popupValue.current = 'Error deleting note';
        //setOpenPopup(true);
      }
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <section className="p-10">
        <h2 className="text-xl font-bold mb-4 flex justify-center items-center">Notes List</h2>
        <ul className="grid grid-cols-2 gap-4 text-center">
          {props.notesData.map((note) => (
            <li key={note.id} className="border p-4 my-2 break-words">
              <h1 className="text-2xl font-semibold">{note.title}</h1>
              <h2 className="text-xl font-semibold">{note.category}</h2>
              <p>{note.description}</p>
              <div className='flex justify-center'>
                <button
                title='archive'
                onClick={(() => {
                  archiveNote(note.id);
                })}
                >
                  {props.archived === 0 ? <MdArchive size={40} /> : <MdUnarchive size={40} />}
                </button>
                <button
                title='edit'
                onClick={() => {
                  setOpen(true);
                }}>
                  <MdEditSquare size={40} />
                </button>
                {open && <Editnote closePopup={(() => setOpen(false))} id={note.id}/>}
                <button
                title='delete'
                onClick={() => {
                  deleteNote(note.id);
                }}
                >
                  <MdDeleteForever size={40} />
                </button>
              </div>
            </li>
          ))}
        </ul>
    </section>
    {/*openPopup && <Popup text={popupValue.current as string} closePopup={(() => setOpenPopup(false))}/>*/}
    </>
  );
}