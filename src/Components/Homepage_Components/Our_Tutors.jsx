import { Button } from "@material-tailwind/react";
import Heading from "../Public_Components/Heading";
import { ProfileCard } from "../Public_Components/ProfileCard";
import Container from "../Public_Components/Container";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Our_Tutors = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allTutor = [], refetch } = useQuery({
    queryKey: ["tutor"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/users/tutor");
        return res.data;
      } catch (error) {
        console.error("Error fetching tutor:", error);
        throw new Error("Failed to fetch tutor");
      }
    },
  });

  if (allTutor.length > 0) {
    refetch();
  }
  return (
    <Container>
      <div>
        <Heading
          title="Our Tutors"
          subTitle="We pride ourselves on having a diverse and highly qualified team of tutors who are dedicated to helping students achieve their academic goals."
        />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {allTutor.slice(0, 6).map((item) => (
            <ProfileCard key={item._id} item={item} />
          ))}
        </div>
        <div className="text-center">
          <Link to={"/allTutor"}>
            <Button className="font-normal text-base mt-8 capitalize">
              See all tutors
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Our_Tutors;
