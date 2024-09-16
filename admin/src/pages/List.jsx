import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { currency } from '../App';

const List = ({token}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try{
     const response = await axios.get("http://localhost:4000/api/product/list", {headers:{token}})

     if(response.data.success)
     {
        setList(response.data.products);
     }else{
      toast.error(response.data.message);
     }
    }catch(error){
       toast.error(error.message);
    }
  }
  console.log(list);

   // Remove a product by id
   const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/product/${id}`, { headers: { token } });

      if (response.data.success) {
        toast.success( response.data.message || 'Product removed successfully')
      
        setList(list.filter((item) => item._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

      useEffect(() => {
       fetchList();
      },[]);

  return (
    <>
       <p className='mb-2'>All Products</p>
       <div className='flex flex-col gap-2'>
         {/* List Table Title */}
         <div className='hidden md:grid grid-cols-5 items-center py-1 px-2 border border-gray-200 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
         </div>

         {/* Product List */}
         {list.map((item, index) => (
          <div key={index} className="grid grid-cols-5 items-center py-1 px-2 border border-gray-200 text-sm">
            <img src={item.image[0]} alt={item.name} className="w-12 h-12 object-cover" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p className="text-center text-base cursor-pointer hover:text-red-700" onClick={()=>removeProduct(item._id) }>X</p>
          </div>
        ))}
       </div>
    </>
  )
}

export default List
