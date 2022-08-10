import axios from 'axios'
import { useSelector } from 'react-redux'
import { url } from '../../Redux/slices/api'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import swal from 'sweetalert'


const PayButton = ({cartItems, userInfo, cartInfo}) =>{

    let navigate = useNavigate()
    const user = useSelector((state) => state.auth)
    const[saldo, setSaldo] = useState(500)
    



    const handleCheckout = () => {
       
        if(userInfo.available_money > cartInfo.cartTotalAmount){
            swal({
                title:'Balance',
                text:'Do you want to use your balance?',
                icon:'warning',
                buttons:['No', 'Yes'] 
              }).then(res => {
                if(res){//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
                    console.log(cartInfo)
                    console.log(cartItems)
                    console.log(userInfo.available_money)
                    console.log(userInfo._id)
                    axios({
                        method: 'put',
                        url: `http://localhost:3001/users/purchasing-books/${userInfo._id}`,
                        data: {

                            cartQuantity: cartItems
                                                
                        }
                    })
                    cartItems.map(libro => {
                        console.log('//////////////////////////////')
                        // console.log(`http://localhost:3001/users/purchasing-books/${userInfo.id}`)
                        // console.log(libro.cartQuantity)
                        // console.log(libro.price)
                        axios({
                            method: 'put',
                            url: `http://localhost:3001/users/${userInfo._id}/${libro._id}`
                        })
                      })



                        // axios({
                        //     method: 'put',
                        //     url: `http://localhost:3001/users/purchasing-books/${userInfo.id}/${libro._id}`,
                        //     data: {
                        //         gastoPorLibro: (libro.price*libro.cartQuantity)*-1
                        //         cantidadLibro: libro.cartQuantity 
                                                    
                        //     }
                        // })




                        //aca iria el put de esos libros
                        //tambien iria el put para reducir el slado 
                    
                    // console.log('entro')
                    // axios.put(`http://localhost:3001/books/${del}/${id}`)
                    
                    // .then(reloading())
                    // dispatch(fetchAllBooks())
                    // console.log('entro')
                   
                    // //setBooks(filtrado)
                    // swal({text: 'Post  deleted successfully', icon: 'success'})
                  
                }else{
                    console.log(user.token)
                    if(user.token){
                    axios.post(`${url}/stripe/create-checkout-session`, {
                        cartItems,
                        userId: user._id
                    }).then((res) =>{
                        if(res.data.url){
                            window.location.href = res.data.url
                        }
                    }).catch((err) => console.log(err.message))}
                    else{
                        toast.error(`First you must be login`, {position: "top-center"})
                    }
                }
              })
        }else{
            console.log(user.token)
            if(user.token){
            axios.post(`${url}/stripe/create-checkout-session`, {
                cartItems,
                userId: user._id
            }).then((res) =>{
                if(res.data.url){
                    window.location.href = res.data.url
                }
            }).catch((err) => console.log(err.message))}
            else{
                navigate('/login')
                // toast.error(`First you must be login`, {position: "top-center"})
            }
        }
    }

    return (
        <div>
            <button onClick={() => handleCheckout()}>Check out</button>
        </div>
    )

}

export default PayButton


// axios({
//     method: 'put',
//     url: `http://localhost:3001/users/purchasing-books/${idUsuario}/${idLibro}`,
//     data: {
//         gastoPorLibro: precio*cantidad
//         cantidadLibro: 2 
                            
//     }
// })