/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const BookedCard = ({ bookings }) => {
  return (
    <div className="w-auto bg-white border relative pt-14 pb-6 px-10 rounded-2xl">
      <div className="flex flex-col gap-2">
        <h2 className="font-black tracking-wide font-title text-xl">
          {bookings.sessionTitle}
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
            {bookings.SessionType}
          </p>
          <p className="flex gap-2 text-gray-700 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {bookings.RegStartDate.split("T")[0]}
          </p>
        </div>
        <hr />
        <Link to={`/session/${bookings.sessionId}`}>
          <Button className="font-normal text-[15px] capitalize w-full">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BookedCard;
