import { Button } from "@material-tailwind/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const CreateSession = () => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 2))
  );
  const [regStartDate, setRegStartDate] = useState(new Date());
  const [regEndDate, setRegEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 2))
  );
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const CreatedSession = {
        ...data,
        Status: "Pending",
        ClassStartDate: startDate,
        ClassEndDate: endDate,
        RegStartDate: regStartDate,
        RegEndDate: regEndDate,
      };
      await axiosPublic.post("/Created_Session", CreatedSession);
      toast.success("Successfully added and awaiting approval.");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to add and approve the item.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] rounded-2xl min-h-[calc(100vh-150px)] mt-2 p-6">
      <div>
        <h1 className="text-3xl font-black font-title">Create Session</h1>
        <p className="text-sm">Create session for students</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex mt-5 gap-4">
        <div className="w-1/2 flex  flex-col gap-5">
          <div className="flex gap-2">
            <div>
              <label htmlFor="reg-start-date" className="block text-[15px]">
                Registration start date
              </label>
              <DatePicker
                id="reg-start-date"
                selected={regStartDate}
                onChange={(date) => setRegStartDate(date)}
                selectsStart
                startDate={regStartDate}
                endDate={regEndDate}
                minDate={new Date()}
                className="py-1.5 px-2 border border-gray-400 rounded-md outline-none"
              />
            </div>
            <div>
              <label htmlFor="reg-end-date" className="block text-[15px]">
                Registration end date
              </label>
              <DatePicker
                id="reg-end-date"
                selected={regEndDate}
                onChange={(date) => setRegEndDate(date)}
                selectsEnd
                startDate={regStartDate}
                endDate={regEndDate}
                minDate={regStartDate}
                className="py-1.5 px-2 border border-gray-400 rounded-md outline-none"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <label htmlFor="start-date" className="block text-[15px]">
                Class start date
              </label>
              <DatePicker
                id="start-date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date(regEndDate)}
                className="py-1.5 px-2 border border-gray-400 rounded-md outline-none"
              />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-[15px]">
                Class end date
              </label>
              <DatePicker
                id="end-date"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="py-1.5 px-2 border border-gray-400 rounded-md outline-none"
              />
            </div>
          </div>

          <div className="pb-2">
            <label htmlFor="sessionDescription" className="block text-[15px]">
              Session Description
            </label>
            <textarea
              required
              type="text"
              name="sessionDescription"
              id="sessionDescription"
              placeholder="Session Description"
              rows={"11"}
              className="w-[95%] px-3 py-2 border rounded-md text-gray-700 transition-transform border-gray-400 outline-none"
              {...register("sessionDescription", { required: true })}
            />
          </div>

          <div>
            <Button type="submit" className="font-normal capitalize text-base">
              Create Session
            </Button>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          <div className="pb-2">
            <label htmlFor="sessionTitle" className="block text-[15px]">
              Session Title
            </label>
            <input
              required
              type="text"
              name="sessionTitle"
              id="sessionTitle"
              placeholder="Session Title"
              className="w-full px-3 py-2 border rounded-md text-gray-700 transition-transform border-gray-400 outline-none"
              {...register("sessionTitle", { required: true })}
            />
          </div>
          <div className="pb-2">
            <label htmlFor="TutorEmail" className="block text-[15px]">
              Tutor email
            </label>
            <input
              type="text"
              name="TutorEmail"
              id="TutorEmail"
              placeholder="Tutor email"
              defaultValue={user.email}
              readOnly
              className="w-full px-3 py-2 border rounded-md text-gray-700 transition-transform border-gray-400 outline-none"
              {...register("TutorEmail", { required: true })}
            />
          </div>
          <div className="pb-2">
            <label htmlFor="SessionDuration" className="block text-[15px]">
              Session Duration
            </label>
            <div className="flex items-center relative">
              <input
                required
                type="number"
                name="SessionDuration"
                id="SessionDuration"
                min="0"
                placeholder="Session Duration"
                className="w-full px-3 py-2 border rounded-md text-gray-700 transition-transform border-gray-400 outline-none"
                {...register("SessionDuration", { required: true })}
              />
              <span className="ml-2 text-gray-700 absolute right-2">month</span>
            </div>
          </div>
          <div className="pb-2">
            <label htmlFor="RegistrationFee" className="block text-[15px]">
              Registration fee
            </label>
            <input
              required
              type="text"
              name="RegistrationFee"
              id="RegistrationFee"
              defaultValue={"0"}
              readOnly
              className="w-full px-3 py-2 border rounded-md text-gray-700 transition-transform border-gray-400 outline-none"
              {...register("RegistrationFee", { required: true })}
            />
          </div>
          <div className="w-full outline-none pb-2 flex flex-col">
            <label htmlFor="password" className="text-[15px]">
              Session type
            </label>
            <select
              className="border border-gray-400 text-gray-700 outline-none py-2 px-2 rounded-md"
              {...register("SessionType", { required: true })}
            >
              <option defaultValue={"Online"}>Online</option>
              <option>Offline</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div className="pb-2">
            <label htmlFor="sessionTitle" className="block text-[15px]">
              Maximum Participants
            </label>
            <div className="flex items-center">
              <input
                required
                type="number"
                min="20"
                name="MaximumParticipants"
                id="MaximumParticipants"
                placeholder="Maximum Participants"
                className="w-full px-3 py-2 border rounded-md text-gray-700 transition-transform border-gray-400 outline-none"
                {...register("MaximumParticipants", { required: true })}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateSession;
