import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import facebook from "/facebook.svg";
import instragram from "/instagram.svg";
import twitter from "/twitter.svg";
import { Link } from "react-router-dom";
export function ProfileCard() {
  return (
    <Card className="w-auto">
      <CardHeader floated={false} className="h-80">
        <img
          src="https://docs.material-tailwind.com/img/team-3.jpg"
          alt="profile-picture"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Natalie Paisley
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          CEO / Co-Founder
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Link>
          <Tooltip content="facebook">
            <img
              className="w-10 h-10 object-cover hover:border-2 hover:border-blue-300 transition-transform rounded-full p-[2px]"
              src={facebook}
              alt=""
            />
          </Tooltip>
        </Link>
        <Link>
          <img
            className="w-10 h-10 object-cover hover:border-2 hover:border-blue-300 transition-transform rounded-full p-[2px]"
            src={instragram}
            alt=""
          />
        </Link>
        <Link>
          <img
            className="w-10 h-10 object-cover hover:border-2 hover:border-blue-300 transition-transform rounded-full p-[2px]"
            src={twitter}
            alt=""
          />
        </Link>
      </CardFooter>
    </Card>
  );
}
