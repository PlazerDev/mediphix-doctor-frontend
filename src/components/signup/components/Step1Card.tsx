import { Controller, useForm } from "react-hook-form";
import { Button, Input, Select } from "antd";
import { UserData } from "./SignUpCardBody";

interface Props {
  nextBtnHandler: (data: Partial<UserData>) => void; // Updated prop type
}

function Step1Card({ nextBtnHandler }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    defaultValues: {
      appointmentCategories: [],
    },
  });

  const onSubmit = (data: UserData) => {
    nextBtnHandler(data);
  };

  return (
    <div className="pt-4">
      <p className="text-mediphix_text_c">
        Fill your information and press continue
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-4"
      >
        <div>
          <p>Name with Initials</p>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <Input
                className="h-12"
                placeholder="Enter your name here"
                {...field}
              />
            )}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <p>SLMC Registration Number</p>
            <Controller
              name="slmcNumber"
              control={control}
              rules={{ required: "SLMC Registration Number is required" }}
              render={({ field }) => (
                <Input
                  className="h-12"
                  placeholder="Enter registration number here"
                  {...field}
                />
              )}
            />
            {errors.slmcNumber && (
              <span className="text-red-500">{errors.slmcNumber.message}</span>
            )}
          </div>

          <div className="flex-1">
            <p>NIC</p>
            <Controller
              name="nic"
              control={control}
              rules={{ required: "NIC is required" }}
              render={({ field }) => (
                <Input className="h-12" placeholder="Enter NIC" {...field} />
              )}
            />
            {errors.nic && (
              <span className="text-red-500">{errors.nic.message}</span>
            )}
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <p>Education</p>
            <Controller
              name="education"
              control={control}
              rules={{ required: "Education is required" }}
              render={({ field }) => (
                <Input
                  className="h-12"
                  placeholder="Enter your education qualification here"
                  {...field}
                />
              )}
            />
            {errors.education && (
              <span className="text-red-500">{errors.education.message}</span>
            )}
          </div>

          <div className="flex-1">
            <p>Mobile Number</p>
            <Controller
              name="mobileNumber"
              control={control}
              rules={{
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number format",
                },
              }}
              render={({ field }) => (
                <Input
                  className="h-12"
                  placeholder="Enter Mobile Number"
                  {...field}
                />
              )}
            />
            {errors.mobileNumber && (
              <span className="text-red-500">
                {errors.mobileNumber.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <p>Specialization</p>
          <Controller
            name="specialization"
            control={control}
            rules={{ required: "Specialization is required" }}
            render={({ field }) => (
              <Input
                className="h-12"
                placeholder="Add your specializations here"
                {...field}
              />
            )}
          />
          {errors.specialization && (
            <span className="text-red-500">
              {errors.specialization.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <p>Supported Appointment Categories</p>
          <Controller
            name="appointmentCategories"
            control={control}
            rules={{ required: "At least one category is required" }}
            render={({ field }) => (
              <Select
                mode="multiple"
                className="h-12"
                size="large"
                placeholder="Please select one or more appointment categories"
                style={{ width: "100%" }}
                options={[
                  { value: "General", label: "General" },
                  { value: "Specialist", label: "Specialist" },
                  { value: "Surgery", label: "Surgery" },
                ]}
                {...field}
              />
            )}
          />
          {errors.appointmentCategories && (
            <span className="text-red-500">
              {errors.appointmentCategories.message}
            </span>
          )}
        </div>
        <div className="flex justify-end my-4">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-mediphix_accent hover:bg-[#ff841f] px-4 py-2 text-mediphix_card_background rounded-lg"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Step1Card;
