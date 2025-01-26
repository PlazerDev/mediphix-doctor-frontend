import { Divider } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import PatentRecordEntryForm from "./PatentRecordEntryForm";
import defaultUserImage from "./../../../../assets/images/user.jpg";
import { CheckCircleFilled } from "@ant-design/icons";

interface RecordProps {
  onSubmit: any;
  patientData: any;
  appointmentData: any;
}

const PatientConsultationDataEntry = ({
  onSubmit,
  patientData,
  appointmentData,
}: RecordProps) => {
  return (
    <>
      <div className="flex flex-col bg-[#FFFFFF] rounded-[16px] w-4/5">
        <div className="p-4">
          <h2 className="font-bold">Appointment Details</h2>
          <div className="flex pt-4">
            <div>
              <p className="text-[#868686] text-xs w-64 mr-4">
                Reference Number
              </p>
              <p>{appointmentData.refNumber}</p>
            </div>
            <div>
              <p className="text-[#868686] text-xs">Payment status</p>
              <p>
                {appointmentData.paymentStatus === true ? (
                  <CheckCircleFilled className="mr-2 text-[#07950D]" />
                ) : null}
                {appointmentData.paymentStatus}
              </p>
            </div>
          </div>

          <Divider />

          <h2 className="font-bold mb-4">Patient Details</h2>
          <div className="grid grid-cols-5 gap-4 ">
            <div className="flex items-center ml-8 mr-16 w-44">
              <img
                className="w-24 h-24 rounded-full object-contain"
                src={defaultUserImage}
                alt="Patient Profile Picture"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#868686] text-xs">Patient Name</p>
              <p>{patientData.name}</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#868686] text-xs">Age</p>
              <p>{patientData.age}</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#868686] text-xs">Sex</p>
              <p>{patientData.sex}</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#868686] text-xs">Nationality</p>
              <p>{patientData.nationality}</p>
            </div>
          </div>
          <Link to="/doctor/sessions/ongoingsession/recordbook">
            <div className="flex justify-center bg-[#FF7300] rounded-[8px] align-middle p-2 text-[#FFFFFF] w-64 h-10 mt-4">
              <MdOutlineRemoveRedEye className="text-lg mr-1" />
              <p className="text-sm ">Investigate Record Book</p>
            </div>
          </Link>
        </div>
        <div className="bg-[#363636] text-center text-[#FFFFFF] font-bold py-2">
          Patient Consultation Data Entry
        </div>
        <div className="p-4">
          <PatentRecordEntryForm
            onSubmit={onSubmit}
            appoinmentNumber={appointmentData.refNumber}
          />
        </div>
      </div>
    </>
  );
};

export default PatientConsultationDataEntry;
