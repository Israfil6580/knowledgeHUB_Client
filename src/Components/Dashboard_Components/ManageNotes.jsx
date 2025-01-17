import EditableNoteCard from "../Public_Components/EditableNoteCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";

const ManageNotes = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const fetchNotes = async () => {
    try {
      const response = await axiosSecure.get(`/notes/${user.email}`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <div className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] rounded-2xl min-h-[calc(100vh-150px)] mt-2 p-6">
      <div>
        <div>
          <h1 className="text-3xl font-black font-title">Manage Notes</h1>
          <p className="text-sm">Manage or edit your notes</p>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-3">
          {notes.map((item) => (
            <EditableNoteCard
              key={item._id}
              item={item}
              fetchNotes={fetchNotes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageNotes;
