import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from 'sweetalert2';
import swal from 'sweetalert'
import {
    fetchBookByName,
    fetchAllBooks,
} from "../../Redux/thunks/booksThunks";
import {
    resetSearch,

} from "../../Redux/slices/bookSlice";
import s from "./searchBar.module.scss"



export default function SearchBar() {

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const { searchEmpty } = useSelector((state) => state.books);

    const handleAlert = () => {
        swal({
            title: "Sorry!",
            text: "No results were found for this name",
            icon: 'error',
            button: 'OK'
        }).then(res => {
            if (res) {//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
                dispatch(resetSearch())

            }
        })

    }

    function handleInput(e) {
        e.preventDefault()
        setName(e.target.value)//value de imput toma value de state

    }
    function handleSubmit(e) {

        if (name.length === 0) { return  swal({
            title: "Sorry!",
            text: "Book name is required",
            icon: 'error',
            button: 'OK'
        }).then(res => {
            if (res) {//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
                dispatch(resetSearch())

            }
        }) }
        else {
            e.preventDefault()
            dispatch(fetchBookByName(name))
        }//reset()
    }
    function reset() {
        setName("");
        dispatch(fetchAllBooks())
    }


    return (
        <div className={s.bar}>
            <input className={s.input} name="name" value={name} placeholder=" Book Name..." onChange={(e) => handleInput(e)} />
            <button className={s.close} onClick={(e) => reset(e)} >X</button>
            <button className={s.button} type="submit" onClick={(e) => handleSubmit(e)}><i class="fas fa-search fa-2x"></i></button>
            {searchEmpty
                ? handleAlert()
                : null}
        </div>
    )
}