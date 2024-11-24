import { Select, Space, TimePicker, DatePicker } from "antd";
const { RangePicker } = DatePicker;

const onChange = (value: string) => {
  console.log("selected ${value}");
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

const CenterSearchBar = () => {
  return (
    <>
      <div className="flex m-4 ">
        <input
          type="text"
          placeholder="Enter Medical Center Name Here"
          className="focus:outline-none placeholder:text-[var(--text-c)] w-[80%] rounded-l-lg pl-8"
        />
        <button className="bg-[#FF7300] text-white rounded-r-lg ml-[0.1%] w-96 pl-[1%] p-4">
          Search
        </button>
      </div>

      <div className="flex ml-[1%] mt-[1%] mb-[1%] mr-[1%]]">
        <Space direction="vertical" size={15}>
          <RangePicker style={{ height: "50px" }} />
        </Space>

        <TimePicker.RangePicker
          style={{ marginLeft: "20px", width: "300px" }}
        />

        <div style={{ marginLeft: "20px" }}></div>

        <Select
          showSearch
          placeholder="Appointment Category"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          style={{ height: "50px", width: "300px" }}
          options={[]}
        />
        <div style={{ marginLeft: "20px" }}></div>
        <Select
          showSearch
          placeholder="Diagnosis Category"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          style={{ height: "50px", width: "300px" }}
          options={[]}
        />
      </div>
    </>
  );
};

export default CenterSearchBar;
