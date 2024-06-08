import Container from "../Public_Components/Container";
import banner from "/banner.png";
import titleIcon from "/title_icon.svg";
import { Button } from "@material-tailwind/react";
const Banner = () => {
  return (
    <Container>
      <div className="lg:flex items-center min-h-screen">
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-5xl uppercase leading-tight font-title font-black relative tracking-wide">
            Transform your
            <span className="relative">
              <span className="text-[#FFC145] font-title font-extrabold">
                {" "}
                future
              </span>
              <img
                src={titleIcon}
                alt=""
                className="absolute left-4 -bottom-2"
              />
            </span>{" "}
            through online
            <span className="text-[#FFC145] font-title font-extrabold">
              {" "}
              learning
            </span>
          </h1>
          <p className="font-normal">
            Welcome to Knowledge HUB, the premier destination for interactive
            and engaging online learning. Our platform offers a wide range of
            courses designed to help you master new skills and advance your
            career.
          </p>
          <div className="flex gap-4">
            <Button className="text-base font-normal capitalize flex items-center gap-1">
              Enroll Course
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" />
              </svg>
            </Button>
            <Button
              variant="text"
              className="flex items-center gap-2 text-base font-medium capitalize"
            >
              Read More{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img src={banner} alt="" />
        </div>
      </div>
    </Container>
  );
};

export default Banner;
