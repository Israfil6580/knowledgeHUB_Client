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

const SingleMaterialsCard = ({ StudyMaterials }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <div className="grid grid-cols-3 gap-4">
      {StudyMaterials.map((item) => (
        <div key={item._id} className="mt-7">
          <div className="bg-white p-4 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between">
              <button onClick={handleOpen}>
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
              <button>
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
              <Dialog open={open} size="xs" handler={handleOpen}>
                <form>
                  <DialogBody>
                    <div className="text-center mt-2 mb-4">
                      <h1 className="font-title text-3xl font-black text-gray-900">
                        {/* Update Materials */}
                        {item.SessionId}
                      </h1>
                    </div>
                    <div className="grid gap-6">
                      <Input type="email" label="Tutor Email" />
                      <Input type="text" label="Session Id" />
                      <Input type="text" label="Material Title" />
                      <Input type="url" label="Google Drive Link" />

                      <fieldset className="w-full space-y-1">
                        <label
                          htmlFor="files"
                          className="block text-sm font-medium"
                        >
                          Images
                        </label>
                        <div className="flex">
                          <input
                            type="file"
                            name="files"
                            id="files"
                            multiple
                            className="px-8 py-2 border rounded-md border-gray-400 w-full box-border"
                          />
                        </div>
                      </fieldset>
                    </div>
                  </DialogBody>
                  <DialogFooter className="space-x-2">
                    <Button
                      className="text-[15px] font-normal capitalize"
                      variant="text"
                      color="gray"
                      onClick={handleOpen}
                    >
                      cancel
                    </Button>
                    <Button
                      className="text-[15px] font-normal capitalize"
                      onClick={handleOpen}
                    >
                      Update
                    </Button>
                  </DialogFooter>
                </form>
              </Dialog>
            </div>
            <div>
              <h2 className="font-title text-xl mb-2 font-black pl-3">
                {item.MaterialTitle}
              </h2>
              <div className="container flex flex-col justify-center p-4 mx-auto">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
                  <img
                    className="object-cover w-full dark:bg-gray-500 aspect-square"
                    src="https://source.unsplash.com/random/300x300/?1"
                  />
                  <img
                    className="object-cover w-full dark:bg-gray-500 aspect-square"
                    src="https://source.unsplash.com/random/300x300/?2"
                  />
                  <img
                    className="object-cover w-full dark:bg-gray-500 aspect-square"
                    src="https://source.unsplash.com/random/300x300/?3"
                  />
                  <img
                    className="object-cover w-full dark:bg-gray-500 aspect-square"
                    src="https://source.unsplash.com/random/300x300/?4"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <Link
                  className="text-sm underline"
                  target="_blank"
                  to="https://drive.google.com/drive/folders/0B9BrgG25s1_BOGY1YmViNWQtYWY4ZS00NWUzLWFkYjYtM2RkNmQ5YjMwNzQx?resourcekey=0-mP3vH6iaqMwhXj1EL1E0fg"
                >
                  assignment Link
                </Link>
                <Link
                  className="text-sm underline"
                  target="_blank"
                  to="https://drive.google.com/drive/folders/0B9BrgG25s1_BOGY1YmViNWQtYWY4ZS00NWUzLWFkYjYtM2RkNmQ5YjMwNzQx?resourcekey=0-mP3vH6iaqMwhXj1EL1E0fg"
                >
                  assignment Link
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleMaterialsCard;
