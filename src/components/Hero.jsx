import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useFetch from "../hook/useFetch";

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768); // Initial check for screen size
  const { data: desktopData } = useFetch(
    `/heroes?populate=*&filters[isDesktop]=true`
  );
  const { data: mobileData } = useFetch(
    `/heroes?populate=*&filters[isDesktop]=false`
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = isDesktop ? desktopData : mobileData;

  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      loop={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}>
      {data?.map((item, index) => {
        console.log(item.attributes.image.data[0].attributes.url);
        return (
          <SwiperSlide key={index}>
            <img
              className="w-screen select-none"
              src={`${item.attributes.image.data[0].attributes.url}`}
              alt=""
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
