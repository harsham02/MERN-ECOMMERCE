import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../component/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'> 
       <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
      <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold tetx-xl text-gray-600'>Our Store</p>
        <p className='text-gray-500'>#2575 Sree Durga Aprt <br /> singsandra, Bengaluru - 560068 </p>
        <p className='text-gray-500'>Phone:+91 8197814691 <br /> Email: harshaleftys@gmail.com</p>
        <p className='font-semibold tetx-xl text-gray-600'>Careers at Forever </p>
        <p className='text-gray-500'>lEarn more about our teamns and job openings</p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
      </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default Contact
