/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function CardDefault({ item }) {
  const isRegistrationOver = new Date(item.RegEndDate) < new Date();
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 font-title font-black text-2xl"
        >
          {item.sessionTitle}
        </Typography>
        <Typography className="text-sm font-normal">
          {item.sessionDescription.split(" ").splice(0, 15).join(" ")}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-between flex-grow items-end">
        {isRegistrationOver ? (
          <Button className="font-normal capitalize text-[14px]">Closed</Button>
        ) : (
          <Button className="font-normal capitalize text-[14px]">
            Ongoing
          </Button>
        )}
        <Link to={`/session/${item._id}`}>
          <Button className="font-normal capitalize text-[14px]">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
