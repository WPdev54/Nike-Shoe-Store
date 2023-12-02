import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import Wrapper from "@/components/Wrapper";

import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";

import ReactMarkdown from "react-markdown";
import RelatedProducts from "@/components/RelateProducts";

import { fetchDataFromApi } from "@/Utils/api";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ product, products }) => {
  const dispatch = useDispatch();
  const producted = product?.data;
  const p = product?.data?.[0]?.attributes;
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);

  const notify = () => {
    toast.success("Success. Check Your Cart", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left col start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0 ">
            <ProductDetailsCarousel images={p.image.data} />
            {/* left col end */}
          </div>
          {/* right col start */}
          <div className="flex-[1] py-3">
            {/* Product Title */}
            <div className="text-[34px] leading-9 font-bold mb-2">{p.name}</div>
            <div className="subtitle text-xl font-semibold mb-5">
              {p.subtitle}
            </div>
            <div className="flex items-center text-black font-black">
              <p className="mr-2 text-lg font-">${p?.price}</p>

              <div>
                <p className="text-base  font- line-through">
                  ${p?.original_price}
                </p>
              </div>
            </div>
            <div className="tax text-md font-medium text-black/[0.5] ">
              incl. of taxes
            </div>
            <div className="tax text-md font-medium text-black/[0.5] mb-20 ">
              {`( Also Includes all applicable duties )`}
            </div>

            {/* Product Size Start */}

            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-semibold cursor-pointer text-black/[0.5]">
                  Select Guide
                </div>
              </div>
            </div>

            {/* size */}

            <div id="sizesGrid" className="grid place grid-cols-3 py-7 gap-2">
              {p?.size?.data?.map((item, index) => (
                <div
                  onClick={() => {
                    setSelectedSize(item.size);
                    setShowError(false);
                  }}
                  key={index}
                  className={`border  rounded-md text-center py-3 font-medium 
                                        ${
                                          item.enabled
                                            ? " hover:border-black cursor-pointer"
                                            : " bg-black/[0.1] opacity-50  cursor-not-allowed"
                                        }
                                        ${
                                          selectedSize === item.size
                                            ? "border-black"
                                            : ""
                                        }
                                         `}
                >
                  {item.size}
                </div>
              ))}
            </div>

            {/* size */}

            {showError && (
              <div className="text-red-600 mt-1 py-3">
                *Size Selection Is Required
              </div>
            )}

            {/* Product Size End */}

            {/* ADD TO CART BUTTON START */}
            <button
              onClick={() => {
                if (!selectedSize) {
                  setShowError(true);
                  document.getElementById("sizesGrid").scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  });
                } else {
                  dispatch(
                    addToCart({
                      ...product?.data?.[0],
                      selectedSize,
                      OneQuantityPrice: p.price,
                    })
                  );
                  notify();
                }
              }}
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
            >
              Add to Cart
            </button>
            {/* ADD TO CART BUTTON END */}

            {/* WHISHLIST BUTTON START */}
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
              Whishlist
              <IoMdHeartEmpty size={20} />
            </button>
            {/* WHISHLIST BUTTON END */}

            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                <ReactMarkdown>{p.description}</ReactMarkdown>
              </div>
            </div>
          </div>
          {/* right col end */}
        </div>
        <RelatedProducts products={products} />

      </Wrapper>
    </div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const products = await fetchDataFromApi("/api/products?populate=*");
  const paths = products?.data?.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return {
    props: {
      product,
      products,
    },
  };
}
