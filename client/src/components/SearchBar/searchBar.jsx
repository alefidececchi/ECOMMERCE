import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import {
    fetchBookByName,
} from "../../Redux/thunks/booksThunks";
import s from "./searchBar.module.scss"



export default function SearchBar() {

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    console.log(name)
    function handleInput(e) {
        e.preventDefault()
        setName(e.target.value)//value de imput toma value de state

    }
    function handleSubmit(e) {

        if (name.length === 0) { return alert('Book name is required') }
        else {
            e.preventDefault()
            dispatch(fetchBookByName(name))
        }//reset()
    }
    // function reset() {
    //     setName("");
    // }

    return (
        <div className={s.bar}>
            <input className={s.input} name="name" value={name} placeholder=" Book Name..." onChange={(e) => handleInput(e)} />
            <button className={s.button} type="submit" onClick={(e) => handleSubmit(e)}><i class="fas fa-search fa-2x"></i></button>

        </div>
    )
}