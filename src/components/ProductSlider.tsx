import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Product from "../components/Product";
import type { Product as ProductType, RelatedProductsResponse } from "../types";

export type SliderData = ProductType[] | RelatedProductsResponse;

interface ProductSliderProps {
  data: SliderData;
  handleButtonClick: (e: React.MouseEvent) => void;
  handleView: (e: React.MouseEvent, product?: ProductType) => void;
  bestLabel?: boolean;
  newLabel?: boolean;
  relatedLabel?: boolean;
}

export default function ProductSlider({
  data,
  handleButtonClick,
  handleView,
  bestLabel,
  newLabel,
  relatedLabel,
}: ProductSliderProps) {
  const productsToDisplay = Array.isArray(data) ? data : data.relatedProducts;

  return (
    <Swiper
      modules={[Pagination]}
      loop={false}
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 40 },
        768: { slidesPerView: 2, spaceBetween: 40 },
        1024: { slidesPerView: 3, spaceBetween: 40 },
        1280: { slidesPerView: 4, spaceBetween: 40 },
        1440: { slidesPerView: 4, spaceBetween: 40 },
      }}
      pagination={{ clickable: true, dynamicBullets: true }}
      className="max-w-[230px] md:max-w-[500px] lg:max-w-[770px] xl:max-w-[1040px] select-none">
      {productsToDisplay?.map((product) => (
        <SwiperSlide key={product._id}>
          <Product
            product={product}
            handleButtonClick={handleButtonClick}
            handleView={handleView}
            bestLabel={bestLabel}
            newLabel={newLabel}
            relatedLabel={relatedLabel}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
