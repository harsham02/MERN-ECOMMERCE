import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../component/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-4xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className=' flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Forever is your one-stop destination for timeless fashion, offering a blend of classic styles and modern trends. Our mission is to provide high-quality products that express your individuality and elevate your wardrobe. We are committed to delivering a seamless shopping experience with a focus on customer satisfaction.</p>
        <p>At Forever, we believe in promoting fashion that’s both stylish and sustainable. We carefully curate our collections to align with ethical practices, ensuring that every purchase you make contributes to a more responsible fashion industry. Join us in celebrating fashion that’s made to last and designed for everyone.</p>
        <b className='text-gray-800'>Our Vission</b>
        <p>To become a globally recognized brand that redefines fashion by seamlessly blending timeless style with sustainable practices, empowering individuals to express their true selves.</p>
        <b className='text-gray-800'>Our Mission</b>
         <p>To provide high-quality, stylish, and affordable fashion that meets the needs of our customers while promoting sustainable and ethical practices in every aspect of our business.</p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-10'>
      <div className='border px-8 md:px-12 sm:py-10 flex flex-col gap-5'>
  <b>Quality Assurance:</b>
  <p className='text-gray-600'>At Forever, we prioritize quality in every product we offer. Each item is meticulously inspected to ensure it meets our high standards, ensuring you receive only the best. Our commitment to quality means you can shop with confidence, knowing that every purchase is backed by our promise of excellence.</p>
</div>
<div className='border px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5'>
  <b>Convenience:</b>
  <p className='text-gray-600'>Shopping with Forever is designed to be effortless and enjoyable. With user-friendly navigation, secure payment options, and fast, reliable shipping, we make it easy for you to find what you need and have it delivered straight to your door. Our goal is to provide a seamless shopping experience that fits effortlessly into your busy lifestyle.</p>
</div>
<div className='border px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5'>
  <b>Exceptional Customer Service:</b>
  <p className='text-gray-600'>At Forever, exceptional customer service is at the heart of everything we do. Our dedicated support team is available to assist you with any questions or concerns, ensuring a smooth and satisfying shopping experience. Whether you need help with your order or have specific inquiries, we are here to provide prompt and courteous assistance.</p>
</div>

      </div>
       
       <NewsLetterBox />
    </div>
  )
}

export default About
