import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
const AllMySession = () => {
  const [activeTab, setActiveTab] = useState("approved");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: ApprovedSession = [], refetch } = useQuery({
    queryKey: ["approved session"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/Created_Session/approved/${user?.email}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching session:", error);
        throw new Error("Failed to fetch session");
      }
    },
  });
  const { data: PendingSession = [] } = useQuery({
    queryKey: ["pending session"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/Created_Session/pending/${user?.email}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching session:", error);
        throw new Error("Failed to fetch session");
      }
    },
  });
  const { data: RejectedSession = [] } = useQuery({
    queryKey: ["rejected session"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/Created_Session/rejected/${user?.email}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching session:", error);
        throw new Error("Failed to fetch session");
      }
    },
  });
  const data = [
    {
      label: "Approved",
      value: "approved",
      desc: ApprovedSession,
      refetch,
    },
    {
      label: "Rejected",
      value: "rejected",
      desc: RejectedSession,
      refetch,
    },
    {
      label: "Pending",
      value: "pending",
      desc: PendingSession,
      refetch,
    },
  ];
  return (
    <div className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] rounded-2xl min-h-[calc(100vh-150px)] mt-2 p-6">
      <div>
        <h1 className="text-3xl font-black font-title">My Added Session</h1>
      </div>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none w-1/2 mx-auto border-b border-blue-gray-50 bg-transparent p-0"
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
            <TabPanel key={value} value={value}>
              {desc.map((item, index) => {
                return <h1 key={index}>{item.sessionTitle}</h1>;
              })}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default AllMySession;
