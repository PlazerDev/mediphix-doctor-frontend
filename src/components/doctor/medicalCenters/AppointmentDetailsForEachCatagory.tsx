import { Breadcrumb } from "antd";
import { useParams } from "react-router-dom";
import AppointmentCalendar from "./AppointmentCalendar";

const AppointmentDetailsForEachCatagory = () => {
    const { centerName, category } = useParams();
  return (
    <>
      <div>
        <p className="text-xl font-bold ml-[1%] mt-4">{centerName}</p>
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
              title: <a href="">{centerName}</a>,
            },
            {
              title: <a href="">{category}</a>,
            },
          ]}
        />
      </div>
      <AppointmentCalendar/>
    </>
  );
};

export default AppointmentDetailsForEachCatagory;
