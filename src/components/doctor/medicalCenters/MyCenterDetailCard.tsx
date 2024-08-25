import { Link } from "react-router-dom";
import centerlogo from "../../../assets/images/medical-center/NawalokaHospitals.jpeg";

interface Center {
  name: string;
  address: string;
  appointmentCategory: string[];
  description: string;
  phoneNo: string;
}

const MyCenterdetailCard = ({
  name,
  address,
  appointmentCategory,
  description,
  phoneNo,
}: Center) => {
  const createDisplayString = (items: string[], maxLength: number) => {
    let displayString = "";
    let length = 0;
    let itemCount = 0;

    for (let item of items) {
      if (length + item.length > maxLength) break;
      displayString += (displayString ? ", " : "") + item;
      length += item.length + 2;
      itemCount++;
    }

    const remainingCount = items.length - itemCount;
    if (remainingCount > 0) {
      displayString += `, <span class="inline-flex items-center justify-center bg-[#868686] text-[#DCDCDC]  rounded-full w-6 h-6 text-sm font-bold ml-1">${remainingCount} </span> more`;
    }

    return displayString;
  };

  const maxLineLength = 150; // max length of items fit in one line
  const displayedCategories = createDisplayString(
    appointmentCategory,
    maxLineLength
  );

  return (
    <>
      <Link
        to={{
          pathname: "/doctor/medicalcenters/mymedicalcenters/" + name,
        }}
        state={{
          name,
          address,
          appointmentCategory,
          description,
          phoneNo,
        }}
      >
        <div className="bg-white rounded-2xl p-4 mx-1 mb-4">
          <div className="flex">
            <div className="flex items-center ml-8 mr-16 w-44">
              <img
                className="w-36 h-36 rounded-2xl object-contain"
                src={centerlogo}
                alt="Center Logo"
              />
            </div>
            <div className="w-full">
              <div className="flex flex-col mb-2">
                <p className="text-gray-500 text-sm">Name</p>
                <p>{name}</p>
              </div>
              <div className="flex flex-col mb-2">
                <p className="text-gray-500 text-sm">Location</p>
                <p>{address}</p>
              </div>

              <div className="flex gap-4 mb-2">
                <div>
                  <p className="text-gray-500 text-sm">
                    Appointment categories to which you are assigned
                  </p>
                  <p
                    dangerouslySetInnerHTML={{ __html: displayedCategories }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MyCenterdetailCard;