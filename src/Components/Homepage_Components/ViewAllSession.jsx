import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Heading from "../Public_Components/Heading";
import { CardDefault } from "../Public_Components/Card";
import Container from "../Public_Components/Container";
import { ScrollRestoration } from "react-router-dom";

const ViewAllSession = () => {
  const axiosPublic = useAxiosPublic();
  const { data: StudySession = [], refetch } = useQuery({
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

  if (StudySession.length > 0) {
    refetch();
  }
  return (
    <Container>
      <div>
        <Heading
          title="All Study session"
          subTitle="Dive into interactive discussions, practical exercises, and gain insights on how to thrive in a virtual learning environment."
        />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {StudySession.map((item, index) => (
            <CardDefault key={index} item={item} />
          ))}
        </div>
      </div>
      <ScrollRestoration />
    </Container>
  );
};

export default ViewAllSession;
