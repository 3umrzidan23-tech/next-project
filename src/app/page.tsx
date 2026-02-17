import { Button } from "@/components/ui/button";
import { productItem } from "@/types/productInterface";
import Image from "next/image";
import Product from "./product/page";
import ProductCard from "./_components/productCard/productCard";
import Navbar from "./_components/navbar/navbar";

 

export default async function Home() {
  let response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products ",
    {
      method: "GET",
      cache: "force-cache",
    },
  );
  let { data: allproducts }: { data: productItem[] } = await response.json();
  console.log(allproducts[0]);
  return (
    <>
    <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-4">
      {allproducts.map((prod)=> <ProductCard key={prod._id} prod = {prod}/>)}

    </div>
     
    </>
  );
}
