/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const MaterialCard = ({ item }) => {
  return (
    <div className="w-auto bg-white border relative pt-14 pb-6 px-10 rounded-2xl">
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
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>

            {item.TutorName}
          </p>
        </div>
        <hr />
        <Link to={`/Dashboard/seeMaterials/${item.sessionId}`}>
          <Button className="font-normal text-[15px] capitalize w-full">
            see resources
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MaterialCard;
