import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import DescriptiveCenterDetails from "./DescriptiveCenterDetails";
import AvailableCatagorySection from "./AvailableCatagorySection";

interface Center {
  name: string;
  address: string;
  appointmentCategory: string[];
  description: string;
  phoneNo: string;
}

const RegisteredCenter = () => {
  const location = useLocation();
  const { name, address, appointmentCategory, description, phoneNo } =
    location.state as Center;

  return (
    <>
      <div>
        <p className="text-xl font-bold ml-[1%] mt-4">{name}</p>
      </div>
      <div>
        <Breadcrumb
          className="ml-4"
          items={[
            {
              title: "Medical Centers",
            },
            {
              title: <a href="">My Medical Centers</a>,
            },
            {
              title: <a href="">{name}</a>,
            },
          ]}
        />
      </div>
      <DescriptiveCenterDetails
        name={name}
        address={address}
        description={description}
        phoneNo={phoneNo}
        registered={true}
      />
      <AvailableCatagorySection centerName={name} appointmentCategory={appointmentCategory} />
    </>
  );
};

export default RegisteredCenter;
