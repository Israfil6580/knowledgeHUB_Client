import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
  Card,
} from "@material-tailwind/react";
import { useState } from "react";

export function DialogWithImage() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Card
        className="h-50 w-auto cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
        onClick={handleOpen}
      >
        <img
          alt="nature"
          className="h-full w-full object-cover object-center"
          src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
        />
      </Card>
      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogBody>
          <img
            alt="nature"
            className="lg:h-[45rem] w-full rounded-lg object-cover object-center"
            src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
          />
        </DialogBody>
        <DialogFooter className="justify-between pt-0">
          <div className="flex items-center gap-16">
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Views
              </Typography>
              <Typography color="blue-gray" className="font-bold">
                44,082,044
              </Typography>
            </div>
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Downloads
              </Typography>
              <Typography color="blue-gray" className="font-bold">
                553,031
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="font-normal capitalize text-[15px] tracking-wide"
              color="gray"
            >
              Download
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}
