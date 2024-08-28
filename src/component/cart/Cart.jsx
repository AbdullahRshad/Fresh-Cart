import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartProduct from '../CartProduct/CartProduct'
import Loading from '../LoadingScreen/Loading'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true)
  const [Cart, setCart] = useState(null)

  useEffect(() => {
    getCart()
  }, [])
  
async function getCart() {
  setIsLoading(true)
  let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
    headers:{
      token:localStorage.getItem("token")
    }
  }).finally(()=>{
    setIsLoading(false)
  })
  setCart(data);
  
}

 function clearCart() {
  setIsLoading(true)
  axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
    headers:{
      token:localStorage.getItem("token")
    }
  }).finally(()=>{
     setCart(null);
  setIsLoading(false)
  })
 
}

if (isLoading) {
  return <Loading/>
}

  return ( <>
  <Helmet>
    <title>Cart</title>
  </Helmet>
  { Cart? <div className="min-h-screen pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
      {
        Cart?.data.products.map((product ,index)=>{
          return <CartProduct key={index} product={product} setCart={setCart} Cart={Cart}/>
        })
      }
      {Cart?.data.products.length==0 && <h1>No products in your cart</h1>}
      </div>
    {/* sub total */}
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">${Cart?.data.totalCartPrice}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping</p>
          <p className="text-gray-700">$0</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">${Cart?.data.totalCartPrice} USD</p>
          </div>
        </div>
        <Link to={'/shippingAddress/'+Cart?.data._id} className="mt-6 block text-center w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>
      </div>
    </div>
    <button  onClick={()=>clearCart()}  className='text-red-500 border-red-500 border-2 rounded-md px-4 py-2 hover:text-white hover:bg-red-500 mx-auto block'>Clear Cart</button>
  </div>: <h1 className='text-center text-4xl font-bold'>No products in your cart</h1>
  }
  </>

  )
}
