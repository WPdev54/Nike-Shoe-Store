import Image from "next/image";
import Link from "next/link";
import React from "react";
const ProductCard = ({data}) => {
    return (
        <Link
            href={`/product/${data?.attributes?.slug}`}
            className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
        >
            <Image
                width={500}
                height={500}
                src={data?.attributes?.thumbnail?.data?.attributes?.url}
                alt="products"
            />
            <div className="p-4 text-black/[0.9]">
                <h2 className="text-lg font-medium">{data?.attributes?.name}</h2>
                <div className="flex items-center text-black/[0.5]">
                    <p className="mr-2 text-lg font-semibold">
                        ${data?.attributes?.price}
                    </p>

                        <div>
                            <p className="text-base  font-medium line-through">
                                ${data?.attributes?.original_price}
                            </p>
                        </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;