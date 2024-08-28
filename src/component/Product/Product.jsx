import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Helmet } from 'react-helmet'
import Oneproduct from '../Oneproduct/Oneproduct'
import axios from 'axios'
import Loading from '../LoadingScreen/Loading'

export default function product() {

  
   function getProducts() {
   return axios.get("https://ecommerce.routemisr.com/api/v1/products") 
  }
let{data,isLoading}=useQuery({
  queryKey:['products'],
  queryFn:getProducts
})

  return (<>
   <Helmet>
    <title>products</title>
  </Helmet>
{isLoading?<Loading/>:<div className='grid  md:grid-cols-4 max-lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1  grid-cols-4 gap-3'>
  {data?.data.data.map((product , i)=>{
    return <Oneproduct product={product} key={i}/>
  })}
</div>
}
  </>)}
