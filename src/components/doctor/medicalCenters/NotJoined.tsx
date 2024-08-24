import pic from "../../../assets/images/medical-center/notJoined.png";

const NotJoined = () => {
  return (
    <>
      <div className="bg-[#ffffff] rounded-[16px] m-4 p-6">
        <div className="text-[#363636] ml-4">
          <h3 className="font-semibold">Your Schedule At Asiri Hospital</h3>
        </div>
        <div className="flex flex-col items-center mt-4">
          <img src={pic} className="w-28 h-28" />
          <h1 className="font-bold text-lg mt-4">
            You haven’t join the medical center yet!
          </h1>
          <p className="w-1/2">
            You cannot view schedule details until you join a medical center.
            Once you make a request and it is accepted by the medical center
            admin, you will be able manage your schedules here.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotJoined;
