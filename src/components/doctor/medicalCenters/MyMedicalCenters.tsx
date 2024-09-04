import { useState } from "react";
import CenterSearchPannel from "./CenterSearchPannel";
import { Breadcrumb } from "antd";
import MyCenterdetailCard from "./MyCenterDetailCard";

interface Center {
  name: string;
  address: string;
  appointmentCategory: string[];
  description: string;
  phoneNo: string;
}

const MyMedicalCenters = () => {
  const [centerList, setCenterList] = useState<Center[]>([
    {
      name: "Nawaloka Hospital",
      address: "23 , Deshamanya H K Dharmadasa Mawatha, Colombo 00200",
      appointmentCategory: ["OPD", "Heart Health", "Dental Care"],
      description:
        "At Navaloka Hospital, we provide top-notch healthcare with a patient-focused approach. Our expert team and advanced facilities ensure the best care for all your medical needs. Trust us for your health and well-being.",
      phoneNo: "011-4564564",
    },
    {
      name: "Asiri Hospital",
      address: "23 , Deshamanya H K Dharmadasa Mawatha, Colombo 00200",
      appointmentCategory: ["OPD", "Heart Health"],
      description:
        "At Asiri Hospital, we provide top-notch healthcare with a patient-focused approach. Our expert team and advanced facilities ensure the best care for all your medical needs. Trust us for your health and well-being.",
      phoneNo: "011-4564564",
    },
  ]);

  return (
    <>
      <div>
        <p className="text-xl font-bold ml-[1%] mt-[1%]">My Medical Centers</p>
      </div>
      <div>
        <Breadcrumb
          className="ml-[1%]"
          items={[
            {
              title: "Medical Center",
            },
            {
              title: <a href="">My Medical Centers</a>,
            },
          ]}
        />
      </div>
      <CenterSearchPannel />
      <div>
        {centerList.map((list, index) => (
          <div key={index}>
            <MyCenterdetailCard {...list} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyMedicalCenters;
