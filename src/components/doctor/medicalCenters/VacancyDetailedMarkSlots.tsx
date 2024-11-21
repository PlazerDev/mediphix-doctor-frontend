import React, { useState } from "react";
import CardTitleAndValue from "../../CardTitleAndValue";
import { ConfigProvider, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

// Helper function to generate one-hour time slots
function generateTimeSlots(startTime: string, endTime: string) {
  const slots = [];
  let currentTime = parseFloat(startTime.replace(":", "."));
  const end = parseFloat(endTime.replace(":", "."));

  while (currentTime < end) {
    const nextTime = currentTime + 1;
    slots.push(
      `${currentTime.toFixed(2).replace(".", ":")} - ${nextTime
        .toFixed(2)
        .replace(".", ":")}`
    );
    currentTime = nextTime;
  }

  return slots;
}

function VacancyDetailedMarkSlots() {
  const [formData, setFormData] = useState<
    { id: string; data: { time: string; noOfPatients: number }[] }[]
  >([]);

  const vacancySlotDataObj = [
    {
      id: "1",
      startDate: "2024-12-01",
      endDate: "infinity",
      startTime: "08:00",
      endTime: "10:00",
      repetition: ["FRI", "SAT"],
      selectedDate: "",
    },
    {
      id: "2",
      startDate: "2024-11-20",
      endDate: "2024-11-21",
      startTime: "01:00",
      endTime: "03:00",
      repetition: [],
      selectedDate: "2024-11-21",
    },
  ];

  const handleInputChange = (id: string, time: string, value: number) => {
    setFormData((prevFormData) => {
      const existingEntry = prevFormData.find((entry) => entry.id === id);

      if (existingEntry) {
        const updatedData = existingEntry.data.map((slot) =>
          slot.time === time ? { ...slot, noOfPatients: value } : slot
        );

        if (!updatedData.some((slot) => slot.time === time)) {
          updatedData.push({ time, noOfPatients: value });
        }

        return prevFormData.map((entry) =>
          entry.id === id ? { ...entry, data: updatedData } : entry
        );
      } else {
        return [...prevFormData, { id, data: [{ time, noOfPatients: value }] }];
      }
    });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff7300",
          colorInfo: "#ff7300",
          borderRadius: 8,
        },
      }}
    >
      <div className="bg-mediphix_card_background mx-4 mt-4 p-8 rounded-lg">
        <p className="font-bold">
          Mark your preferred vacancy slots & enter required details
        </p>
        {vacancySlotDataObj.map((data) => {
          const timeSlots = generateTimeSlots(data.startTime, data.endTime);
          return (
            <div
              key={data.id}
              className="mt-4 border-2 border-mediphix_text_d rounded-lg p-4"
            >
              <div className="flex justify-between">
                <div className="w-60">
                  <CardTitleAndValue
                    title={"Start Date & End Date"}
                    value={"From " + data.startDate + " to " + data.endDate}
                  />
                </div>
                <div className="w-60">
                  <CardTitleAndValue
                    title={"Start Time & End Time"}
                    value={"From " + data.startTime + " to " + data.endTime}
                  />
                </div>
                <div className="w-60">
                  <CardTitleAndValue
                    title={"Repetition"}
                    value={
                      data.repetition.length !== 0
                        ? "Repeat weekly on " + data.repetition.join(", ")
                        : data.selectedDate
                    }
                  />
                </div>
              </div>
              <p className="font-semibold mt-4">
                Enter the number of patients you can take in each time slot
              </p>
              <div className="flex flex-col gap-2 mt-4">
                {timeSlots.map((slot, index) => (
                  <div key={index} className="flex">
                    <p className="w-32">{slot}</p>
                    <Input
                      type="number"
                      placeholder="Enter here"
                      className="w-32"
                      onChange={(e) =>
                        handleInputChange(
                          data.id,
                          slot,
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 bg-mediphix_card_background mx-4 p-8 rounded-md">
        <p className="font-semibold mb-2">Enter note for the patients</p>
        <TextArea rows={4} placeholder="Type here" />
      </div>
      <div className="flex flex-row justify-end my-4 mr-4">
        <button className="bg-mediphix_accent hover:bg-[#ff8928] px-4 py-2 rounded-md text-white">
          Submit the Request
        </button>
      </div>
    </ConfigProvider>
  );
}

export default VacancyDetailedMarkSlots;
