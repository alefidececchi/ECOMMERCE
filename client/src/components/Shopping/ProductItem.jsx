
const productItem = ({data, addToCart}) =>{
    let { id, name, price } = data

    return (
    <div>
        <h1>{name}</h1>
        <h3>${price}.00</h3>
        <button onClick={() => addToCart(id)}>Add</button>

    </div>)
}

export default productItem 
