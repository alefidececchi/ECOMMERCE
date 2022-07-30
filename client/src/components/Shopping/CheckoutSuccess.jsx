import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearCart, getTotals } from "../../Redux/slices/shoping.slice";
import Footer from "../Footer/footer";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    
      <div>
        <h2>Checkout Successful</h2>

        <Footer />
      </div>
      
    
  );
};

export default CheckoutSuccess;