import React from "react";
import logo from "/logo.svg";
import {
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Container from "../Public_Components/Container";
import { Link, NavLink } from "react-router-dom";
import { ProfileMenu } from "../Public_Components/ProfileMenu";
import useAuth from "../../Hooks/useAuth";

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography as="a" href="#" variant="small" color="blue-gray">
        <NavLink
          to={"/"}
          className="flex items-center gap-2 py-2 pr-4 font-normal"
        >
          Home
        </NavLink>
      </Typography>
      <Typography as="a" href="#" variant="small" color="blue-gray">
        <NavLink
          to={"/Dashboard"}
          className="flex items-center gap-2 py-2 pr-4 font-normal"
        >
          Dashboard
        </NavLink>
      </Typography>
      <Typography as="a" href="#" variant="small" color="blue-gray">
        <ListItem className="flex items-center gap-2 py-2 pr-4 font-normal">
          Be A Tutor
        </ListItem>
      </Typography>
      <Typography as="a" href="#" variant="small" color="blue-gray">
        <ListItem className="flex items-center gap-2 py-2 pr-4 font-normal">
          My Classes
        </ListItem>
      </Typography>
    </List>
  );
}
// Navbar component start here
export function Navbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { user } = useAuth();
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div className="py-3 fixed w-full bg-white z-50 top-0">
      <Container>
        <div className="flex items-center justify-between text-blue-gray-900">
          <img
            src={logo}
            className="mr-4 cursor-pointer py-1.5 lg:ml-2 h-14 w-auto"
            alt=""
          />
          <div className="hidden lg:block">
            <NavList />
          </div>
          {!user ? (
            <div className="hidden gap-2 lg:flex">
              <Link to={"/Login"}>
                <Button
                  variant="text"
                  className="capitalize font-normal text-[15px]"
                  color="blue-gray"
                >
                  Log in
                </Button>
              </Link>
              <Link to={"/Registration"}>
                <Button
                  variant="gradient"
                  className="capitalize font-normal text-[15px]"
                >
                  Registration
                </Button>
              </Link>
            </div>
          ) : (
            <div className="lg:block hidden">
              <ProfileMenu user={user} />
            </div>
          )}
          <div className=" lg:hidden flex gap-1">
            {user && (
              <div className="block">
                <ProfileMenu user={user} />
              </div>
            )}
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          <NavList />
          {!user && (
            <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
              <Link className="w-1/2" to={"/Login"}>
                <Button
                  variant="outlined"
                  size="sm"
                  color="blue-gray"
                  fullWidth
                >
                  Log in
                </Button>
              </Link>
              <Link className="w-1/2" to={"/Registration"}>
                <Button variant="gradient" size="sm" fullWidth>
                  Registration
                </Button>
              </Link>
            </div>
          )}
        </Collapse>
      </Container>
    </div>
  );
}
