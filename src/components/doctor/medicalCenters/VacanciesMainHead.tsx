import { Select } from "antd";
import { BsSendCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function VacanciesMainHead() {
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  return (
    <div>
      <div className="mt-4">
        <Link
          to={"/doctor/medicalcenters/mymedicalcenters/vacancies/requests"}
          className="bg-mediphix_accent hover:bg-[#ff8928] px-4 py-2 rounded-md text-white mt-4 mx-4"
        >
          My Requests
        </Link>
      </div>
      <div className="flex m-4 ">
        <input
          type="text"
          placeholder="Enter Medical Center Name Here"
          className="focus:outline-none placeholder:text-[var(--text-c)] flex-1 rounded-l-lg pl-2"
        />
        <button className="bg-[#FF7300] hover:bg-[#fe8420]  text-white rounded-r-lg ml-[0.1%] px-16 py-4">
          Search
        </button>
      </div>
      <div className="pl-4">
        <Select
          showSearch
          style={{ height: "50px", width: "25%" }}
          placeholder="Appointment Category"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          options={[
            {
              value: "opd",
              label: "OPD",
            },
            {
              value: "mental_health",
              label: "Mental Health",
            },
            {
              value: "dental",
              label: "Dental",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default VacanciesMainHead;
