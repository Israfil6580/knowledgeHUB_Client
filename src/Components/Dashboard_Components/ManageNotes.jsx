import EditableNoteCard from "../Public_Components/EditableNoteCard";

const ManageNotes = () => {
  return (
    <div className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] rounded-2xl min-h-[calc(100vh-150px)] mt-2 p-6">
      <div>
        <div>
          <h1 className="text-3xl font-black font-title">Manage Notes</h1>
          <p className="text-sm">Manage or edit your notes</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <EditableNoteCard />
          <EditableNoteCard />
          <EditableNoteCard />
          <EditableNoteCard />
          <EditableNoteCard />
          <EditableNoteCard />
          <EditableNoteCard />
          <EditableNoteCard />
          <EditableNoteCard />
          <EditableNoteCard />
          <EditableNoteCard />
          <EditableNoteCard />
          <EditableNoteCard />
          <EditableNoteCard />
          <EditableNoteCard />
          <EditableNoteCard />
        </div>
      </div>
    </div>
  );
};

export default ManageNotes;
