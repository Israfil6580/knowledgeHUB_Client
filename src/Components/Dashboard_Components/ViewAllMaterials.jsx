import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SingleMaterialsCard from "../Public_Components/SingleMaterialsCard";
import useAuth from "../../Hooks/useAuth";

const ViewAllMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: StudyMaterials = [] } = useQuery({
    queryKey: ["StudyMaterials"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/Study_Materials/${user?.email}`);
        return res.data;
      } catch (error) {
        console.error("Error fetching session:", error);
        throw new Error("Failed to fetch session");
      }
    },
  });

  return (
    <div className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] rounded-2xl min-h-[calc(100vh-150px)] mt-2 p-6">
      <div>
        <h1 className="text-3xl font-black font-title">All materials By you</h1>
        <p className="text-sm">You have added this materials</p>
      </div>
      <SingleMaterialsCard StudyMaterials={StudyMaterials} />
    </div>
  );
};

export default ViewAllMaterials;
