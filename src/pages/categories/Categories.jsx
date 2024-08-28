import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import Loading from '../../component/LoadingScreen/Loading'

export default function Categories() {

  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  const{data , isLoading}=useQuery({
    queryKey:["categories"],
    queryFn:getCategories
  })
// console.log(data?.data.data);



  return (<>
   <Helmet>
    <title>Categories</title>
  </Helmet>


{isLoading?<Loading/>:<div className='grid grid-cols-4 md:grid-cols-4 sm:grid-cols-3 max-sm:grid-cols-2  gap-3'>
{data?.data.data.map((category,i)=>{
  return <div key={i} className="h-[300px] relative flex max-w-[20rem] flex-col  rounded-xl bg-white bg-clip-border text-black shadow-md">
  <div className=" h-full relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-black shadow-none">
    <img
      src={category.image}
      alt=""
    />
  </div>
  <div className="p-6">
    <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-black antialiased">
      {category.name}
    </h4>
  </div>
</div>
})}
</div>}

  </>
    
   
  )
}
