import { Button, Dialog } from "@material-tailwind/react";
import NoteCard from "../Public_Components/NoteCard";
import { useState } from "react";

const CreateNotes = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  return (
    <div className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] rounded-2xl min-h-[calc(100vh-150px)] mt-2 p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-black font-title">Personal Notes</h1>
          <p className="text-sm">Add your notes here</p>
        </div>
        <Button
          className="flex gap-1 text-[15px] capitalize items-center font-normal"
          onClick={handleOpen}
        >
          Add Note{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
        <Dialog
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <div className="relative bg-white p-10 rounded-2xl flex gap-4 flex-col">
            <div>
              <label>User Email</label>
              <input
                className="py-2 px-1 w-full rounded-lg outline-none border-2 border-gray-300 text-black text-[15px]"
                type="text"
                defaultValue={`israfilhossainmilon@gmail.com ${"(read only)"}`}
                disabled
                name=""
                id=""
              />
            </div>
            <div>
              <label>Title</label>
              <input
                className="py-2 px-1 w-full rounded-lg outline-none border-2 border-gray-300 text-black text-[15px]"
                type="text"
                placeholder="Write note title"
                name=""
                id=""
              />
            </div>
            <div className="relative w-full min-w-[200px] flex flex-col">
              <label>Create Note</label>
              <textarea
                className="border-gray-300 border-2 w-full outline-none rounded-xl p-3 text-black text-[15px]"
                rows="8"
                placeholder=" Write your notes "
              ></textarea>
            </div>
            <div className="flex gap-2 w-full justify-end py-1.5">
              <Button className="text-[15px] capitalize font-normal">
                Add Note
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-6">
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </div>
    </div>
  );
};

export default CreateNotes;
