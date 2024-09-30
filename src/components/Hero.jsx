import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// images large screen sizes
import DesktopSale from "../images/desktop-sale.jpg";
import DesktopInteriorDesign from "../images/desktop-interior-design.jpg";
import DesktopInstallment from "../images/desktop-installment.jpg";
import DesktopShoppingReward from "../images/desktop-shopping-reward.jpg";
import DesktopLess from "../images/desktop-less.jpg";
// images small screen sizes
import MobileExtra from "../images/mobile-extra.jpeg";
import MobileGiftsDad from "../images/mobile-gifts-dad.jpeg";
import MobileInteriorDesign from "../images/mobile-interior-design.jpeg";
import MobileLess from "../images/mobile-less.jpeg";
import MobileMidYearSale from "../images/mobile-mid-year-sale.jpeg";
import MobileInstallment from "../images/mobile-installment.jpeg";

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const heroImages = isDesktop
    ? [
        { url: DesktopSale },
        { url: DesktopInteriorDesign },
        { url: DesktopInstallment },
        { url: DesktopShoppingReward },
        { url: DesktopLess },
      ]
    : [
        { url: MobileExtra },
        { url: MobileGiftsDad },
        { url: MobileInteriorDesign },
        { url: MobileLess },
        { url: MobileMidYearSale },
        { url: MobileInstallment },
      ];

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      loop={true}
      pagination={true}
      navigation={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}>
      {heroImages?.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <img className="w-screen select-none" src={`${item.url}`} alt="" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
