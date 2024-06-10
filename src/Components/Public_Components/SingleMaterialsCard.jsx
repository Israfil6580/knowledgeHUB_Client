/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";

const SingleMaterialsCard = ({ item }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch } = useQuery({
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
          Swal.fire("Deleted!", "Your material has been deleted.", "success");
          refetch();
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
  const handleOpenDialog = (index) => {
    setOpenDialogIndex(index);
  };
  const [openDialogIndex, setOpenDialogIndex] = useState(null);
  // const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      GoogleDriveLinks: [{ url: "" }],
      PhotoURLs: [{ file: null }],
    },
  });

  const image_hosting_key = import.meta.env.VITE_image_hosting_key;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control,
    name: "GoogleDriveLinks",
  });

  const {
    fields: photoFields,
    append: appendPhoto,
    remove: removePhoto,
  } = useFieldArray({
    control,
    name: "PhotoURLs",
  });

  const handleCloseDialog = () => {
    setOpenDialogIndex(null);
    reset();
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Extracting uploaded image URLs
      const uploadedImages = await Promise.all(
        data.PhotoURLs.map(async (photo) => {
          const file = photo.file[0];
          const formData = new FormData();
          formData.append("image", file);

          const response = await axios.post(image_hosting_api, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          return response.data.data.url;
        })
      );

      // Extracting link URLs
      const linkUrls = data.GoogleDriveLinks.map((link) => link.url);

      // Constructing material info object
      const updatedInfo = {
        MaterialTitle: data.MaterialTitle,
        PhotoURLs: uploadedImages,
        GoogleDriveLinks: linkUrls,
      };

      await axiosSecure.patch(`/Study-Material/${item._id}`, updatedInfo);
      toast.success("Success! You've successfully updated the resources");

      handleCloseDialog();
      refetch();
    } catch (error) {
      toast.error("Error updating resources. Please try again later.");
      handleCloseDialog();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div key={item._id} className="mt-7">
      <div className="bg-white p-4 rounded-xl flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-title font-black text-center">
            {item.SessionTitle}
          </h1>
        </div>
        <div className="flex justify-between">
          <button onClick={handleOpenDialog}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-7"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
          </button>
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
          <Dialog open={openDialogIndex !== null} size="xs">
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogBody>
                <div className="text-center mt-2 mb-4">
                  <h1 className="font-title text-3xl font-black text-gray-900">
                    Upload Materials
                  </h1>
                </div>
                <div className="grid gap-6">
                  <Input
                    type="email"
                    defaultValue={item.TutorEmail}
                    label="Tutor Email"
                    {...register("TutorEmail", { required: true })}
                    readOnly
                  />
                  <Input
                    {...register("SessionId", { required: true })}
                    type="text"
                    defaultValue={item._id}
                    label="Session Id"
                    readOnly
                  />
                  <Input
                    {...register("SessionTitle", { required: true })}
                    type="text"
                    label="Session Title"
                    defaultValue={item.SessionTitle}
                    readOnly
                  />
                  <Input
                    {...register("MaterialTitle", { required: true })}
                    type="text"
                    label="Material Title"
                    defaultValue={item.MaterialTitle}
                  />
                  <div>
                    {linkFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center gap-4 mb-2"
                      >
                        <Input
                          {...register(`GoogleDriveLinks.${index}.url`, {
                            required: true,
                          })}
                          type="url"
                          label={`Google Drive Link ${index + 1}`}
                          className="flex-1"
                        />
                        <Button
                          variant="text"
                          color="red"
                          onClick={() => removeLink(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="text"
                      color="blue"
                      onClick={() => appendLink({ url: "" })}
                    >
                      Add Another Link
                    </Button>
                  </div>
                  <div>
                    {photoFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center gap-4 mb-2"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          {...register(`PhotoURLs.${index}.file`, {
                            required: true,
                          })}
                          className="w-full px-3 py-2 border rounded-md text-gray-700 transition-transform border-gray-400 outline-none"
                        />
                        <Button
                          variant="text"
                          color="red"
                          onClick={() => removePhoto(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="text"
                      color="blue"
                      onClick={() => appendPhoto({ file: null })}
                    >
                      Add Another Image
                    </Button>
                  </div>
                </div>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button
                  className="text-[15px] font-normal capitalize"
                  variant="text"
                  color="gray"
                  onClick={handleCloseDialog}
                >
                  Cancel
                </Button>
                {isSubmitting ? (
                  <Button className="w-32 flex justify-center">
                    <FidgetSpinner
                      visible={true}
                      height="23"
                      width="23"
                      ariaLabel="fidget-spinner-loading"
                      wrapperStyle={{}}
                      wrapperClass="fidget-spinner-wrapper"
                    />
                  </Button>
                ) : (
                  <Button
                    className="text-[15px] font-normal capitalize w-32"
                    type="submit"
                  >
                    Upload
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Dialog>
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
  );
};

export default SingleMaterialsCard;
