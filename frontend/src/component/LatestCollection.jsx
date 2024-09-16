import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {


    const {products} = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
     setLatestProducts(products.slice(0,10));
    },[]);
  
  return (
    <div className='my-10'>
     <div className='text-center py-8 text-3xl'>
      <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
      <p className='w-4\5 m-auto text-base sm:text-sm md:text-base text-gray-600'>Discover our newest arrivals that blend style, comfort, and elegance. From casual wear to statement pieces, explore the trendiest outfits curated just for you. Refresh your wardrobe with our must-have collections, perfect for every occasion.</p>
     </div>
     {/* rendering products */}
     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
      {
        latestProducts.map((item, index) => (
           <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
        ))
      }
     </div>
    </div>
  )
}

export default LatestCollection
