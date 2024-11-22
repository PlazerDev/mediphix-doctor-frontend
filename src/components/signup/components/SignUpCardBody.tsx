import { Steps } from "antd";
import logo from "./../../../assets/images/mediphix.jpg";
import { useState } from "react";
import Step1Card from "./Step1Card";

function SignUpCardBody() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  return (
    <div className="bg-mediphix_card_background rounded-lg w-full p-8 mx-40">
      <div className="flex items-center justify-center">
        <img src={logo} alt="" className="w-20" />
      </div>
      <div>
        <Steps
          size="small"
          current={currentStep}
          items={[
            {
              title: "User Details",
            },
            {
              title: "Email & Documents",
            },
            {
              title: "Preview",
            },
          ]}
        />
      </div>
      <div>
        <Step1Card />
      </div>
    </div>
  );
}

export default SignUpCardBody;
