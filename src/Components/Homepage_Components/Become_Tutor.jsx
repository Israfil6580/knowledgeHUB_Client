import BecomeTutorimg from "/BecomeTutor.png";
import circle from "/circle.png";
import Container from "../Public_Components/Container";
const Become_Tutor = () => {
  return (
    <Container>
      <div className="lg:flex mt-20 gap-28 items-center">
        <div className="lg:w-7/12">
          <div className="mb-6">
            <h1 className="text-5xl font-title font-black pb-2 tracking-wide">
              If You Are A Certified Teacher Then{" "}
              <span className="text-[#ffc145]">Become A Tutor</span>
            </h1>
            <p>
              Are you a certified teacher with a passion for education and a
              desire to make a difference? Join our team of dedicated tutors and
              help students achieve their academic goals!
            </p>
          </div>
          <h1 className="text-4xl font-title font-extrabold">
            Enjoy Many Perks
          </h1>
          <div className="lg:flex gap-10 mt-6">
            <ul className="flex flex-col gap-1 justify-center">
              <li>
                {" "}
                <img
                  src={circle}
                  className="h-4 w-4 inline-block mr-1"
                  alt=""
                />{" "}
                Global Impact
              </li>
              <li>
                {" "}
                <img
                  src={circle}
                  className="h-4 w-4 inline-block mr-1"
                  alt=""
                />{" "}
                Flexible Schedule
              </li>
              <li>
                {" "}
                <img
                  src={circle}
                  className="h-4 w-4 inline-block mr-1"
                  alt=""
                />{" "}
                Innovative Teaching Tools
              </li>
              <li>
                {" "}
                <img
                  src={circle}
                  className="h-4 w-4 inline-block mr-1"
                  alt=""
                />{" "}
                Recognition And Reputation
              </li>
            </ul>
            <ul className="flex flex-col gap-1 justify-center">
              <li>
                {" "}
                <img
                  src={circle}
                  className="h-4 w-4 inline-block mr-1"
                  alt=""
                />{" "}
                Creative Freedom
              </li>
              <li>
                {" "}
                <img
                  src={circle}
                  className="h-4 w-4 inline-block mr-1"
                  alt=""
                />{" "}
                Monetize Your Expertise
              </li>
              <li>
                {" "}
                <img
                  src={circle}
                  className="h-4 w-4 inline-block mr-1"
                  alt=""
                />{" "}
                Professional Development
              </li>
              <li>
                {" "}
                <img
                  src={circle}
                  className="h-4 w-4 inline-block mr-1"
                  alt=""
                />{" "}
                Networking Opportunities
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:w-5/12 lg:mt-0 mt-16">
          <img src={BecomeTutorimg} alt="" />
        </div>
      </div>
    </Container>
  );
};

export default Become_Tutor;
