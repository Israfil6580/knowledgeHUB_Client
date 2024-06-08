import { Button, Dialog, DialogFooter } from "@material-tailwind/react";
import { useState } from "react";

const EditableNoteCard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <div className="mt-7">
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
          <Dialog open={open} handler={handleOpen}>
            <form className="m-10">
              <div>
                <h1 className="text-3xl font-black mb-6 text-center text-gray-900 font-title">
                  Manage Notes
                </h1>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label>Title</label>
                  <input
                    className="py-2 px-1 w-full rounded-lg outline-none border-2 border-gray-300 text-black text-[15px]"
                    type="text"
                    defaultValue={"Web Developement"}
                    name=""
                    id=""
                  />
                </div>
                <div>
                  <label>Note</label>
                  <textarea
                    className="py-2 px-1 w-full rounded-lg outline-none border-2 border-gray-300 text-black text-[15px]"
                    rows="8"
                    defaultValue={
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, unde. Porro soluta nulla labore ullam tempore praesentium, recusandae mollitia fuga illo perspiciatis, libero repellendus similique autem. Sapiente soluta neque tempora?"
                    }
                  ></textarea>
                </div>
              </div>
              <DialogFooter className="space-x-2 transition-none">
                <Button
                  variant="text"
                  color="blue-gray"
                  onClick={handleOpen}
                  className="text-[15px] font-normal capitalize"
                >
                  cancel
                </Button>
                <Button
                  type="submit"
                  variant="gradient"
                  color="green"
                  onClick={handleOpen}
                  className="text-[15px] font-normal capitalize"
                >
                  confirm
                </Button>
              </DialogFooter>
            </form>
          </Dialog>
        </div>
        <div>
          <h2 className="font-title text-xl mb-2 font-black">
            Web Developement
          </h2>
          <p className="text-[15px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
            unde. Porro soluta nulla labore ullam tempore praesentium,
            recusandae mollitia fuga illo perspiciatis, libero repellendus
            similique autem. Sapiente soluta neque tempora?
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditableNoteCard;
