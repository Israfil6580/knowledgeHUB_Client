/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FidgetSpinner } from "react-loader-spinner";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const UploadCard = ({ ApprovedSession }) => {
  const [openDialogIndex, setOpenDialogIndex] = useState(null);
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      GoogleDriveLinks: [{ url: "" }],
      PhotoURLs: [{ file: null }],
    },
  });

  const image_hosting_key = import.meta.env.VITE_image_hosting_key;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleOpenDialog = (index) => {
    setOpenDialogIndex(index);
  };

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
      const materialInfo = {
        ...data, // Include other form data
        PhotoURLs: uploadedImages,
        GoogleDriveLinks: linkUrls,
      };

      // Post materialInfo to the backend
      await axiosPublic.post(`/Study_Materials`, materialInfo);

      toast.success("Success! You've successfully uploaded resources");
      handleCloseDialog();
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error updating resources:", error);
      toast.error("Error updating resources. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {ApprovedSession.map((item, index) => (
        <div
          key={item._id}
          className="w-auto bg-white border relative pt-14 pb-6 px-10 rounded-2xl"
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-black tracking-wide font-title text-xl">
              {item.sessionTitle}
            </h2>
            <div className="flex flex-col gap-1">
              <p className="flex gap-2 text-gray-700 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                {item.SessionType}
              </p>
              <p className="flex gap-2 text-gray-700 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                {item.ClassEndDate.split("T")[0]}
              </p>
            </div>
            <hr />
            <Button
              className="text-[15px] font-normal capitalize"
              onClick={() => handleOpenDialog(index)}
            >
              Upload Materials
            </Button>
            <Dialog open={openDialogIndex === index} size="xs">
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
                      defaultValue={item.sessionTitle}
                      readOnly
                    />
                    <Input
                      {...register("MaterialTitle", { required: true })}
                      type="text"
                      label="Material Title"
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
                              required: "Image is required",
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
        </div>
      ))}
    </div>
  );
};

export default UploadCard;
