import { Collapse, CollapseProps } from "antd";

function FAQ() {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <p className="font-semibold">
          How can the platform help manage my schedule efficiently?
        </p>
      ),
      children:
        "Our platform allows you to easily manage your daily schedule, track appointments, and set availability, ensuring you never miss a patient.",
    },
    {
      key: "2",
      label: (
        <p className="font-semibold">
          Can I view patient records during appointments?
        </p>
      ),
      children:
        "Yes, as a doctor, you can access detailed patient records during appointments, allowing for more informed decision-making and personalized care.",
    },
    {
      key: "3",
      label: (
        <p className="font-semibold">
          How does the system streamline patient flow and reduce wait times?
        </p>
      ),
      children:
        "The system enables real-time tracking of patient appointments, automates queue management, and allocates resources efficiently to reduce wait times.",
    },
    {
      key: "4",
      label: (
        <p className="font-semibold">
          Can I manage my patient's follow-up appointments through the platform?
        </p>
      ),
      children:
        "Yes, you can easily schedule and track follow-up appointments, ensuring consistent care and timely treatment for your patients.",
    },
  ];

  return (
    <div>
      <p className="text-center font-bold text-3xl mb-8">
        Frequently Asked Questions for Doctors
      </p>
      <div>
        <Collapse
          style={{ backgroundColor: "transparent" }}
          items={items}
          bordered={false}
          defaultActiveKey={["1"]}
        />
      </div>
    </div>
  );
}

export default FAQ;
