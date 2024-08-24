import { useState } from "react";
import CenterDetailCard from "./CenterDetailCard";
import CenterSearchPannel from "./CenterSearchPannel";
import { Breadcrumb } from "antd";

interface Center {
  name: string;
  address: string;
  appointmentCategory: string[];
  noOfDoctors: number;
  description: string;
  phoneNo: string;
}

const AllMedicalCenters = () => {
  const [centerList, setCenterList] = useState<Center[]>([
    {
      name: "Nawaloka Hospital",
      address: "23 , Deshamanya H K Dharmadasa Mawatha, Colombo 00200",
      appointmentCategory: [
        "OPD",
        "Heart Health",
        "Dental Care",
        "Pediatrics",
        "Gynecology",
        "Mental Health",
        "Gastroenterology",
        "Urology",
        "Ophthalmology ",
        "Neurology",
        "Psychiatry",
        "Cardiology",
        "Dermatologist",
        "ENT",
        "Orthopedics",
        "Radiology",
      ],
      noOfDoctors: 33,
      description:
        "At Navaloka Hospital, we provide top-notch healthcare with a patient-focused approach. Our expert team and advanced facilities ensure the best care for all your medical needs. Trust us for your health and well-being.",
      phoneNo: "011-4564564",
    },
    {
      name: "Asiri Hospital",
      address: "23 , Deshamanya H K Dharmadasa Mawatha, Colombo 00200",
      appointmentCategory: [
        "OPD",
        "Heart Health",
        "Dental Care",
        "Pediatrics",
        "Gynecology",
      ],
      noOfDoctors: 15,
      description:
        "At Asiri Hospital, we provide top-notch healthcare with a patient-focused approach. Our expert team and advanced facilities ensure the best care for all your medical needs. Trust us for your health and well-being.",
      phoneNo: "011-4564564",
    },
  ]);
  return (
    <>
      <div>
        <p className="text-xl font-bold ml-[1%] mt-[1%]">
          All Medical Centers
        </p>
      </div>
      <div>
        <Breadcrumb
          className="ml-[1%]"
          items={[
            {
              title: "Medical Center",
            },
            {
              title: <a href="">All Medical Centers</a>,
            },
          ]}
        />
      </div>
      <CenterSearchPannel />
      <div>
        {centerList.map((list, index) => (
          <div
            key={index}
            className="cursor-pointer"
            // onClick={() => handleItemClick(list)}
          >
            <CenterDetailCard {...list} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AllMedicalCenters;
