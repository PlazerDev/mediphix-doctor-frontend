import { Link } from "react-router-dom";

const BottomButtonPanel = () => {
  return (
    <>
      <div className="grid justify-items-end text-[#FFFFFF] m-4 ">
        <div>
          <button className="bg-[#868686] p-3 w-64 mr-4 rounded-[16px] ">
            Discard
          </button>
          <Link to="/doctor/sessions/ongoingsession/reviewrecord">
            <button className=" bg-[#FF7300] p-3 w-56 rounded-[16px]">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomButtonPanel;
