import { ScrollRestoration, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Typography,
} from "@material-tailwind/react";
import Container from "../Public_Components/Container";
import useAdmin from "../../Hooks/useAdmin";
import useTutor from "../../Hooks/useTutor";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Public_Components/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const SessionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: session = {}, refetch } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/session/${id}`);
        refetch();
        return res.data;
      } catch (error) {
        console.error("Error fetching session:", error);
        throw new Error("Failed to fetch session");
      }
    },
  });

  const [admin] = useAdmin();
  const [tutor] = useTutor();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const isRegistrationOver = new Date(session.RegEndDate) < new Date();

  return (
    <div className="py-32">
      <Container>
        <Card>
          <CardBody>
            <Typography
              variant="h3"
              color="blue-gray"
              className="mb-4 font-title font-black"
            >
              {session.sessionTitle}
            </Typography>
            <Typography className="text-lg font-normal mb-2">
              <strong>Tutor Name:</strong> {session.TutorName}
            </Typography>
            <Typography className="text-lg font-normal mb-2">
              <strong>Average Rating:</strong> {session.averageRating} / 5
            </Typography>
            <Typography className="text-lg font-normal mb-2">
              <strong>Session Description:</strong> {session.sessionDescription}
            </Typography>
            <Typography className="text-lg font-normal mb-2">
              <strong>Registration Start Date:</strong>{" "}
              {new Date(session.RegStartDate).toLocaleDateString()}
            </Typography>
            <Typography className="text-lg font-normal mb-2">
              <strong>Registration End Date:</strong>{" "}
              {new Date(session.RegEndDate).toLocaleDateString()}
            </Typography>
            <Typography className="text-lg font-normal mb-2">
              <strong>Class Start Date:</strong>{" "}
              {new Date(session.ClassStartDate).toLocaleDateString()}
            </Typography>
            <Typography className="text-lg font-normal mb-2">
              <strong>Class End Date:</strong>{" "}
              {new Date(session.ClassEndDate).toLocaleDateString()}
            </Typography>
            <Typography className="text-lg font-normal mb-2">
              <strong>Session Duration:</strong> {session.SessionDuration}{" "}
              months
            </Typography>
            <Typography className="text-lg font-normal mb-2">
              <strong>Registration Fee:</strong>{" "}
              {parseInt(session.RegistrationFee) === 0
                ? "Free"
                : `$${session.RegistrationFee}`}
            </Typography>
            <Button
              className="font-normal capitalize text-[14px]"
              disabled={isRegistrationOver || tutor || admin}
              onClick={handleOpen}
            >
              {isRegistrationOver ? "Registration Closed" : "Book Now"}
            </Button>
            <Dialog
              size="xs"
              open={open}
              className="bg-transparent shadow-none"
            >
              <Card className="mx-auto w-full">
                <CardBody className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <Typography
                      className="font-title text-2xl font-black"
                      variant="h4"
                      color="blue-gray"
                    >
                      {session.sessionTitle}
                    </Typography>
                    <Typography
                      className="font-title text-2xl font-black"
                      variant="h4"
                      color="blue-gray"
                    >
                      $ {session.RegistrationFee}
                    </Typography>
                  </div>

                  <Elements stripe={stripePromise}>
                    <CheckoutForm handleOpen={handleOpen} session={session} />
                  </Elements>
                </CardBody>
                <CardFooter className="pt-0 flex justify-end">
                  <Button
                    className="font-normal capitalize text-[14px]"
                    onClick={handleOpen}
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            </Dialog>
          </CardBody>
        </Card>
      </Container>
      <ScrollRestoration />
    </div>
  );
};

export default SessionDetails;
