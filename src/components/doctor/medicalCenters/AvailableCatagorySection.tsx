import { GoDotFill } from "react-icons/go";
import { IoIosArrowDroprightCircle } from "react-icons/io";

interface AvailableCatagorySectionProps {
  appointmentCategory: string[];
}
const AvailableCatagorySection = ({
  appointmentCategory,
}: AvailableCatagorySectionProps) => {
  const renderCategory = (categories: string[]) =>
    categories.map((category, index) => (
      <div key={index} className={`flex col-span-1 `}>
        <GoDotFill className="text-[10px] mr-2 mt-2" />
        <a className="flex underline w-1/2">{category}</a>
        <IoIosArrowDroprightCircle className="text-lg ml-2 mt-1 text-[#868686]" />
      </div>
    ));

  return (
    <>
      <div className="bg-[#ffffff] rounded-[16px] m-4 p-6">
        <div className="text-[#363636] ml-4">
          <h3 className="font-semibold">Available Categories</h3>
          <p className="mb-4 text-sm">Select one of the category to proceed</p>
        </div>
        <div className="grid grid-cols-2 gap-4 ml-4">
          {renderCategory(appointmentCategory)}
        </div>
      </div>
    </>
  );
};

export default AvailableCatagorySection;
