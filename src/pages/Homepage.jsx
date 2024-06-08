import Banner from "../Components/Homepage_Components/Banner";
import Become_Tutor from "../Components/Homepage_Components/Become_Tutor";
import Benefits from "../Components/Homepage_Components/Benefits";
import Our_Tutors from "../Components/Homepage_Components/Our_Tutors";
import Study_Session from "../Components/Homepage_Components/Study_Session";
import Work_With from "../Components/Homepage_Components/Work_With";

const Homepage = () => {
  return (
    <>
      <Banner />
      <Work_With />
      <Benefits />
      <Study_Session />
      <Our_Tutors />
      <Become_Tutor />
    </>
  );
};

export default Homepage;
