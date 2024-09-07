import { useState } from "react";
import { Divider } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const PatientRecord = () => {
  return (
    <>
      <div className="bg-[#FFFFFF] rounded-[16px] py-4 px-8 mx-4">
        <div>
          <h3 className="text-lg mb-3 font-semibold">Appointment Details</h3>
          <div className="grid grid-cols-5 gap-y-2 gap-x-4">
            <div>
              <p className="text-sm text-[#868686]">Reference Number</p>
              <p></p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Date</p>
              <p></p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Time Slot</p>
              <p></p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Medical Center</p>
              <p></p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Doctor</p>
              <p></p>
            </div>

            <div>
              <p className="text-sm text-[#868686]">Appointment Category</p>
              <p></p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Queue Number</p>
              <p></p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Session Start</p>
              <p></p>
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3 font-semibold">Patient Details</h3>
          <div className="grid grid-cols-5 gap-y-2 gap-x-4">
            <div>
              <p className="text-sm text-[#868686]">Patient Name</p>
              <p></p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Age</p>
              <p></p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Sex</p>
              <p></p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Nationality</p>
              <p></p>
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3 font-semibold">Symptoms</h3>
          <ul className="list-disc custom-disc-color"></ul>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3 font-semibold">Diagnosis</h3>
          <p className="text-sm text-[#868686]">Diagnosis Category</p>
          <p className="py-1 px-4 bg-[#DCDCDC] rounded-[8px] max-w-fit"></p>
          <p className="text-sm text-[#868686] mt-6">Detailed Diagnosis</p>
          <p></p>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3 font-semibold">Treatments</h3>
          <p className="text-sm text-[#868686]">Medications</p>
          <ul className="list-disc custom-disc-color"></ul>
          <p className="text-sm text-[#868686] mt-6">Procedures</p>
          <ul className="list-disc custom-disc-color"></ul>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3 font-semibold">Special Note</h3>
          <p></p>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3 font-semibold">Lab Report Details</h3>
          <div className="grid grid-cols-5 gap-y-2 gap-x-4">
            <div>
              <p className="text-sm text-[#868686]">Test Type</p>
              <p>Blood Test</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Test Name</p>
              <p>Complete Blood Count</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Priority Level</p>
              <p>Urgent</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientRecord;
