import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTutor = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isTutor,
    isPending: isTutorLoading,
    error,
  } = useQuery({
    queryKey: [user?.email, "isTutor"],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      if (!user || !user.email) {
        throw new Error("User email is not available");
      }
      console.log("asking or checking is tutor", user);
      const res = await axiosSecure.get(`/users/tutor/${user.email}`);
      console.log("API Response:", res.data);
      return res.data?.tutor;
    },
  });

  if (error) {
    console.error("Error fetching tutor status:", error);
  }

  console.log("isTutor:", isTutor, "isTutorLoading:", isTutorLoading);

  return [isTutor, isTutorLoading];
};

export default useTutor;
