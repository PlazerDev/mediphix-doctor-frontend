import { Steps } from "antd";
import logo from "./../../../assets/images/mediphix.jpg";
import { useEffect, useState } from "react";
import Step1Card from "./Step1Card";
import Step2Card from "./Step2Card";
import Step3Card from "./Step3Card";

export interface UserData {
  name: string;
  slmcNumber: string;
  nic: string;
  education: string;
  mobileNumber: string;
  specialization: string;
  appointmentCategories: string[];
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUpCardBody() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  // State to store the data from all steps
  const [formData, setFormData] = useState<Partial<UserData>>({});

  function nextBtnHandler(stepData: Partial<UserData>) {
    setFormData((prevData) => ({
      ...prevData,
      ...stepData,
    }));
    setCurrentStep(currentStep + 1);
    console.log("Next Button Clicked");
  }

  function backBtnHandler() {
    setCurrentStep(currentStep - 1);
    console.log("Back Button Clicked");
  }

  return (
    <div className="bg-mediphix_card_background rounded-lg w-full px-8 mx-40">
      <div className="flex items-center justify-center">
        <img src={logo} alt="" className="w-24" />
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
        {currentStep === 0 && <Step1Card nextBtnHandler={nextBtnHandler} />}
        {currentStep === 1 && <Step2Card nextBtnHandler={nextBtnHandler} />}
        {currentStep === 2 && <Step3Card formData={formData} />}
      </div>
    </div>
  );
}

export default SignUpCardBody;
