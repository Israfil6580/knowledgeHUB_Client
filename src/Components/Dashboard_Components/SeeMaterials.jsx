import { DialogWithImage } from "../Public_Components/DialogWithImage";
import { Button } from "@material-tailwind/react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const SeeMaterials = () => {
  const { sessionId } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: materials = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["materials", sessionId],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/seeMaterials/${sessionId}`);
        refetch();
        return res.data;
      } catch (error) {
        console.error("Error fetching materials:", error);
        throw new Error("Failed to fetch materials");
      }
    },
  });
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching materials.</div>;
  }
  const sessionTitle =
    materials.length > 0 ? materials[0].SessionTitle : "No Title";
  const TutorEmail =
    materials.length > 0 ? materials[0].TutorEmail : "No email";
  return (
    <div className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] rounded-2xl min-h-[calc(100vh-150px)] mt-2 p-6">
      <div>
        <div className="flex justify-between items-start mb-5">
          <div>
            <h1 className="text-3xl font-black font-title">Resources</h1>
            <p className="text-sm">All resources from this session</p>
          </div>
          <div className="flex flex-col items-end">
            <h1 className="font-title font-black text-xl">{sessionTitle}</h1>
            <h1 className="text-sm">{TutorEmail}</h1>
          </div>
        </div>
        {materials.map((item, index) => (
          <div key={index}>
            <div className="mb-10">
              <h1 className="font-black font-title text-2xl mb-4">
                {item.MaterialTitle}
              </h1>
              <div className="grid grid-cols-3 gap-4">
                {item.PhotoURLs.map((item, index) => (
                  <DialogWithImage key={index} item={item} />
                ))}
              </div>
            </div>
            <div>
              <div className="flex gap-3 pb-10">
                {item.GoogleDriveLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-green-400 text-[15px] font-normal capitalize">
                      Important Link {index + 1}
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeMaterials;
