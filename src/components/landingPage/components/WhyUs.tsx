import BtnFilled from "./BtnFilled";

function WhyUs() {
  return (
    <div className="flex flex-col justify-center items-center bg-mediphix_text_a text-white p-8 rounded-lg">
      <p className="text-center font-bold text-2xl ">Why Us?</p>
      <p className="text-center text-mediphix_background my-4">
        Our platform empowers doctors with efficient schedule management,
        real-time patient updates, and streamlined communication. Reduce
        administrative tasks and focus on providing exceptional care. Enjoy
        secure, customizable tools that improve patient experience and optimize
        medical center operations. Join us for smarter, seamless healthcare
        management.
      </p>
      <div className="w-32">
        <BtnFilled
          title="Join Now"
          style="bg-[#e8e8e8] text-black hover:bg-white "
        />
      </div>
    </div>
  );
}

export default WhyUs;
