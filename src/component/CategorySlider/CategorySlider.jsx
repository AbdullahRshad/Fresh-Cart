import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function CategorySlider() {
const [Categories, setCategories] = useState([])

    function getCaregories() {
        axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((data)=>{setCategories(data.data.data)})
        .catch((err)=>{console.log(err)})      
    }
    useEffect(() => {
      getCaregories()
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };
    
  return (
 <div className='my-5 py-4'>
    <h2 className='text-2xl font-bold mb-2'>Shop popular categories</h2>
       <Slider {...settings}>
       {Categories.map((category)=>{
      return <div className='h-[300px]' key={category._id}>
          <img className='h-full' src={category.image} alt="" />
          <h2>{category.name}</h2>
      </div>
       })}
  </Slider>
 </div>
  )
}
