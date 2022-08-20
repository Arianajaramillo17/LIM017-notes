import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db, updateNote } from '../firebase';
import { async } from "@firebase/util";
export function Edit() {


    const inicializeDataInputs = {
        title: "",
        post: "",
        author: localStorage.getItem("email"),
      };

    const [dataInputs, setDataInputs] = useState(inicializeDataInputs);
    const [currentId, setCurrentId] = useState('');
    const [notes, setNotes] = useState([]);
    const navigate= useNavigate();
    const {id}=useParams

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataInputs({ ...dataInputs, [name]: value });
        console.log(name, value)
      };
      const handleSubmit = (e) => {
        e.preventDefault();
    update(dataInputs);
        setDataInputs({ ...inicializeDataInputs });
      };
const update= async(objectNote)=>{
         objectNote.preventDefault() 
         const note= doc(db,"notes", id)
         //const data={title: title, post:post}
           await updateNote(currentId, objectNote.title, objectNote.post)
        navigate('/')
       }
const getNoteById= async(id)=> {
    const note=await getDoc(doc(db,"notes", id))
    if(note.exists()){
        setNotes(notes.data().title)
        setNotes(notes.data().post)
    }else{
        console.log('Nota no existe')
    }}
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
      }, [currentId]);

    return (
        <section className='containerHome'> hola
            </section>

        );

}
export default Edit;