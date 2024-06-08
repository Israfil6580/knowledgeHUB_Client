import MaterialCard from "../Public_Components/MaterialCard";

const StudyMaterials = () => {
  return (
    <div className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] rounded-2xl min-h-[calc(100vh-150px)] mt-2 p-6">
      <div>
        <h1 className="text-3xl font-black font-title">Study Materials</h1>
        <p className="text-sm">See you booked session material</p>
      </div>
      <div className="grid grid-cols-3 gap-x-2 gap-y-16 mt-16">
        <MaterialCard />
      </div>
    </div>
  );
};

export default StudyMaterials;
