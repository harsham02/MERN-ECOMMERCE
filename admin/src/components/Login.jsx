import React, { useState } from 'react'
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from 'react-toastify';
const Login = ({setToken}) => {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const onSumbitHandler = async (e) => {
    try{
     e.preventDefault();
     const response = await axios.post('https://mern-ecommerce-backend-xi.vercel.app/api/user/admin', {email, password});
     console.log(response.data);
      if(response.data.success){
          setToken(response.data.token);
      }else{
        toast.error(response.data.message);
      }
    }catch(error) {
      console.log(error);
       toast.error(error.message);
    }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
    <div className='bg-white shadow-md  rounded-lg px-8 max-w-md'>
      <h1 className='text-2xl font-bold my-4'>Admin Panel</h1>
      <form onSubmit={onSumbitHandler}>
        <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md w-full px-3 py-2 border border-x-gray-300 outline-none" type="email" placeholder='your@gmail.com' required/>
        </div>
        <div className='mb-3 min-w-72'>
            <p  className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input value={password} onChange={(e) => setpassword(e.target.value)} className="rounded-md w-full px-3 py-2 border border-x-gray-300 outline-none" type="password" placeholder='Enter your Password' required/>
        </div>
        <button className='mt-2 mb-4 w-full py-2 rounded-md text-white bg-black' type='submit' >Login</button>
      </form>
    </div>
    </div>
  )
}

export default Login
