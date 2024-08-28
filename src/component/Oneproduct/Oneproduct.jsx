import React, { useContext } from 'react'
import RatinigStars from '../RatingStars/RatinigStars'
import { Link } from 'react-router-dom'
import { Authcontext } from '../Authcontext/Authcontext'
import { addProductCart } from '../../cartservices/addCart'
import { addWishlist } from '../../cartservices/addwishlist'
import { useState } from 'react'

export default function Oneproduct({product}) {

  const {userToken} = useContext(Authcontext)
  const [clicked, setclicked] = useState(false)
    
  return (<div className="max-w-2xl mx-auto">
        
   
    <div className=" bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
    <button onClick={()=>{addWishlist(product._id) , setclicked(!clicked)}} className='  py-2 px-4'> {clicked?<i className=" text-red-500 fa-solid fa-heart fa-xl"></i>:<i className="  fa-regular fa-heart fa-xl"></i> }  </button>
      <Link to={"/productDetailes/"+product._id}>
        <img className="rounded-t-lg py-4 px-8" src={product.imageCover} alt="product image"/>
          </Link>
        <div className="px-5 pb-5">
        <Link to={"/productDetailes/"+product._id}>
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight line-clamp-1 dark:text-white">{product.title}</h3>
          </Link>
          <p className='line-clamp-2'>{product.description}</p>
          <RatinigStars rating={product.ratingsAverage} />
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
            <button onClick={()=>{addProductCart(product._id ,userToken)}}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
              to cart</button>
          </div>
        </div>
    </div>
  </div>
  )
}
