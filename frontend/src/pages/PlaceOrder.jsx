import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

const [method, setMethod] = useState('cod');
const {navigate, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  phone: ""
});
 
const onchangeHandler = (e) => {
  
  const name = e.target.name;
  const value = e.target.value;

  setFormData(data => ({...data, [name]:value}));
}

 const initPay = (order) => {
   const options = {
    key: import.meta.env.ROZORPAY_KEY_ID || "rzp_test_WYJNhi7pqm21MU",
    amount: order.amount,
    currency: order.currency,
    name: 'Order Payment',
    description: "Order payment",
    order_id: order.id,
    receipt: order.receipt,
    handler: async (response) => {
        console.log(response);
        try {
              const {data} = await axios.post('http://localhost:4000/api/order/verifyRazorpay', response, {headers: {token}});

                if(data.success) {
                  navigate('/orders');
                  setCartItems({});
                }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
    }  
   }
   const rzp = new window.Razorpay(options);
   rzp.open();
 }

const onSubmitHandler = async (event) => {
   event.preventDefault();

   try{
    let orderItems = [];
    
    // Build the order items from cartItems
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const itemInfo = structuredClone(products.find(product => product._id === items));
          if (itemInfo) {
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }
    }
  // Prepare the final order object
    const orderData = {
      address: formData,     
      items: orderItems,       
      amount: getCartAmount() + delivery_fee  
    }
console.log(orderData);

    switch(method)
    {
        case  'cod':
          const response = await axios.post('http://localhost:4000/api/order/place',orderData, {headers: {token}});
          console.log(response);
          if(response.data.success) {
            setCartItems({});
            navigate('/orders');
          }else{
            toast.error(response.data.message);
          }
        break;       
         case 'stripe':
          const responseStripe = await axios.post('http://localhost:4000/api/order/stripe',orderData, {headers: {token}});
          console.log(responseStripe);
          if(responseStripe.data.success) {
            const {session_url} = responseStripe.data;
            window.location.replace(session_url);
          }else{
            toast.error(responseStripe.data.message);
          }
          break;

          case 'razorpay':
            const responseRazorpay = await axios.post('http://localhost:4000/api/order/razorpay',orderData, {headers: {token}});
            console.log(responseRazorpay.data.order);
            if(responseRazorpay.data.success) {
               initPay(responseRazorpay.data.order);
            }else{
              toast.error(responseRazorpay.data.message);
            }
            break;
        default: 
        break;
    }
   }catch(error) {
       console.log(error);
       toast.error(error.message);
   }
}
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justi-be gap-4 pt-5 sm:pt-14 min-h-[80vh]  border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
       
       <div className='text-xl sm:text-2xl my-3'>
       <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
       </div>
       <div className='flex gap-3'>
        <input required onChange={onchangeHandler} name="firstName" value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name'/>
        <input  required onChange={onchangeHandler} name="lastName" value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name'/>
       </div>
       <input required onChange={onchangeHandler} name="email" value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address'/>
       <input required onChange={onchangeHandler} name="street" value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street'/>
       <div className='flex gap-3'>
        <input required onChange={onchangeHandler} name="city" value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'/>
        <input required onChange={onchangeHandler} name="state" value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'/>
       </div>
       <div className='flex gap-3'>
        <input required  onChange={onchangeHandler} name="zipcode" value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode'/>
        <input required onChange={onchangeHandler} name="country" value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country'/>
       </div>
       <input required onChange={onchangeHandler} name="phone" value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="tnumber" placeholder='Phone'/>
      </div>
      {/* Right Side */}
      <div className='mt-8'>

       <div className='mt-8 min-w-80'>
      <CartTotal />
       </div>
       
       <div className='mt-12'>
     <Title text1={'PAYMENT'} text2={'METHOD'}/> 
     {/* Payment method selection */}
        <div className='flex gap-3 flex-col lg:flex-row'>
           <div  onClick={() => setMethod('stripe')} className='flex items-center gap-3 border-2 p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border-2 rounded-full ${method === 'stripe'? 'bg-green-500': ''}`}></p>
            <img className='h-5 mx-4' src={assets.stripe_logo} alt="stripe" />   
           </div>

           <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border-2 p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border-2 rounded-full ${method === 'razorpay'? 'bg-green-500': ''}`}></p>
            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="stripe" />   
           </div>

           <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border-2 p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border-2 rounded-full ${method === 'cod'? 'bg-green-500': ''}`}></p>
            <p className='text-gray-600 text-sm font-medium mx-3'>CASH ON DELIVERY</p>
           </div>
        </div>

           <div className='w-full text-end mt-8'>
           <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
           </div>
       </div>
      </div>
    </form>
  )
}

export default PlaceOrder
