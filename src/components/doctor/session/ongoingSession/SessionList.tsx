import { Divider } from "antd";
import { useState } from "react";
import ReferenceNoCard from "./ReferenceNoCard";
const SessionList = () => {
  const [referenceNoList, setReferenceNoList] = useState([
    { refNo: "REF_1522", status: "previous" },
    { refNo: "REF_1523", status: "previous" },
    { refNo: "REF_1525", status: "current" },
    { refNo: "REF_1527", status: "upnext" },
    { refNo: "REF_1528", status: "upnext" },
  ]);
  return (
    <>
      <div className="flex flex-col w-1/5 ">
        <div className="flex flex-col items-center bg-[#363636] py-2 rounded-t-[16px] text-[#FFFFFF]">
          <p className="text-xl font-bold">03.14 PM</p>
          <p className="text-xs">2024 June 11</p>
        </div>
        <div className="flex flex-col rounded-b-[16px] p-4 bg-[#FFFFFF]">
          <div>
            <p className="text-[#868686] text-xs">Current Time Slot</p>
            <p className="text-[#363636] "></p>
            <p className="text-[#868686] text-xs">Status</p>
            <p className="text-[#363636]"></p>
          </div>
          <Divider />
          <div>
            <h2>Queue Details</h2>
            <p className="text-[#868686] text-xs"></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionList;
