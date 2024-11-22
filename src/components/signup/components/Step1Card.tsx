import { Input } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";

interface userData {
  name: string;
  slmcNumber: string;
  nic: string;
  education: string;
  mobileNumber: string;
  specialization: string;
  appointmentCategories: string[];
}

function Step1Card() {
  const { formData, handleSubmit } = useForm<userData>();
  const onSubmit: SubmitHandler<userData> = (data) => console.log(data);

  return (
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //     <label>First Name</label>
    //     <input {...register("firstName")} />
    //     <label>Gender Selection</label>
    //     <select {...register("gender")}>
    //       <option value="female">female</option>
    //       <option value="male">male</option>
    //       <option value="other">other</option>
    //     </select>
    //     <input type="submit" />
    //   </form>
    <div className="pt-4">
      <p className="text-mediphix_text_c">
        Fill your information and press continue
      </p>
      <div>
        <div>
          <p>Name with Initials</p>
          <Input placeholder="Enter your name here " />
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Step1Card;
