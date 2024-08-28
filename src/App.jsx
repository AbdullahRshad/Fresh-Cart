import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./component/login/Login";
import Register from "./component/Register/Register";
import Layout from "./component/Layout/Layout";
import Home from "./pages/home/Home";
import Cart from "./component/cart/Cart";
import Product from "./component/Product/Product";
import Categories from "./pages/categories/Categories";
import Brand from "./pages/Brand/Brand";
import Notfound from "./component/Notfound/Notfound";
import Authcontextprovider from "./component/Authcontext/Authcontext";
import Protectedroute from "./component/ProtectedRoute/Protectedroute";
import ProtectedAuthRoutes from "./component/protectedAuthrourws/ProtectedAuthRoutes";
import ProductDetailes from "./component/ProductDetails/ProductDetailes";
import { ToastContainer } from "react-toastify";
import ShippingAddress from "./component/ShippingAddress/ShippingAddress";
import Orders from "./component/Orders/Orders";
import { Offline } from "react-detect-offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Code from "./component/Code/Code";
import Reset from "./component/Reset/Reset";
import Repassword from "./component/Repassword/Repassword";
import Wishlist from "./component/Wishlist/Wishlist";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element:<Protectedroute>  <Home /> </Protectedroute> },
        { path: "login", element:<ProtectedAuthRoutes><Login /></ProtectedAuthRoutes>  },
        { path: "code", element:<ProtectedAuthRoutes><Code /></ProtectedAuthRoutes>  },
        { path: "reset", element:<ProtectedAuthRoutes><Reset /></ProtectedAuthRoutes>  },
        { path: "repassword", element:<ProtectedAuthRoutes><Repassword /></ProtectedAuthRoutes>  },
        { path: "register", element:<ProtectedAuthRoutes><Register /> </ProtectedAuthRoutes> },
        { path: "cart", element:<Protectedroute><Cart /></Protectedroute>  },
        { path: "product", element:<Protectedroute> <Product /></Protectedroute> },
        { path: "categories", element: <Protectedroute><Categories /></Protectedroute> },
        { path: "brands", element:<Protectedroute><Brand /></Protectedroute>  },
        { path: "wishlist", element:<Protectedroute><Wishlist /></Protectedroute>  },
        { path: "shippingAddress/:cartId", element:<Protectedroute><ShippingAddress /></Protectedroute>  },
        { path: "allorders", element:<Protectedroute><Orders /></Protectedroute>  },
        { path: "productDetailes/:id", element:<Protectedroute><ProductDetailes /></Protectedroute>  },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
const queryClient= new QueryClient()
  return (
    <>
    <QueryClientProvider client={queryClient}>
            <Authcontextprovider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
        <Offline>
          <div className="fixed bottom-4 start-4 p-4 rounded-md bg-yellow-200">
            you are offline
          </div>
        </Offline>
      </Authcontextprovider>
      <ReactQueryDevtools/>
    </QueryClientProvider>

    </>
  );
}

export default App;
