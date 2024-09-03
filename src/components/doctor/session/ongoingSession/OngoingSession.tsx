import { Breadcrumb } from "antd";
import PatientConsultationDataEntry from "./PatientConsultationDataEntry";
import SessionList from "./SessionList";
import BottomButtonPanel from "./BottomButtonPanel";

const OngoingSession = () => {
  return (
    <>
      <div>
        <p className="text-xl font-bold ml-[1%] mt-[1%]">
          Ongoing Session Portal | At Nawaloka Hospital | Time Frame 03.00 PM -
          05.00 PM
        </p>
      </div>
      <div>
        <Breadcrumb
          className="ml-[1%]"
          items={[
            {
              title: "Sessions",
            },
            {
              title: "Ongoing Sessions",
            },
          ]}
        />
      </div>
      <div className="m-4 flex gap-4">
        <SessionList />
        <PatientConsultationDataEntry />
      </div>
      <BottomButtonPanel />
    </>
  );
};

export default OngoingSession;
