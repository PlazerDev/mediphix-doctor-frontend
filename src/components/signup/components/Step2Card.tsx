import { Controller, useForm } from "react-hook-form";
import { UserData } from "./SignUpCardBody";
import { Input, Button } from "antd";
import IDUpload from "./IDUpload";
import DPUpload from "./DPUpload";

interface Props {
  nextBtnHandler: (data: Partial<UserData>) => void; // Updated prop type
}

function Step2Card({ nextBtnHandler }: Props) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserData>();

  const onSubmit = (data: Partial<UserData>) => {
    nextBtnHandler(data);
  };

  const password = watch("password"); // Watch password field for confirmation validation

  return (
    <div className="py-4">
      <p className="text-mediphix_text_c">
        Enter your email & upload required documents.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-4"
      >
        {/* Email Field */}
        <div>
          <p>Email</p>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <Input
                className="h-12"
                placeholder="Enter your email here"
                {...field}
              />
            )}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Password & Confirm Password Fields */}
        <div className="flex items-start gap-4">
          {/* Password */}
          <div className="flex-1">
            <p>Password</p>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <Input.Password
                  className="h-12"
                  placeholder="Enter your password"
                  {...field}
                />
              )}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex-1">
            <p>Confirm Password</p>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field }) => (
                <Input.Password
                  className="h-12"
                  placeholder="Confirm your password"
                  {...field}
                />
              )}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p>Enter your doctor ID</p>
            <IDUpload />
          </div>
          <div className="flex-2">
            <p>Enter a professional photo of you</p>
            <DPUpload />
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
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

export default Step2Card;
