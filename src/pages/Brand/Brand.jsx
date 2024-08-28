import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import Loading from '../../component/LoadingScreen/Loading'

export default function Brand() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }
  const{data,isLoading}=useQuery({
    queryKey:["Brands"],
    queryFn:getBrands,
  })

  return (<>
   <Helmet>
    <title>Brands</title>
  </Helmet>

  {isLoading?<Loading/>:<div className='grid grid-cols-4 md:grid-cols-4 sm:grid-cols-3 max-sm:grid-cols-2  gap-3'>
{data?.data.data.map((brand,i)=>{
  return <div key={i} className=" relative flex max-w-[20rem] flex-col  rounded-xl bg-white bg-clip-border text-black shadow-md">
  <div className="  relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-black shadow-none">
    <img
      src={brand.image}
      alt=""
    />
  </div>
  <div className="p-6">
    <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-black antialiased">
      {brand.name}
    </h4>
  </div>
</div>
})}
</div>}

  </> )}
