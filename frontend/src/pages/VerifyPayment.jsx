import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import {toast} from 'react-toastify'
import axios from 'axios'

const VerifyPayment = () => {

    const { navigate, token, setCartItems } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const VerifyPayment = async () => {
        try {
           if(!token){
             return null;
           } 
          const response = await axios.post(`https://mern-ecommerce-backend-xi.vercel.app/api/order/verifyStripe`, {success, orderId}, {headers: {token}});

          if(response.data.success) {
             setCartItems({});
             navigate('/orders');
          }else{
            navigate('/cart');
          }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        VerifyPayment();
    }, [token]);

    return (
        <div>

        </div>
    )
}

export default VerifyPayment
