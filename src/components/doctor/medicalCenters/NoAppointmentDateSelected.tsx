import image from "../../../assets/images/medical-center/notSelectedDate.png";

const NoAppointmentDateSelected = () => {
  return (
    <>
      <div className="mt-8 flex flex-col items-center">
        <img src={image} className="h-72 " />
        <div className="text-center max-w-lg">
          <p className="text-[#151515] font-semibold text-lg">
            You haven’t select any date yet.
          </p>
          <p className="text-[#868686]">
            Select a date from the calendar to view all available appointments
            for that day.
          </p>
        </div>
      </div>
    </>
  );
};

export default NoAppointmentDateSelected;
