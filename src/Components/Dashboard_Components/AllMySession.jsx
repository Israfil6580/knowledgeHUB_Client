import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const AllMySession = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("approved");

  const { data: ApprovedSession, refetch: refetchApproved } = useQuery({
    queryKey: ["approved session"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/Created_Session/approved/${user?.email}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching approved sessions:", error);
        throw new Error("Failed to fetch approved sessions");
      }
    },
  });

  const { data: PendingSession, refetch: refetchPending } = useQuery({
    queryKey: ["pending session"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/Created_Session/pending/${user?.email}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching pending sessions:", error);
        throw new Error("Failed to fetch pending sessions");
      }
    },
  });

  const { data: RejectedSession, refetch: refetchRejected } = useQuery({
    queryKey: ["rejected session"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/Created_Session/rejected/${user?.email}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching rejected sessions:", error);
        throw new Error("Failed to fetch rejected sessions");
      }
    },
  });

  useEffect(() => {
    refetchApproved();
    refetchPending();
    refetchRejected();
  }, [refetchApproved, refetchPending, refetchRejected]);

  const AgainRequest = async (id) => {
    try {
      await axiosSecure.put(`/Created_Session/New_Request/${id}`, {
        Status: "Pending",
      });
      toast.success("Request Successful");
    } catch (error) {
      console.error("Error updating session status:", error);
    }
  };

  const data = [
    {
      label: "Approved",
      value: "approved",
      desc: ApprovedSession || [],
    },
    {
      label: "Rejected",
      value: "rejected",
      desc: RejectedSession || [],
    },
    {
      label: "Pending",
      value: "pending",
      desc: PendingSession || [],
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] rounded-2xl min-h-[calc(100vh-150px)] mt-2 p-6">
      <div>
        <h1 className="text-3xl font-black font-title pb-4">
          My Added Session
        </h1>
      </div>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none lg:w-1/2 mx-auto border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={activeTab === value ? "text-gray-900" : ""}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel
              className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-0"
              key={value}
              value={value}
            >
              {desc.map((item, index) => (
                <Card key={index} className="mt-6 w-auto">
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {item.sessionTitle}
                    </Typography>
                    <Typography>{item.sessionDescription}</Typography>
                  </CardBody>
                  <CardFooter className="pt-0 flex justify-between">
                    <Button
                      className="text-[15px] font-normal capitalize"
                      disabled
                    >
                      {item.Status}
                    </Button>
                    {item.Status === "Rejected" && (
                      <Button
                        onClick={() => AgainRequest(item._id)}
                        className="text-[15px] font-normal capitalize"
                      >
                        Request
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default AllMySession;
