import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";

const AllMaterials = () => {
  const axiosSecure = useAxiosSecure();

  const deleteMaterials = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/Study_Material/${id}`);
          refetch(); // <-- Refetch after deletion
          Swal.fire("Deleted!", "material has been deleted.", "success");
        } catch (error) {
          Swal.fire(
            "Error!",
            "There was an error deleting the material.",
            "error"
          );
        }
      }
    });
  };

  const { data: allmaterials = [], refetch } = useQuery({
    queryKey: ["allmaterials"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/Study_Materials");
        return res.data;
      } catch (error) {
        console.error("Error fetching materials:", error);
        throw new Error("Failed to fetch materials");
      }
    },
  });

  useEffect(() => {
    refetch(); // <-- Fetch data on component mount
  }, []);

  return (
    <div className="bg-gray-200 py-6 px-4 rounded-xl">
      <div className="pt-6 pl-4">
        <h1 className="text-3xl font-black font-title">All Materials</h1>
        <p className="text-sm">See all materials on your website</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {allmaterials.map((item, index) => (
          <div key={index} className="mt-7">
            <div className="bg-white p-4 rounded-xl flex flex-col gap-4">
              <div>
                <h1 className="text-2xl font-title font-black text-center">
                  {item.SessionTitle}
                </h1>
              </div>
              <div className="flex justify-end">
                <button onClick={() => deleteMaterials(item._id)}>
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
                </button>
              </div>
              <div>
                <h2 className="font-title text-xl mb-2 font-black pl-3">
                  {item.MaterialTitle}
                </h2>
                <div className="container flex flex-col justify-center p-4 mx-auto">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {item.PhotoURLs.map((photo, index) => (
                      <img
                        key={index}
                        className="object-cover w-full h-full dark:bg-gray-500 aspect-square"
                        src={photo}
                        alt={`Photo ${index + 1}`} // Adding an alt attribute for accessibility
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 justify-center">
                  {item.GoogleDriveLinks.map((link, index) => (
                    <Link
                      key={index}
                      className="text-sm underline"
                      target="_blank"
                      to={link}
                    >
                      Drive link
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMaterials;
