import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatinigStars from "../RatingStars/RatinigStars";
import Loading from "../LoadingScreen/Loading";
import ProductImageSlider from "../ProductImageSlider/ProductImageSlider";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { addProductCart } from "../../cartservices/addCart";
import { Authcontext } from "../Authcontext/Authcontext";

export default function ProductDetailes() {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let { id } = useParams();

  async function getProductDetails() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    );
    setProductDetails(data.data);
    getRelatedProduct(data.data?.category._id);
    setIsLoading(false);
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  async function getRelatedProduct(categoryId) {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/",
      {
        params: {
          category: categoryId,
        },
      }
    );
    setRelatedProduct(data.data);
  }

  const { userToken } = useContext(Authcontext);
  return (
    <>
      {isLoading ? (<Loading />) : (
        <div className="bg-white">
          <main className="my-8">
            <div className="container mx-auto px-6">
              <div className="md:flex md:items-center">
                <div className="w-full h-64 md:w-3/12 lg:h-96">
                  <ProductImageSlider images={productDetails?.images} />
                </div>
                <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-9/12">
                  <h3 className="text-gray-700 uppercase text-lg">
                    {productDetails?.title}
                  </h3>
                  <span className="text-gray-500 mt-3">
                    ${productDetails?.price}
                  </span>
                  <hr className="my-3" />

                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      Rating:
                    </label>
                    <RatinigStars
                      rating={productDetails?.ratingsAverage ?? 0}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      Description:
                    </label>
                    <h3>{productDetails?.description}</h3>
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      Category:
                    </label>
                    <h3>{productDetails?.category.name}</h3>
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      SubCategory:
                    </label>
                    <h3>{productDetails?.subcategory[0].name}</h3>
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      Brand:
                    </label>
                    <h3>{productDetails?.brand.name}</h3>
                  </div>
                  <div className="flex items-center mt-6">
                    <button onClick={() =>
                        addProductCart(productDetails?._id, userToken)
                      }
                     className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                      add to cart
                    </button>

                  </div>
                </div>
              </div>
              <RelatedProducts Products={relatedProduct} />
            </div>
          </main>
        </div>
      )}
    </>
  );
}
