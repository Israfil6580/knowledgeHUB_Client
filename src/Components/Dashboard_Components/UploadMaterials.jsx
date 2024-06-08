import { useQuery } from "@tanstack/react-query";
import UploadCard from "../Public_Components/UploadCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const UploadMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: ApprovedSession = [] } = useQuery({
    queryKey: ["approved session"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/Created_Session/approved/${user?.email}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching session:", error);
        throw new Error("Failed to fetch session");
      }
    },
  });

  return (
    <div className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] rounded-2xl min-h-[calc(100vh-150px)] mt-2 p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-black font-title">
          Upload resources or materials
        </h1>
        <p className="text-sm">
          You can only upload resources for approved session by Admin
        </p>
      </div>
      <div>
        <UploadCard ApprovedSession={ApprovedSession} />
      </div>
    </div>
  );
};

export default UploadMaterials;
