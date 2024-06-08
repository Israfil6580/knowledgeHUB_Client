import BookedCard from "../Public_Components/BookedCard";

const BookedSession = () => {
  return (
    <div className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] rounded-2xl min-h-[calc(100vh-150px)] mt-2 p-6">
      <div>
        <h1 className="text-3xl font-black font-title">Booked Session</h1>
        <p className="text-sm">All session you booked</p>
      </div>
      <div className="grid grid-cols-3 gap-x-2 gap-y-16 mt-16">
        <BookedCard />
        <BookedCard />
        <BookedCard />
        <BookedCard />
      </div>
    </div>
  );
};

export default BookedSession;
