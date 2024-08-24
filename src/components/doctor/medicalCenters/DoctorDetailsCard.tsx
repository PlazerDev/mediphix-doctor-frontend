import doctorpic from "../../../assets/images/medical-center/doctorpic.jpeg";

interface DoctorDetailsCardProps {
    time: string;
    name: string;
    degree: string;
    speciality: string;
    doctorNote: string;
    centerNote: string;
  }
const DoctorDetailsCard = ({time,name,degree,speciality,doctorNote,centerNote}:DoctorDetailsCardProps) => {
  return (
    <>
      <div className="bg-[#DCDCDC] rounded-[16px] m-4">
        <div className=" flex justify-between">
          <div className=" text-[#FFFFFF] bg-[#363636] rounded-tl-lg rounded-br-lg p-3 w-fit flex items-center">
            <p className="mx-2">{time}</p>
          </div>
        </div>

        <div>
          <div className="text-[#363636]">
            <p className=" font-semibold ml-4 my-4">Doctor Details</p>
          </div>

          <div>
            <div className="flex justify">
              <div className="flex items-center justify-center">
                <img
                  className="w-28 h-28 rounded bg-contain ml-4 mr-12 mb-4 object-cover"
                  src={doctorpic}
                />
              </div>

              <div className="mr-20 w-1/3">
                <p className="text-[#868686] text-sm">Name</p>
                <a className="mb-2 text-[#FF7300] underline">{name}</a>

                <p className="text-[#868686] text-sm mt-2">Education</p>
                <p className="mb-1">
                  {degree} specialized in {speciality}
                </p>
              </div>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-[#363636]">
              <p className=" font-semibold mb-2">Additional Details</p>
            </div>
            <p className="text-[#868686] text-sm">Special Note From Doctor</p>
            <p>{doctorNote}</p>
          </div>
          <div className="ml-4 pb-4">
            <div className="text-[#363636]">
              <p className="text-[#868686] text-sm mt-2">
                Special Note From Medical Center
              </p>
            </div>
            <p>{centerNote}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDetailsCard;
