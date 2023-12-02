import { fetchDataFromApi } from "@/Utils/api";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";

export default function Home({products}) {

    return (
        <main>
            <div className=" pt-3 pb-12">
                <HeroBanner />
            </div>
            <Wrapper>
                <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
                    <div className="text-[28px] md:text-5xl mb-5 font-black leading-tight">
                        Cushioning for Your Miles
                    </div>
                    <div className="text-md md:text-xl">
                        A lightweight Nike ZoomX midsole is combined with
                        increased stack heights to help provide cushioning
                        during extended stretches of running.
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-20">
                    {
                        products?.data?.map((product,index)=>(
                            <ProductCard key={product.id} data={product} index={index} />
                        ))
                    }
                </div>
            </Wrapper>
        </main>
    );
}


export async function getStaticProps() {
    const products = await fetchDataFromApi('/api/products?populate=*')

    return {
        props: {products}
    }
}