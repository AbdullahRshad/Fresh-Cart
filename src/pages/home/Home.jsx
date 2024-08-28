import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Oneproduct from '../../component/Oneproduct/Oneproduct'
import Loading from '../../component/LoadingScreen/Loading'
import { Helmet } from 'react-helmet'
import MainSlider from '../../component/MainSlider/MainSlider'
import CategorySlider from '../../component/CategorySlider/CategorySlider'

export default function Home() {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    setIsLoading(true)
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    setProducts(data.data);
    setIsLoading(false)
    
  }
  
  return (<> 
  <Helmet>
    <title>Home</title>
  </Helmet>
<MainSlider/>
<CategorySlider/>
  {isLoading?<Loading/>:
      <div className='grid  md:grid-cols-4 max-lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1   grid-cols-4 gap-3'>
      {products.map((product , index)=>{      
        return  <Oneproduct product={product} key={index}/>
      })}
    </div>
  }

    </>

  )
}
