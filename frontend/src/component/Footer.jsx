import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='mt-40'>
        <hr />
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  text-sm '>
       <div>
         <img src={assets.logo} alt="logo" className='mb-5 w-32' />
         <p className='w-full md:w-2/3 text-gray-600'> Discover the best in fashion, electronics, and more at Collection. Shop the latest trends and enjoy exclusive offers tailored just for you.</p>
       </div>

       <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
        </ul>
       </div>

       <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 8197814691</li>
            <li>harshavardhan15015@gmail.com</li>
        </ul>
       </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All Right Reserved </p>
      </div>
    </div>
  )
}

export default Footer
