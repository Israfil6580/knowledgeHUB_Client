import Container from "../Public_Components/Container";
import benefits_image from "/be_tutor.png";
import img1 from "/icon/Group1.png";
import img2 from "/icon/Group2.png";
import img3 from "/icon/Group3.png";
import img4 from "/icon/Group4.png";
const Benefits = () => {
  return (
    <Container>
      <div className="flex lg:flex-row flex-col-reverse mt-10 lg:gap-12 gap-6">
        <div className="lg:w-1/2">
          <img className="lg:p-12" src={benefits_image} alt="" />
        </div>
        <div className="lg:w-1/2 flex flex-col gap-6 justify-center">
          <h1 className=" font-title font-black text-4xl uppercase tracking-wide">
            <span className="text-[#FFC145] font-title font-extrabold">
              Benefits
            </span>{" "}
            From Our Online Learning
          </h1>
          <div className="flex items-start gap-8">
            <img className="lg:w-16 lg:h-16 h-14 w-14" src={img1} alt="" />
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Online Degrees</h2>
              <p className="text-base  ">
                Online degrees have become an increasingly popular option for
                students seeking flexibility and accessibility in higher
                education
              </p>
            </div>
          </div>
          <div className="flex items-start gap-8">
            <img className="lg:w-16 lg:h-16 h-14 w-14" src={img2} alt="" />
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Short Courses</h2>
              <p className="text-base  ">
                Online degrees have become an increasingly popular option for
                students seeking flexibility and accessibility in higher
                education
              </p>
            </div>
          </div>
          <div className="flex items-start gap-8">
            <img className="lg:w-16 lg:h-16 h-14 w-14" src={img3} alt="" />
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Training From Experts</h2>
              <p className="text-base  ">
                Online degrees have become an increasingly popular option for
                students seeking flexibility and accessibility in higher
                education
              </p>
            </div>
          </div>
          <div className="flex items-start gap-8">
            <img className="lg:w-16 lg:h-16 h-14 w-14" src={img4} alt="" />
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">20k+ Video Courses</h2>
              <p className="text-base  ">
                Online degrees have become an increasingly popular option for
                students seeking flexibility and accessibility in higher
                education
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Benefits;
