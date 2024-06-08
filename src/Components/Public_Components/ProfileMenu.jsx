import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import logo from "/noUserImage.png";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
export function ProfileMenu() {
  const [openPopover, setOpenPopover] = useState(false);
  const { user, logOut } = useAuth();

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onClick: [() => setOpenPopover(true), () => setOpenPopover(false)],
  };

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <img
          className="rounded-full w-12 h-12 object-cover cursor-pointer"
          src={user?.photoURL || logo}
          alt=""
        />
      </PopoverHandler>
      <PopoverContent className="z-50 lg:min-w-[22rem] leading-3">
        <div className="flex flex-col justify-center items-center">
          <div className=" flex items-center gap-4">
            <Avatar size="lg" variant="circular" src={user?.photoURL} />
          </div>
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-medium mt-2"
          >
            <span>{user?.displayName}</span>
          </Typography>
          <Typography variant="h5" color="blue-gray" className="font-medium">
            <span
              href="#"
              className="text-sm font-medium text-gray-900 leading-3"
            >
              {user?.providerData[0]?.providerId}
            </span>
          </Typography>
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-medium leading-3"
          >
            <span href="#" className="text-sm font-medium text-gray-900">
              {user?.email}
            </span>
          </Typography>
        </div>
        <div className="mt-6 flex items-center justify-start gap-8 border-t border-blue-gray-50 pt-4">
          <Button
            onClick={logOut}
            variant="gradient"
            size="md"
            className="font-normal capitalize text-[15px] w-full"
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
