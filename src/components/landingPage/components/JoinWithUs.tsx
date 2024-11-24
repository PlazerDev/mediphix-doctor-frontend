import BtnFilled from "./BtnFilled";

function JoinWithUs() {
  return (
    <div className="flex flex-col justify-center items-center bg-black text-white p-8 rounded-lg">
      <p className="text-center font-bold text-2xl">
        Ready to Enhance Your Practice?
      </p>
      <p className="text-center text-mediphix_background my-4">
        Join our network and streamline your practice with our Medical Center
        Management Portal. Optimize your schedule, improve patient care, and
        experience seamless operations.
      </p>
      <div className="w-32">
        <BtnFilled
          title="Join Now"
          style="bg-mediphix_accent hover:bg-white text-white hover:text-black"
        />
      </div>
    </div>
  );
}

export default JoinWithUs;
