import { Button, Dialog } from "@material-tailwind/react";
import NoteCard from "../Public_Components/NoteCard";
import { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CreateNotes = () => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const axiosSecure = useAxiosSecure();
  const handleOpen = () => setOpen((cur) => !cur);

  const fetchNotes = async () => {
    try {
      const response = await axiosSecure.get(`/notes/${email}`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = { email, title, content };
    try {
      await axiosSecure.post("/notes", newNote);
      setTitle("");
      setContent("");
      fetchNotes();
      handleOpen();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

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
          <form
            onSubmit={handleSubmit}
            className="relative bg-white p-10 rounded-2xl flex gap-4 flex-col"
          >
            <div>
              <label>User Email</label>
              <input
                className="py-2 px-1 w-full rounded-lg outline-none border-2 border-gray-300 text-black text-[15px]"
                type="text"
                value={email}
                readOnly
              />
            </div>
            <div>
              <label>Title</label>
              <input
                className="py-2 px-1 w-full rounded-lg outline-none border-2 border-gray-300 text-black text-[15px]"
                type="text"
                placeholder="Write note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="relative w-full min-w-[200px] flex flex-col">
              <label>Create Note</label>
              <textarea
                className="border-gray-300 border-2 w-full outline-none rounded-xl p-3 text-black text-[15px]"
                rows="8"
                placeholder="Write your notes"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex gap-2 w-full justify-end py-1.5">
              <Button
                type="submit"
                className="text-[15px] capitalize font-normal"
              >
                Add Note
              </Button>
            </div>
          </form>
        </Dialog>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-6">
        {notes.map((notes) => (
          <NoteCard
            key={notes._id}
            title={notes.title}
            content={notes.content}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateNotes;
