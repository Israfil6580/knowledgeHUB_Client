import { CardDefault } from "../Public_Components/Card";
import Container from "../Public_Components/Container";
import Heading from "../Public_Components/Heading";
import { Button } from "@material-tailwind/react";
const Study_Session = () => {
  return (
    <Container>
      <div>
        <Heading
          title="Study session"
          subTitle="Dive into interactive discussions, practical exercises, and gain insights on how to thrive in a virtual learning environment."
        />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <CardDefault />
          <CardDefault />
          <CardDefault />
          <CardDefault />
          <CardDefault />
          <CardDefault />
        </div>
        <div className="text-center">
          <Button className="font-normal text-base mt-8 capitalize">
            See all session
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Study_Session;
