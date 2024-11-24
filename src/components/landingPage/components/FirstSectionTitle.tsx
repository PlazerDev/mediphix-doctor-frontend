import BtnFilled from "./BtnFilled";

function FirstSectionTitle() {
  return (
    <div className="flex flex-col jutify-center items-center gap-4 pt-8">
      <p className="font-bold text-4xl text-white">
        Welcome to Mediphix for Doctors
      </p>
      <p className="text-center text-white">
        Simplify Your Practice Management with Seamless Tools,Comprehensive
        Patient Histories, and Improved Diagnostics
      </p>
      <BtnFilled
        title="Join Now"
        style="bg-mediphix_accent hover:bg-white text-white hover:text-mediphix_accent"
      />
    </div>
  );
}

export default FirstSectionTitle;
