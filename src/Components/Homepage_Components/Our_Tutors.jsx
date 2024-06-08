import { Button } from "@material-tailwind/react";
import Heading from "../Public_Components/Heading";
import { ProfileCard } from "../Public_Components/ProfileCard";
import Container from "../Public_Components/Container";

const Our_Tutors = () => {
  return (
    <Container>
      <div>
        <Heading
          title="Our Tutors"
          subTitle="We pride ourselves on having a diverse and highly qualified team of tutors who are dedicated to helping students achieve their academic goals."
        />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </div>
        <div className="text-center">
          <Button className="font-normal text-base mt-8 capitalize">
            See all tutors
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Our_Tutors;
