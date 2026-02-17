'use client'
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default function ProductImg({images} : {images : string[]}) {
  return <>
    <Carousel  plugins={[
        Autoplay({
          delay: 2200,
        }),
      ]}
      opts={{
    loop: true,
  }}>
      <CarouselContent>
        {images.map((src )=>{ return <CarouselItem>
             <Image
        width={300}
        height={400}
          className="w-full"
          src={src}
          alt={src}
        />
        </CarouselItem>
        })}
      </CarouselContent>
    </Carousel>
  </>
}
