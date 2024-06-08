import Marquee from "react-fast-marquee";
import brand1 from "/com_logo/in-brand1.svg";
import brand2 from "/com_logo/in-brand2.svg";
import brand3 from "/com_logo/in-brand3.svg";
import brand4 from "/com_logo/in-brand4.svg";
import brand5 from "/com_logo/in-brand5.svg";
import brand6 from "/com_logo/in-brand6.svg";
import brand7 from "/com_logo/in-brand7.svg";
import brand8 from "/com_logo/in-brand8.svg";
import Container from "../Public_Components/Container";
const Work_With = () => {
  return (
    <div className="bg-[#FFC145]">
      <Container>
        <Marquee>
          <div className="flex justify-between gap-10 items-center my-7">
            <img className="w-auto h-8" src={brand1} alt="" />
            <img className="w-auto h-8" src={brand2} alt="" />
            <img className="w-auto h-8" src={brand3} alt="" />
            <img className="w-auto h-8" src={brand4} alt="" />
            <img className="w-auto h-8" src={brand5} alt="" />
            <img className="w-auto h-8" src={brand6} alt="" />
            <img className="w-auto h-8" src={brand7} alt="" />
            <img className="w-auto h-8 pr-10" src={brand8} alt="" />
          </div>
        </Marquee>
      </Container>
    </div>
  );
};

export default Work_With;
