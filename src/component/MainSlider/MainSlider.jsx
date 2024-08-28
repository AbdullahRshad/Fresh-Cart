import React from 'react'
import Slider from 'react-slick'
import image1 from '../../assets/slider-image-1.jpeg'
import image2 from '../../assets/slider-image-2.jpeg'
import slider1 from '../../assets/grocery-banner-2.jpeg'
import slider2 from '../../assets/slider-image-3.jpeg'
import slider3 from '../../assets/slider-2.jpeg'

export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    // responsive: [
    //     {
    //       breakpoint: 1024,
    //       settings: {
    //         slidesToShow: 4,
    //         slidesToScroll: 1,
    //         infinite: true,
    //         dots: true
    //       }
    //     },
    //     {
    //       breakpoint: 600,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 1,
    //         initialSlide: 2
    //       }
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         slidesToShow: 1,
    //         slidesToScroll: 1
    //       }
    //     }
    //   ]
  };
  return ( <div className='row'>
        <div className='w-3/4'>
        <Slider {...settings}>
        <img src={ slider2} alt="" className='w-full h-[400px]'/>
        <img src={ slider1} alt="" className='w-full h-[400px]'/>
        <img src={ slider3} alt="" className='w-full h-[400px]'/>

      </Slider>

        </div>
        <div className='w-1/4 '>
        <img src={image2} alt="" className='w-full h-[200px]'/>
        <img src={image1} alt="" className='w-full h-[200px]'/>
        </div>
    </div>
  )
}
