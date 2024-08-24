import { GoDotFill } from "react-icons/go";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface AvailableCatagorySectionProps {
  centerName: string;
  appointmentCategory: string[];
}

const AvailableCatagorySection = ({
  centerName,
  appointmentCategory,
}: AvailableCatagorySectionProps) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(
      `/doctor/medicalcenters/mymedicalcenters/${centerName}/${category}`,
      {
        state: { centerName, category },
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl m-4 p-6">
      <div className="text-gray-900 ml-4">
        <h3 className="font-semibold">Available Categories</h3>
        <p className="mb-4 text-sm">Select one of the categories to proceed</p>
      </div>
      <div className="grid grid-cols-2 gap-4 ml-4">
        {appointmentCategory.map((category, index) => (
          <div
            key={index}
            className="flex col-span-1 cursor-pointer items-center"
            onClick={() => handleCategoryClick(category)}
          >
            <GoDotFill className="text-[10px] mr-2 mt-2" />
            <button className="flex underline w-1/2 text-left">
              {category}
            </button>
            <IoIosArrowDroprightCircle className="text-lg ml-2 mt-1 text-gray-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCatagorySection;
