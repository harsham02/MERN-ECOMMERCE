import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {


  const { products } = useContext(ShopContext);
  const [bestSeller, setbestSeller] = useState([]);


  useEffect(() => {
    const bestProduct = products.filter((item) => (item.bestSeller));
    setbestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-4\5 m-auto text-base sm:text-sm md:text-base text-gray-600'>
          Our most popular picks loved by customers. These top-selling styles have become wardrobe essentials for a reason. From chic outfits to versatile classics, explore the pieces that everyone’s talking about. Grab them before they’re gone!</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {
          bestSeller.map((item, index) => (
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default BestSeller
