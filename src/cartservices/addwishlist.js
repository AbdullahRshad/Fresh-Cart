import axios from "axios";
import { Bounce, toast } from "react-toastify";


export async function addWishlist(productId ) {
    let {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{productId:productId},
      { headers:{
        token:localStorage.getItem('token')
      }})
  
  toast.success(data.message, {
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
