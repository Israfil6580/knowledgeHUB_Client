/* eslint-disable react/prop-types */
import {
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";

const NoteCard = ({ title, content }) => {
  return (
    <Popover>
      <PopoverHandler>
        <div className="bg-white p-4 py-10 rounded-2xl cursor-pointer hover:bg-gray-300 transition-transform group relative">
          <p className="text-[15px] font-bold text-xl pb-4">
            {title.split(" ").splice(0, 4).join(" ")}
          </p>
          <p className="text-[15px]">
            {content.split(" ").splice(0, 20).join(" ")}...
          </p>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
        </div>
      </PopoverHandler>
      <PopoverContent className="z-[999] bg-gradient-to-r from-[#ebedee] to-[#fdfbfb] w-1/2 overflow-hidden p-0">
        <div className="p-4">
          <Typography
            color="gray"
            className="mb-5 text-2xl font-bold text-blue-gray-700 w-full"
          >
            {title}
          </Typography>
          <Typography
            color="gray"
            className="mb-5 font-normal text-blue-gray-700 w-full"
          >
            {content}
          </Typography>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NoteCard;
