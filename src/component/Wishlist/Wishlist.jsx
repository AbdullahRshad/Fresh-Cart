import axios from 'axios'
import Loading from '../LoadingScreen/Loading'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'
import { Bounce, toast } from 'react-toastify'
import { addProductCart } from '../../cartservices/addCart'

export default function Wishlist() {
  const userToken=localStorage.getItem("token")
    function getWishlist() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers:{token:userToken}
        })
      }
      const{data,isLoading}=useQuery({
        queryKey:["Brands"],
        queryFn:getWishlist,
      })



      
    async function removeProductFromwishlist(productId) {
        let{data}=await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/"+productId,{
          headers:{
            token:localStorage.getItem("token")
          }
        })
        getWishlist(data);

        toast.success("product has been rmoved successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }




if (isLoading) {
  return <Loading/>
}

  return ( <>
  <Helmet>
    <title>wishlist</title>
  </Helmet>



  { data?.data.data? <div className="min-h-screen pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
      {data?.data.data.map((product ,index)=>{
          return     <div key={index}  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src= {product.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">{product.title}</h2>
              <p className="mt-1 text-xs text-gray-700">$ {product.price}</p>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center space-x-4">
                <svg  onClick={()=>removeProductFromwishlist(product._id)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                
              </div>
              <div className='relative start-3 '>
              <button onClick={()=>{addProductCart(product._id ,userToken)}}
              className= " text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
              to cart</button>
              </div>
            </div>
          </div>
        </div>
          
        })}
      {data?.data.data.length==0 && <h1>No products in your cart</h1>}
      </div>

    </div>
  </div>: <h1 className='text-center text-4xl font-bold'>No products in your cart</h1>
  }


  </>

  )
}
