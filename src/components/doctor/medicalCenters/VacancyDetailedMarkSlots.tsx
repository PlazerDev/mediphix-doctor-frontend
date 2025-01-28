/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import CardTitleAndValue from "../../CardTitleAndValue";
import { ConfigProvider, Input, Switch, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios, { AxiosRequestConfig } from "axios";
import TokenService from "../../../services/TokenService";

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

function VacancyDetailedMarkSlots(props: any) {
  const sessionVacancyId = props.vacacncyId;
  const openSessions = props.openSessions;

  const [formData, setFormData] = useState<
    { id: string; data: { time: string; noOfPatients: number }[] }[]
  >([]);

  const [switchStates, setSwitchStates] = useState(
    openSessions.reduce((acc: Record<string, boolean>, item: any) => {
      acc[item.sessionId] = true; // Enable all cards by default
      return acc;
    }, {})
  );

  const [noteToPatient, setNoteToPatient] = useState("");
  const [vacancyNoteToCenter, setVacancyNoteToCenter] = useState("");

  const vacancySlotDataObj = openSessions.map((item: any) => ({
    id: item.sessionId.toString(),
    startDate: `${item.rangeStartTimestamp.year}-${String(
      item.rangeStartTimestamp.month
    ).padStart(2, "0")}-${String(item.rangeStartTimestamp.day).padStart(
      2,
      "0"
    )}`,
    endDate: item.rangeEndTimestamp.year
      ? `${item.rangeEndTimestamp.year}-${String(
          item.rangeEndTimestamp.month
        ).padStart(2, "0")}-${String(item.rangeEndTimestamp.day).padStart(
          2,
          "0"
        )}`
      : "infinity",
    startTime: `${String(item.startTime.hour).padStart(2, "0")}:00`,
    endTime: `${String(item.endTime.hour).padStart(2, "0")}:00`,
    isRepeat: item.repetition.isRepeat,
    repetition: item.repetition.isRepeat ? item.repetition.days : [],
    selectedDate: item.repetition.isRepeat
      ? ""
      : `${item.repetition.noRepeatDateTimestamp.year}-${String(
          item.repetition.noRepeatDateTimestamp.month
        ).padStart(2, "0")}-${String(
          item.repetition.noRepeatDateTimestamp.day
        ).padStart(2, "0")}`,
  }));

  const handleSwitchChange = (id: string, checked: boolean) => {
    setSwitchStates((prevStates: any) => ({
      ...prevStates,
      [id]: checked,
    }));
  };

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
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});

  const handleSubmit = async () => {
    const errors: Record<string, string[]> = {};
    let isValid = true;

    vacancySlotDataObj.forEach((data: any) => {
      if (switchStates[data.id]) {
        const slotData = formData.find((entry) => entry.id === data.id);
        const timeSlots = generateTimeSlots(data.startTime, data.endTime);
        const missingSlots = timeSlots.filter(
          (slot) =>
            !slotData?.data.some(
              (entry) =>
                entry.time === slot &&
                entry.noOfPatients > 0 &&
                entry.noOfPatients <= 20
            )
        );

        if (missingSlots.length > 0) {
          isValid = false;
          errors[data.id] = missingSlots;
        }
      }
    });

    setValidationErrors(errors);

    if (!isValid) {
      message.error("Invalid patient counts for enabled sessions.");
      return;
    }

    try {
      const responseApplications = vacancySlotDataObj
        .filter((data: any) => switchStates[data.id])
        .map((data: any) => {
          const slotData = formData.find((entry) => entry.id === data.id);
          const numberOfPatientsPerTimeSlot = slotData
            ? slotData.data.map((slot, index) => ({
                slotNumber: index + 1,
                maxNumOfPatients: slot.noOfPatients,
              }))
            : [];
          return {
            appliedOpenSessionId: parseInt(data.id),
            isAccepted: false,
            expectedPaymentAmount: data.payment, // fixed the bug here
            numberOfPatientsPerTimeSlot,
          };
        });

      const payload = {
        responseId: 0,
        submittedTimestamp: new Date().toISOString(),
        doctorId: "",
        sessionVacancyId,
        noteToPatient,
        vacancyNoteToCenter,
        responseApplications,
        isCompletelyRejected: false,
      };
      console.log("Payload:", payload);

      const backendURL = import.meta.env.VITE_BACKEND_URL;
      const access_token = TokenService.getToken();
      const config: AxiosRequestConfig = {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.post(
        `${backendURL}/doctor/respondToSessionVacancy`,
        payload,
        config
      );
      message.success("Request submitted successfully!");
    } catch (error) {
      console.error("Error submitting request:", error);
      message.error("Failed to submit request. Please try again.");
    }
  };

  function updatePayment(id: string, val: number) {
    console.log(`Updating payment for id: ${id} to ${val}`);
    let i = 0;
    while (i < vacancySlotDataObj.length) {
      if (vacancySlotDataObj[i].id == id) {
        break;
      }
      i++;
    }
    vacancySlotDataObj[i].payment = val;
  }

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
        {vacancySlotDataObj.map((data: any) => {
          const timeSlots = generateTimeSlots(data.startTime, data.endTime);
          const isEnabled = switchStates[data.id];

          return (
            <div
              key={data.id}
              className={`mt-4 border-2 ${
                isEnabled
                  ? "border-mediphix_text_d"
                  : "border-gray-400 bg-gray-200"
              } rounded-lg p-4`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 ">
                  <Switch
                    checked={isEnabled}
                    onChange={(checked) => handleSwitchChange(data.id, checked)}
                  />
                  <span className="font-semibold mr-4">
                    {isEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div className="w-60 mr-4">
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
                      data.isRepeat
                        ? "Repeat weekly on " + data.repetition.join(", ")
                        : data.selectedDate
                    }
                  />
                </div>
              </div>
              {isEnabled && (
                <>
                  <p className="font-semibold mt-4">
                    Enter the number of patients you can take in each time slot
                  </p>
                  <div className="flex flex-col gap-2 mt-4">
                    {timeSlots.map((slot, index) => (
                      <div key={index} className="flex">
                        <p className="w-32">{slot}</p>
                        <Input
                          type="number"
                          placeholder="Enter here (0-20)"
                          className="w-40"
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
                  <div>
                    <p className="font-bold mt-2">Expected payment</p>
                    <Input
                      type="number"
                      placeholder="Enter here"
                      className="w-40"
                      onChange={(e) =>
                        updatePayment(data.id, parseInt(e.target.value) || 0)
                      }
                    />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 bg-mediphix_card_background mx-4 p-8 rounded-md">
        <p className="font-semibold mb-2">Enter note for the patients</p>
        <TextArea
          rows={4}
          placeholder="Type here"
          value={noteToPatient}
          onChange={(e) => setNoteToPatient(e.target.value)}
        />
        <p className="font-semibold mb-2 mt-4">Enter note for the center</p>
        <TextArea
          rows={4}
          placeholder="Type here"
          value={vacancyNoteToCenter}
          onChange={(e) => setVacancyNoteToCenter(e.target.value)}
        />
      </div>
      <div className="flex flex-row justify-end my-4 mr-4">
        <button
          className="bg-mediphix_accent hover:bg-[#ff8928] px-4 py-2 rounded-md text-white"
          onClick={handleSubmit}
        >
          Submit the Request
        </button>
      </div>
    </ConfigProvider>
  );
}

export default VacancyDetailedMarkSlots;
