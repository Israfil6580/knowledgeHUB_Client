import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { CardDefault } from "../Public_Components/Card";
import Container from "../Public_Components/Container";
import Heading from "../Public_Components/Heading";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Study_Session = () => {
  const axiosPublic = useAxiosPublic();

  const { data: StudySession = [], error } = useQuery({
    queryKey: ["StudySession"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/Created_Session/approved");
        return res.data;
      } catch (error) {
        console.error("Error fetching session:", error);
        throw new Error("Failed to fetch session");
      }
    },
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <div>
        <Heading
          title="Study session"
          subTitle="Dive into interactive discussions, practical exercises, and gain insights on how to thrive in a virtual learning environment."
        />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {StudySession.slice(0, 6).map((item, index) => (
            <CardDefault key={index} item={item} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/all_Study_Session">
            <Button className="font-normal text-base mt-8 capitalize">
              See all sessions
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Study_Session;
