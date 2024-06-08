import { Link } from "react-router-dom";
import { DialogWithImage } from "../Public_Components/DialogWithImage";
import { Button } from "@material-tailwind/react";

const SeeMaterials = () => {
  return (
    <div className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] rounded-2xl min-h-[calc(100vh-150px)] mt-2 p-6">
      <div>
        <div className="flex justify-between items-start mb-5">
          <div>
            <h1 className="text-3xl font-black font-title">Resources</h1>
            <p className="text-sm">All resources from this session</p>
          </div>
          <div className="flex flex-col items-end">
            <h1 className="font-title font-black text-xl">Web Development</h1>
            <p className="text-[15px]">
              By <span>Ramesh Fuk</span>
            </p>
          </div>
        </div>
        <div className="mb-10">
          <h1 className="font-black font-title text-2xl mb-4">Images</h1>
          <div className="grid grid-cols-3 gap-4">
            <DialogWithImage />
            <DialogWithImage />
            <DialogWithImage />
            <DialogWithImage />
            <DialogWithImage />
            <DialogWithImage />
          </div>
        </div>
        <div>
          <h1 className="font-black font-title text-2xl my-4">
            Google Drive Link
          </h1>
          <div className="flex gap-3">
            <Link
              target="_blank"
              to="https://drive.google.com/drive/folders/0B9BrgG25s1_BOGY1YmViNWQtYWY4ZS00NWUzLWFkYjYtM2RkNmQ5YjMwNzQx?resourcekey=0-mP3vH6iaqMwhXj1EL1E0fg"
            >
              <Button className="bg-green-400">assignment Link</Button>
            </Link>
            <Link
              target="_blank"
              to="https://drive.google.com/drive/folders/0B9BrgG25s1_BOGY1YmViNWQtYWY4ZS00NWUzLWFkYjYtM2RkNmQ5YjMwNzQx?resourcekey=0-mP3vH6iaqMwhXj1EL1E0fg"
            >
              <Button className="bg-green-400">assignment Link</Button>
            </Link>
            <Link
              target="_blank"
              to="https://drive.google.com/drive/folders/0B9BrgG25s1_BOGY1YmViNWQtYWY4ZS00NWUzLWFkYjYtM2RkNmQ5YjMwNzQx?resourcekey=0-mP3vH6iaqMwhXj1EL1E0fg"
            >
              <Button className="bg-green-400">assignment Link</Button>
            </Link>
            <Link
              target="_blank"
              to="https://drive.google.com/drive/folders/0B9BrgG25s1_BOGY1YmViNWQtYWY4ZS00NWUzLWFkYjYtM2RkNmQ5YjMwNzQx?resourcekey=0-mP3vH6iaqMwhXj1EL1E0fg"
            >
              <Button className="bg-green-400">assignment Link</Button>
            </Link>
            <Link
              target="_blank"
              to="https://drive.google.com/drive/folders/0B9BrgG25s1_BOGY1YmViNWQtYWY4ZS00NWUzLWFkYjYtM2RkNmQ5YjMwNzQx?resourcekey=0-mP3vH6iaqMwhXj1EL1E0fg"
            >
              <Button className="bg-green-400">assignment Link</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeMaterials;
