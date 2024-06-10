import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import BookedCard from "../Public_Components/BookedCard";
import useAuth from "../../Hooks/useAuth";

const BookedSession = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myBookings = [], refetch } = useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/Booked_Session/${user.email}`);
        return res.data;
      } catch (error) {
        console.error("Error fetching myBookings:", error);
        throw new Error("Failed to fetch myBookings");
      }
    },
  });

  if (myBookings.length > 0) {
    refetch();
  }

  return (
    <div className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] rounded-2xl min-h-[calc(100vh-150px)] mt-2 p-6">
      <div>
        <h1 className="text-3xl font-black font-title">Booked Session</h1>
        <p className="text-sm">All session you booked</p>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-2 gap-y-16 mt-16">
        {myBookings.map((bookings) => (
          <BookedCard key={bookings._id} bookings={bookings} />
        ))}
      </div>
    </div>
  );
};

export default BookedSession;
