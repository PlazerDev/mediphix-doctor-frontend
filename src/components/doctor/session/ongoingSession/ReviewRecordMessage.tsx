import { ExclamationCircleFilled } from "@ant-design/icons";
import PatientRecord from "./PatientRecord";

const ReviewRecordMessage = () => {
  return (
    <>
      <div className="text-center p-6 m-4 bg-[#ffffff] rounded-lg">
        <h1 className="font-bold text-xl">Review and Confirm Session Details</h1>
        <p>
          Please review all entered details carefully. Press 'Submit Record and
          End Session' to finalize.
        </p>
        <p className="text-[#868686]"><ExclamationCircleFilled className="text-[#868686] mr-1"/>Note that this action cannot be reversed</p>
      </div>
      <PatientRecord/>
    </>
  );
};

export default ReviewRecordMessage;
