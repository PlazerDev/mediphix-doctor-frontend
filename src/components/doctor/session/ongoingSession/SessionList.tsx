/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircleFilled } from "@ant-design/icons";
import { Divider } from "antd";
import { useEffect, useState } from "react";


const SessionList = (props: any) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const date = now.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
      setCurrentTime(time);
      setCurrentDate(date);
    };

    updateTimeAndDate();
    const timer = setInterval(updateTimeAndDate, 60000);

    return () => clearInterval(timer);
  }, []);

  const renderRefNoList = (status: string) => {
    return props.appointmentDetails
      .filter((ref: any) => ref.status === status)
      .map((ref: any) => (
        <div
          key={ref.refNo}
          className={`relative flex p-2 my-2 rounded-md cursor-pointer ${
            status === "current" ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
        >
          <div
            className={`flex w-7 h-7 rounded-md mr-4 items-center justify-center ${
              status === "current" ? "bg-[#FFFFFF] text-[#363636]" : "bg-[#868686] text-white"
            }`}
          >
            {ref.queueNo}
          </div>

          {ref.refNo}
          <div className="text-[#868686] ml-6 absolute right-4">
            {status === "previous" ? <CheckCircleFilled /> : null}
          </div>
        </div>
      ));
  };

  return (
    <>
      <div className="flex flex-col w-1/5">
        <div className="flex flex-col items-center bg-[#363636] py-2 rounded-t-[16px] text-[#FFFFFF]">
          <p className="text-xl font-bold">{currentTime}</p>
          <p className="text-xs">{currentDate}</p>
        </div>
        <div className="flex flex-col rounded-b-[16px] p-4 bg-[#FFFFFF]">
          <div>
            <p className="text-[#868686] text-xs">Current Time Slot</p>
          </div>
          <Divider />
          <div>
            <h2>Queue Details</h2>
            <div>
              <h3 className="text-[#868686] text-xs">Previous</h3>
              {renderRefNoList("previous")}
            </div>
            <div>
              <h3 className="text-[#868686] text-xs">Current</h3>
              {renderRefNoList("current")}
            </div>
            <div>
              <h3 className="text-[#868686] text-xs">Up next</h3>
              {renderRefNoList("upnext")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionList;


