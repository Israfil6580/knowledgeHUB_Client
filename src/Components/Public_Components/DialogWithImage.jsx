/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Card,
} from "@material-tailwind/react";
import { useState } from "react";

export function DialogWithImage({ item }) {
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
          className="h-60 w-full object-cover object-center"
          src={item}
        />
      </Card>
      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogBody>
          <img
            alt="nature"
            className="lg:h-[45rem] w-full rounded-lg object-cover object-center"
            src={item}
          />
        </DialogBody>
        <DialogFooter className="justify-between pt-0">
          <div className="flex items-center gap-2">
            <a href={item} target="_blank" download>
              <Button
                className="font-normal capitalize text-[15px] tracking-wide"
                color="gray"
              >
                Download
              </Button>
            </a>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}
