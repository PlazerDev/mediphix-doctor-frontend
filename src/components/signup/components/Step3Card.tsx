import {Button} from "antd";
import CardTitleAndValue from "./CardTitleAndValue";
import {UserData} from "./SignUpCardBody";
import {useMutation, useQueryClient} from "@tanstack/react-query";

interface Props {
    formData: Partial<UserData>;
}

const handleSubmit = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => {

        }
    })
}

function Step3Card({formData}: Props) {
    return (
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
                    <CardTitleAndValue title="Email" value={formData.email}/>
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
                    <CardTitleAndValue title="NIC" value={formData.nic}/>
                    <CardTitleAndValue title="" value=""/>
                </div>
            </div>
            {/* Register Button */}
            <div className="flex justify-end">
                <Button
                    type="primary"
                    className="bg-mediphix_accent hover:bg-[#ff841f] px-4 py-2 text-mediphix_card_background rounded-lg"

                >
                    Register
                </Button>
            </div>
        </div>
    );
}

export default Step3Card;
