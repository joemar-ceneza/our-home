import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import Product from "../components/Product";

export default function ProductSlider({
  data,
  handleButtonClick,
  handleView,
  bestLabel,
  newLabel,
  relatedLabel,
}) {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      loop={false}
      navigation={true}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1440: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
      pagination={{ clickable: true, dynamicBullets: true }}
      className="max-w-[230px] md:max-w-[500px] lg:max-w-[770px] xl:max-w-[1040px] select-none">
      <>
        {data?.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <Product
                product={product}
                handleButtonClick={handleButtonClick}
                handleView={handleView}
                bestLabel={bestLabel}
                newLabel={newLabel}
                relatedLabel={relatedLabel}
              />
            </SwiperSlide>
          );
        })}
      </>
    </Swiper>
  );
}
