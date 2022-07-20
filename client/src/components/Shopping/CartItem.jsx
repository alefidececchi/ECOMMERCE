const CartItem = ({ data, delFromCart }) =>{

    let { id, name, price, quantity } = data
    return(
        <div>
            <h1>{name}</h1>
            <h4>${price}.00 x {quantity} = ${price * quantity}.00</h4>
            <button onClick={() => delFromCart(id)}>Delete one</button>
            <br />
            <button onClick={() => delFromCart(id, true)}>Delete all</button>
        </div>
    )
}

export default CartItem