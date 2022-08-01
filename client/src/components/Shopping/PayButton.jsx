import axios from 'axios'
import {useSelector} from 'react-redux'
import { url } from '../../Redux/slices/api'
import { toast } from 'react-toastify'

const PayButton = ({cartItems}) =>{

    const user = useSelector((state) => state.auth)

    const handleCheckout = () => {
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

    return(
        <div>
            <button onClick={() => handleCheckout()}>Check out</button>
        </div>
    )

}

export default PayButton