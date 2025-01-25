import { Button } from "antd";
import CardTitleAndValue from "./CardTitleAndValue";
import { UserData } from "./SignUpCardBody";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DoctorService } from "../../../services/DoctorService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../../Loading";

interface Props {
  formData: Partial<UserData>;
}

function Step3Card({ formData }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // const queryClient = useQueryClient();
    // const mutation = useMutation({
    //     mutationFn: () => {
    //     }
    // })
    setIsLoading(true);
    DoctorService.regDoctor(data, navigate, setIsLoading);
    console.log(data);
  };
  return (
    <>
      {!isLoading && (
        <div className="py-4">
          <p className="text-mediphix_text_c">
            Here is a preview of the details you have been entered.
          </p>
          <div className="flex flex-col gap-2 my-4">
            <div className="flex justify-between">
              <CardTitleAndValue
                title="Name With Initials"
                value={"Dr. " + formData.name}
              />
              <CardTitleAndValue title="Email" value={formData.email} />
              <CardTitleAndValue
                title="Mobile Number"
                value={formData.mobileNumber}
              />
            </div>
            <div className="flex justify-center">
              <CardTitleAndValue
                title="Education Qualifications"
                value={formData.education}
              />
              <CardTitleAndValue
                title="Specialization"
                value={formData.specialization}
              />
              <CardTitleAndValue
                title="Supported Appointment Categories"
                value={formData.appointmentCategories?.join(", ")}
              />
            </div>
            <div className="flex justify-center">
              <CardTitleAndValue
                title="SLMC Registration Number"
                value={formData.slmcNumber}
              />
              <CardTitleAndValue title="NIC" value={formData.nic} />
              <CardTitleAndValue title="" value="" />
            </div>
          </div>
          {/* Register Button */}
          <div className="flex justify-end">
            <Button
              type="primary"
              className="bg-mediphix_accent hover:bg-[#ff841f] px-4 py-2 text-mediphix_card_background rounded-lg"
              onClick={() => {
                handleSubmit(formData);
              }}
            >
              Register
            </Button>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <Loading footer={true} />
        </div>
      )}
    </>
  );
}

export default Step3Card;
