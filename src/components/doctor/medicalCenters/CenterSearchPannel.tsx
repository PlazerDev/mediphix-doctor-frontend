import { Select } from "antd";

const onChange = (value: string) => {
  console.log("selected ${value}");
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

const CenterSearchPannel = () => {
  return (
    <>
      <div className="flex m-4 ">
        <input
          type="text"
          placeholder="Enter Doctor Name Here"
          className="focus:outline-none placeholder:text-[var(--text-c)] w-[80%] rounded-l-lg pl-8"
        />
        <button className="bg-[#FF7300] text-white rounded-r-lg ml-[0.1%] w-96 pl-[1%] p-4">
          Search
        </button>
      </div>

      <div className="flex gap-4 ml-[1%] mt-[1%] mb-[1%] mr-[1%]">
    
        <Select
          showSearch
          placeholder="Appointment Category"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          style={{ height: "50px", width: "25%" }}
          options={[]}
        />

        <Select
          showSearch
          placeholder="Location"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          style={{ height: "50px", width: "25%" }}
          options={[]}
        />
      </div>
    </>
  );
};

export default CenterSearchPannel;
