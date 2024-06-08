import {
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";

const NoteCard = () => {
  return (
    <Popover>
      <PopoverHandler>
        <div className="bg-white p-4 rounded-2xl cursor-pointer hover:bg-gray-300 transition-transform group relative">
          <p className="text-[15px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            doloremque deleniti accusamus nemo magnam soluta eligendi odit
            officia exercitationem, in impedit sapiente saepe? Vero a enim
            dolorem nesciunt doloribus amet?
          </p>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-40"
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
            className="mb-5 font-normal text-blue-gray-700 w-full"
          >
            Material Tailwind is an easy to use components library for Tailwind
            CSS and Material Design. It features multiple React and HTML
            components, all written with Tailwind CSS classes and Material
            Design guidelines. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sed iure id ad nihil itaque suscipit magni magnam
            possimus quidem eligendi facere praesentium sunt rerum inventore
            deleniti, illo reiciendis ipsum accusamus eum placeat maiores nobis
            veniam optio? Hic dolorum tempora, a assumenda laudantium in ducimus
            dolorem voluptatem alias dicta. Ex provident consequatur eius
            assumenda pariatur inventore tempora aperiam, nisi laudantium,
            incidunt, numquam dicta suscipit consectetur. Odit, aut quidem ipsum
            omnis beatae illo similique molestias. Temporibus libero provident
            debitis, veritatis quas tempore in commodi iste ratione alias eius
            sit.
          </Typography>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NoteCard;
