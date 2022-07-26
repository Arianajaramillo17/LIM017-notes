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
import {Edit} from './Edit';

export function Modal(props) {
      const inicializeDataInputs = {
      title: "",
      post: "",
      author: localStorage.getItem("email"),
      };

 const [dataInputs, setDataInputs] = useState(inicializeDataInputs);
 const [currentId, setCurrentId] = useState('');
 const [notes, setNotes] = useState([]);
 const [showEdit, setShowModEdit] = useState(false);
 
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setDataInputs({ ...dataInputs, [name]: value});
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
  setDataInputs({ ...docSnap.data()})
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
      setDataInputs({...inicializeDataInputs});
    } else {
      getNoteById(currentId)
    }
    getNotes()
  }, [currentId]);


      return (
        <>
         <section>
            <div className="notesList">
            {(
            <div className="notesContent" key={props.note.id} id={props.note.id}>
              <div className="noteCard">
                <div className="contentBtnEdit">
                
                  <button
                    data-noteid={props.note.id}
                    className="editNote"
                    onClick={() =>  { setShowModEdit(true) }}
                  >
                editar
                  </button>
                  {showEdit ? (<Edit/>) : null}
                </div>
                <div className="contentBtnClose">
                  <button
                    className="btnClose"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNote(props.note.id);
                    }}
                  >
                   borrar
                  </button>
                </div>            
              </div>
            </div>
          )}
                </div> 

            </section>

  </>
      )
}
export default Modal