import { useState } from "react";
import { Divider } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const SessionDetails = () => {
  const [data, setData] = useState({
    appointmentDetails: {
      referenceNumber: "REF_1598",
      date: "2024/June/13",
      timeSlot: "03.00 PM - 04.00 PM",
      queueNumber: "03",
      medicalCenter: "Aloka Medical Center",
      appointmentCategory: "OPD",
      sessionStart: "03.27 PM",
      sessionEnd: "03.41 PM",
    },
    patientDetails: {
      patientName: "Vishawa Sadaruwan",
      Age: "25",
      Sex: "Male",
      Nationality: "LK",
    },

    labDetails: {
      testType: "Blood Test",
      testName: "Lipid Profile",
      priorityLevel: "High",
      labStatus: "Pending",
    },
    symptoms: ["Chest pain", "Shortness of breath", "Fatigue"],
    diagnosis: {
      category: "Cardiology",
      details: "Myocardinal Infarction (Heart Attack)",
    },
    treatments: {
      medications: [
        "Aspirin 81 mg, once daily",
        "Nitroglycerin 0.4 mg, as needed for chest pain",
        "Beta-blocker (Metoprolol) 50 mg, twice daily",
      ],
      procedures: ["Scheduled for follow-up consultation"],
    },
    specialNote:
      "Avoid strenuous activities until further notice. Schedule a follow-up appointment in two weeks to review progress and adjust medications if necessary. Patient advised to seek immediate medical attention if chest pain persists or worsens.",
  });

  return (
    <div>
      <div>
        <p className="text-xl font-bold ml-[1%] mt-[1%]">
          Session - {data.appointmentDetails.date} at{" "}
          {data.appointmentDetails.sessionStart}
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
              title: <a href="">Previous Sessions</a>,
            },
            {
              title: <a href=""> {data.appointmentDetails.referenceNumber}</a>,
            },
          ]}
        />
      </div>

      <div className="bg-[#FFFFFF] rounded-[16px] py-[3%] px-[3%] ml-2 mr-2 mt-2">
        <div>
          <h3 className="text-lg mb-3">Appointment Details</h3>
          <div className="grid grid-cols-5 gap-y-2 gap-x-4">
            <div>
              <p className="text-sm text-[#868686]">Reference Number</p>
              <p>{data.appointmentDetails.referenceNumber}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Date</p>
              <p>{data.appointmentDetails.date}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Time Slot</p>
              <p>{data.appointmentDetails.timeSlot}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Medical Center</p>
              <p className="text-sm text-[#FFA500]">
                <a
                  href="#"
                  style={{ color: "#FFA500", textDecoration: "underline" }}
                >
                  {data.appointmentDetails.medicalCenter}
                </a>
              </p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Queue Number</p>
              <p>{data.appointmentDetails.queueNumber}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Appointment Category</p>
              <p>{data.appointmentDetails.appointmentCategory}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Session Start</p>
              <p>{data.appointmentDetails.sessionStart}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Session End</p>
              <p>{data.appointmentDetails.sessionEnd}</p>
            </div>
          </div>
        </div>
        <Divider />

        <div className="bg-[#FFFFFF] rounded-[16px]  ml-1 mr-1 mt-2">
          <div>
            <h3 className="text-lg mb-3 ">Patient Details</h3>
            <div className="grid grid-cols-5 gap-y-2 gap-x-4">
              <div>
                <p className="text-sm text-[#868686]">Patient Name</p>
                <p>{data.patientDetails.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-[#868686]">Age</p>
                <p>{data.patientDetails.Age}</p>
              </div>
              <div>
                <p className="text-sm text-[#868686]">Sex</p>
                <p>{data.patientDetails.Sex}</p>
              </div>
              <div>
                <p className="text-sm text-[#868686]">Nationality</p>
                <p>{data.patientDetails.Nationality}</p>
              </div>
              <Link to="/doctor/sessions/recordbook">
                <div className="flex justify-center bg-[#FF7300] rounded-[8px] align-middle p-2 text-[#FFFFFF]  w-[90%] h-10">
                  <MdOutlineRemoveRedEye className="text-lg mr-1" />
                  <p className="text-sm ">Investigate Record Book</p>
                </div>
              </Link>

              <div className="mt-2">
                <Divider />
                <h3 className="text-lg mb-3 ">Symptoms</h3>
                <ul className="list-disc custom-disc-color ml-5">
                  {data.symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3">Diagnosis</h3>
          <p className="text-sm text-[#868686]">Diagnosis Category</p>
          <p className="py-1 px-4 bg-[#DCDCDC] rounded-[8px] max-w-fit">
            {data.diagnosis.category}
          </p>
          <p className="text-sm text-[#868686] mt-2">Detailed Diagnosis</p>
          <p>{data.diagnosis.details}</p>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3">Treatments</h3>
          <p className="text-sm text-[#868686]">Medications</p>
          <ul className="list-disc custom-disc-color">
            {data.treatments.medications.map((medication, index) => (
              <li key={index}>{medication}</li>
            ))}
          </ul>
          <p className="text-sm text-[#868686] mt-2">Procedures</p>
          <ul className="list-disc custom-disc-color">
            {data.treatments.procedures.map((procedure, index) => (
              <li key={index}>{procedure}</li>
            ))}
          </ul>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3 ">Special Note</h3>
          <p>{data.specialNote}</p>
        </div>

        <Divider />
        <div className="mt-2">
          <h3 className="text-lg mb-3 ">Lab Report Details</h3>
          <div className="grid grid-cols-5 gap-y-2 gap-x-4">
            <div>
              <p className="text-sm text-[#868686]">Test Type</p>
              <p>{data.labDetails.testType}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Test Name</p>
              <p>{data.labDetails.testName}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Priority Level</p>
              <p>{data.labDetails.priorityLevel}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Status</p>
              <p>{data.labDetails.labStatus}</p>
            </div>
            <div className="flex bg-[#FF7300] rounded-[8px] align-middle p-3 text-[#FFFFFF]  w-[80%] h-10">
              <MdOutlineRemoveRedEye className="text-lg mr-1" />
              <p className="text-sm ">View the report</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
