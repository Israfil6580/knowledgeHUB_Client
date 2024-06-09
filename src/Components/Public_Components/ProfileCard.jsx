/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
export function ProfileCard({ item }) {
  return (
    <Card className="w-auto">
      <CardHeader floated={false}>
        <img
          src={item.photoURL}
          className="h-80 w-full object-cover"
          alt="profile-picture"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {item.name}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          {item.email}
        </Typography>
      </CardBody>
    </Card>
  );
}
