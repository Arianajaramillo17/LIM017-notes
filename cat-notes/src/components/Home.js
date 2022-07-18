import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  where,
  query,
  deleteDoc,
  getDoc,
  doc,
} from 'firebase/firestore';
import { db, updateNote } from '../firebase';
import {Modal} from './ModalActions';

export function Home() {
  const inicializeDataInputs = {
    title: "",
    post: "",
    author: localStorage.getItem("email"),
  };

  const [dataInputs, setDataInputs] = useState(inicializeDataInputs);
  const [currentId, setCurrentId] = useState('');
  const [notes, setNotes] = useState([]);
const[showModal, setShowModal]=useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataInputs({ ...dataInputs, [name]: value });
    console.log(name, value)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addnote(dataInputs);
    setDataInputs({ ...inicializeDataInputs });
  };
  const getNoteById = async (id) => {
    const docRefId = doc(db, "notes", id);
    const docSnap = await getDoc(docRefId);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
    setDataInputs({ ...docSnap.data() })
  }

  const addnote = async (objectNote) => {
    console.log(currentId);
    if (currentId === '') {
      const docRef = await addDoc(collection(db, "notes"), objectNote);
      console.log("Document written with ID: ", docRef.id);
    } else {
      await updateNote(currentId, objectNote.title, objectNote.post).then(() => {
        getNotes();
      })
    }
  };


  const getNotes = async () => {
    const q = query(
      collection(db, "notes"),
      where("author", "==", localStorage.getItem("email"))
    );
    onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setNotes(docs);
    });
  };
  getNotes();

  const onDeleteNote = (id) => {
    deleteDoc(doc(db, "notes", id));
  };

  useEffect(() => {
    const inicializeDataInputs = {
      title: "",
      post: "",
      author: localStorage.getItem("email"),
    };
    if (currentId === '') {
      setDataInputs({ ...inicializeDataInputs });
    } else {
      getNoteById(currentId)
    }
    getNotes()
  }, [currentId]);

  return (
    <section className='containerHome'>
      <div className='logoHome'>
      </div>
      <form className='containerNotes' onSubmit={handleSubmit}>
        <div className='containerPost'>
          <label className='imputLitle'>
            <input type='text' name="title" placeholder="Titulo" onChange={handleInputChange} value={dataInputs.title} />
          </label>
          <label className='imputPost'>
            <textarea type='text' name="post" placeholder="Escribe una nota" onChange={handleInputChange} value={dataInputs.post}>
            </textarea>
          </label>
          <button className="btnPrimary" >guardar</button>
        </div>
      </form>

      <section>

        <div className="notesList">
          {notes.map((note) => (
            <div className="notesContent" key={note.id} id={note.id}>
              <div className="noteCard">
                
                <input
                  //disabled={editNoteSelected !== index}
                  className="editTitleLoad"
                  value={note.title}
                />
                <textarea
                  //disabled={editNoteSelected !== index}
                  className="editDescriptionLoad"
                  rows="5"
                  value={note.post}
                >
                </textarea>
                {showModal ? (<Modal/>) : null}
                <button onClick={()=>{setShowModal(true)}}>Actions</button>
              </div>
            </div>
          ))}
        </div>

      </section>



    </section>
  );

}
export default Home;