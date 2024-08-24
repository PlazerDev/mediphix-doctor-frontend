import { Breadcrumb } from "antd"
import { useLocation} from "react-router-dom";
import DescriptiveCenterDetails from "./DescriptiveCenterDetails";
import AvailableCatagorySection from "./AvailableCatagorySection";
import NotJoined from "./NotJoined";

interface Center {
    name: string;
    address: string;
    appointmentCategory: string[];
    noOfDoctors: number;
    description: string;
    phoneNo: string;
  }

const NotRegisteredCenter = () => {
  const location = useLocation();
  const { name, address, appointmentCategory, noOfDoctors, description, phoneNo } = location.state as Center;

  return (
    <>
    <div>
        <p className="text-xl font-bold ml-[1%] mt-4">
          {name}
        </p>
      </div>
      <div>
        <Breadcrumb
          className="ml-4"
          items={[
            {
              title: "Appointments",
            },
            {
              title: <a href="">Create an appointment</a>,
            },
            {
              title: <a href="">{name}</a>,
            },
          ]}
        />
      </div>
      <DescriptiveCenterDetails name={name} address={address} description={description} phoneNo={phoneNo} />
      <AvailableCatagorySection appointmentCategory={appointmentCategory}/>
      <NotJoined />
    </>
  )
}

export default NotRegisteredCenter