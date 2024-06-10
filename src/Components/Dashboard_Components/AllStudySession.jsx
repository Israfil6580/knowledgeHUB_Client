import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
  Input,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AllStudySession = () => {
  const [allSession, setAllSession] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm(); // Initialize useForm
  const fetchAllSessions = async () => {
    try {
      const { data } = await axiosSecure.get("/Session");
      setAllSession(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast.error("Failed to fetch sessions");
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  const HandleApproved = async (_id, data) => {
    try {
      await axiosSecure.put(`/Created_Session/Make_Approve/${_id}`, data);
      fetchAllSessions();
      toast.success("Approved Successfully with amount");
    } catch (error) {
      console.error("Error approving session:", error);
      toast.error("Failed to approve session");
    }
  };

  const HandleReject = async (_id) => {
    try {
      await axiosSecure.put(`/Created_Session/Make_Rejected/${_id}`);
      fetchAllSessions();
      toast.success("Rejected Successfully");
    } catch (error) {
      console.error("Error rejecting session:", error);
      toast.error("Failed to reject session");
    }
  };
  const HandleDelete = async (_id) => {
    // Show confirmation dialog before deleting
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/Created_Session/Make_Delete/${_id}`);
          fetchAllSessions();
          toast.success("Deleted Successfully");
        } catch (error) {
          console.error("Error deleting session:", error);
          toast.error("Failed to delete session");
        }
      }
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="pt-6">
        <h1 className="text-3xl font-black font-title">All Sessions</h1>
        <p className="text-sm">See all Sessions on your website</p>
      </div>
      <div className="container p-2 mx-auto sm:p-4">
        <div className="overflow-x-auto">
          <div className="container p-2 mx-auto sm:p-4 text-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full text-[15px]">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col className="w-24" />
                </colgroup>
                <thead className="bg-gray-300">
                  <tr className="text-left">
                    <th className="p-3"></th>
                    <th className="p-3">Session Name</th>
                    <th className="p-3">Reg Date</th>
                    <th className="p-3">Class Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {allSession.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-opacity-20 bg-gray-50"
                    >
                      <td className="p-3"></td>
                      <td className="p-3">
                        <p>{item.sessionTitle}</p>
                      </td>
                      <td className="p-3">
                        <p>{item.RegEndDate.split("T")[0]}</p>
                      </td>
                      <td className="p-3">
                        <p>{item.ClassStartDate.split("T")[0]}</p>
                      </td>
                      <td className="p-3">
                        <span className="px-3 py-1 font-semibold rounded-md bg-violet-600">
                          <span>{item.Status}</span>
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="px-3 py-1 font-semibold rounded-md bg-violet-600">
                          <span>{item.RegistrationFee}</span>
                        </span>
                      </td>
                      <td className="p-3 gap-2 flex">
                        <Popover placement="bottom">
                          <PopoverHandler>
                            <Button id="bbb">Approve</Button>
                          </PopoverHandler>
                          <PopoverContent className="w-96">
                            <Typography
                              variant="h6"
                              color="blue-gray"
                              className="mb-6"
                            >
                              Is this session free or paid
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="mb-1 font-bold"
                            >
                              Amount
                            </Typography>
                            <form
                              onSubmit={handleSubmit((data) =>
                                HandleApproved(item._id, data)
                              )}
                            >
                              <div className="flex gap-2">
                                <Input
                                  size="lg"
                                  type="number"
                                  defaultValue={item.RegistrationFee}
                                  {...register("amount", { required: true })}
                                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                />
                                <Button
                                  type="submit"
                                  variant="gradient"
                                  className="flex-shrink-0"
                                >
                                  Confirm
                                </Button>
                              </div>
                            </form>
                          </PopoverContent>
                        </Popover>
                        <Button onClick={() => HandleReject(item._id)}>
                          Reject
                        </Button>
                        <Button onClick={() => HandleDelete(item._id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudySession;
