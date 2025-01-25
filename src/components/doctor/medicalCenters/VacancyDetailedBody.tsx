/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CardTitleAndValue from "../../CardTitleAndValue";
import VacancyDetailedMarkSlots from "./VacancyDetailedMarkSlots";

function VacancyDetailedBody(props: any) {
  console.log("helooooooooo", props);
  const vacancyDataObj = {
    aptCategories: props.aptCategories,
    contactNumber: props.mobile,
    note: props.vacancyNoteToDoctors,
  };
  return (
    <div>
      <div className="bg-mediphix_card_background mx-4 mt-8 p-8 rounded-lg">
        <p className="font-bold mb-4">Basic Details</p>
        <div className="flex items-center justify-between mb-2">
          <CardTitleAndValue
            title="Appointment Category"
            value={vacancyDataObj.aptCategories.join(", ")}
          />
          <CardTitleAndValue
            title="Contact Number"
            value={vacancyDataObj.contactNumber}
          />
        </div>
        <CardTitleAndValue
          title="Note from the medical center"
          value={vacancyDataObj.note}
        />
      </div>
      <VacancyDetailedMarkSlots
        openSessions={props.openSessions}
        vacacncyId={props.vacacncyId}
      />
    </div>
  );
}

export default VacancyDetailedBody;
